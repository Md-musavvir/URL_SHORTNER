import { Link2 } from "lucide-react";

import UrlRow from "./UrlRow";

function UrlTable({ urls, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/60">
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Original URL
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Short URL
            </th>
            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
              Clicks
            </th>
            <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {urls.length > 0 ? (
            urls.map((url) => (
              <UrlRow key={url._id} url={url} onDelete={onDelete} />
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                    <Link2 className="h-5 w-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      No links yet
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Shorten your first URL above to get started.
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UrlTable;
