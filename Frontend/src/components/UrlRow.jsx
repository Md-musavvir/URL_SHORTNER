import { useState } from "react";

import { Check, Copy, ExternalLink, Trash2 } from "lucide-react";

import { deleteUrl } from "../services/urlApi";

function UrlRow({ url, onDelete }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this URL?",
    );

    if (!confirmDelete) return;

    try {
      await deleteUrl(url._id);
      onDelete();
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <tr className="group transition-colors duration-100 hover:bg-slate-50/70">
      {/* Original URL */}
      <td className="px-6 py-3.5">
        <span
          className="block max-w-[260px] truncate text-sm text-slate-600 xl:max-w-sm"
          title={url.originalUrl}
        >
          {url.originalUrl}
        </span>
      </td>

      {/* Short URL */}
      <td className="px-6 py-3.5">
        <a
          href={url.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 underline-offset-2 transition hover:underline"
        >
          {url.shortUrl}
        </a>
      </td>

      {/* Clicks */}
      <td className="px-6 py-3.5 text-center">
        <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
          {url.clicks}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-3.5">
        <div className="flex items-center justify-center gap-1">
          {/* Copy */}
          <button
            onClick={handleCopy}
            title={copied ? "Copied!" : "Copy short URL"}
            aria-label={copied ? "Copied!" : "Copy short URL"}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 ${
              copied
                ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                : "border-transparent text-slate-400 hover:border-slate-200 hover:bg-white hover:text-blue-600"
            }`}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>

          {/* Open */}
          <a
            href={url.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open short URL"
            aria-label="Open short URL in new tab"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-slate-400 transition duration-150 hover:border-slate-200 hover:bg-white hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-1"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          {/* Delete */}
          <button
            onClick={handleDelete}
            title="Delete link"
            aria-label="Delete link"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-slate-400 transition duration-150 hover:border-red-100 hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default UrlRow;
