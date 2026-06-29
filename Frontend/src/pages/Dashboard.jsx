import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";

import Navbar from "../components/Navbar";
import UrlForm from "../components/UrlForm";
import UrlTable from "../components/UrlTable";
import { getAllUrls } from "../services/urlApi";

function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await getAllUrls();
      setUrls(response.data.data.urls);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#f8fafc]">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
          <Loader2 className="h-5 w-5 animate-spin text-white" />
        </div>
        <p className="text-sm font-medium text-slate-500">
          Loading your links…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create and manage all your shortened links in one place.
          </p>
        </div>

        {/* Stats strip */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
          {[
            {
              label: "Total links",
              value: urls.length,
            },
            {
              label: "Total clicks",
              value: urls.reduce((sum, u) => sum + (u.clicks ?? 0), 0),
            },
            {
              label: "Active links",
              value: urls.filter((u) => u.isActive !== false).length,
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
            >
              <p className="text-xs font-medium text-slate-500">{label}</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Create link card */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-slate-800">
            Shorten a new link
          </h2>
          <UrlForm onSuccess={fetchUrls} />
        </div>

        {/* Links table card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h2 className="text-sm font-semibold text-slate-800">Your links</h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              {urls.length} {urls.length === 1 ? "link" : "links"}
            </span>
          </div>
          <UrlTable urls={urls} onDelete={fetchUrls} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
