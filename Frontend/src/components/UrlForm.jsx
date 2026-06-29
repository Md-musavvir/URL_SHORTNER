import { useState } from "react";

import { ArrowRight, CheckCircle2, Link2, Loader2 } from "lucide-react";

import { shortenUrl } from "../services/urlApi";

function UrlForm({ onSuccess }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccess(false);

      const response = await shortenUrl({ originalUrl });
      onSuccess();

      console.log(response.data);

      setOriginalUrl("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input + button row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* URL input */}
        <div className="relative flex-1">
          <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="url"
            placeholder="https://example.com/your-very-long-url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm outline-none transition duration-150 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 hover:border-slate-300"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="group flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 transition duration-150 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto w-full"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Shortening…</span>
            </>
          ) : (
            <>
              <span>Shorten URL</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>

      {/* Success feedback */}
      {success && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          Link shortened successfully and added to your list.
        </div>
      )}
    </form>
  );
}

export default UrlForm;
