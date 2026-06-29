import crypto from "crypto";

import Url from "../models/Url.models.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import redisClient from "../utils/redisClient.js";

const generateShortCode = (length = 6) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = crypto.randomBytes(length);
  let shortCode = "";
  for (let i = 0; i < length; i++) {
    shortCode += chars[bytes[i] % chars.length];
  }
  return shortCode;
};
const shortenUrl = AsyncHandler(async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl?.trim()) {
    throw new ApiError(400, "URL is required");
  }

  try {
    const parsedUrl = new URL(originalUrl);

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      throw new ApiError(400, "Invalid URL");
    }
  } catch {
    throw new ApiError(400, "Invalid URL");
  }

  let shortCode;

  do {
    shortCode = generateShortCode();
  } while (await Url.findOne({ shortCode }));

  const url = await Url.create({
    originalUrl,
    shortCode,
    user: req.user._id,
  });

  if (!url) {
    throw new ApiError(500, "Failed to create short URL");
  }
  await redisClient.del(`user_id:${req.user._id}`);

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        shortUrl: `${req.protocol}://${req.get("host")}/${url.shortCode}`,
        shortCode: url.shortCode,
        originalUrl: url.originalUrl,
      },
      "URL shortened successfully",
    ),
  );
});
const redirectUrl = AsyncHandler(async (req, res) => {
  const { shortCode } = req.params;
  let shortKey = `url:${shortCode}`;
  const cachedUrl = await redisClient.get(shortKey);
  if (cachedUrl) {
    console.log("Cache Hit");
    return res.redirect(cachedUrl);
  }
  const url = await Url.findOne({ shortCode });
  if (!url) {
    throw new ApiError(404, "URL not found");
  }
  await redisClient.setEx(shortKey, 25000, url.originalUrl);
  url.clicks += 1;
  await url.save();

  return res.redirect(url.originalUrl);
});
const getAllUrl = AsyncHandler(async (req, res) => {
  const user_id = req.user._id;

  if (!user_id) {
    throw new ApiError(400, "User id is required");
  }

  const cacheKey = `user_id:${user_id}`;

  const cachedUrls = await redisClient.get(cacheKey);

  if (cachedUrls) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { urls: JSON.parse(cachedUrls) },
          "Url's fetched successfully",
        ),
      );
  }

  const response = await Url.find({ user: user_id }).sort({ createdAt: -1 });

  const urls = response.map((url) => ({
    _id: url._id,
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    shortUrl: `${req.protocol}://${req.get("host")}/${url.shortCode}`,
    clicks: url.clicks,
    expiresAt: url.expiresAt,
    createdAt: url.createdAt,
    updatedAt: url.updatedAt,
  }));

  await redisClient.setEx(cacheKey, 100, JSON.stringify(urls));

  return res
    .status(200)
    .json(new ApiResponse(200, { urls }, "Url's fetched successfully"));
});
const deleteUrl = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const url = await Url.findById(id);

  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  if (url.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this URL");
  }

  await Url.findByIdAndDelete(id);

  await redisClient.del(`user_id:${req.user._id}`);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "URL deleted successfully"));
});
export { deleteUrl, getAllUrl, redirectUrl, shortenUrl };
