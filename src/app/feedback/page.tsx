"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface FeedbackData {
  id: string;
  pageUrl: string;
  xPercent: number;
  yPercent: number;
  viewportWidth: number;
  viewportHeight: number;
  comment: string;
  timestamp: string;
  userAgent: string;
  screenshot?: string;
}

const STORAGE_KEY = "bvp_feedback_data";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackData[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored) as FeedbackData[];
      // Sort by newest first
      data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setFeedback(data);
    }
  }, []);

  const uniquePages = [...new Set(feedback.map(f => {
    try {
      const url = new URL(f.pageUrl);
      return url.pathname;
    } catch {
      return f.pageUrl;
    }
  }))];

  const filteredFeedback = filter === "all"
    ? feedback
    : feedback.filter(f => {
        try {
          const url = new URL(f.pageUrl);
          return url.pathname === filter;
        } catch {
          return f.pageUrl === filter;
        }
      });

  const deleteFeedback = (id: string) => {
    const updated = feedback.filter(f => f.id !== id);
    setFeedback(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearAll = () => {
    if (confirm("Are you sure you want to delete all feedback?")) {
      setFeedback([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const exportToCSV = () => {
    const headers = ["ID", "Page", "X%", "Y%", "Comment", "Timestamp", "Viewport", "Has Screenshot"];
    const rows = feedback.map(f => [
      f.id,
      f.pageUrl,
      f.xPercent.toFixed(2),
      f.yPercent.toFixed(2),
      `"${f.comment.replace(/"/g, '""')}"`,
      f.timestamp,
      `${f.viewportWidth}x${f.viewportHeight}`,
      f.screenshot ? "Yes" : "No"
    ]);

    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bvp-feedback-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getPagePath = (url: string) => {
    try {
      return new URL(url).pathname;
    } catch {
      return url;
    }
  };

  // Generate a link that navigates to the feedback location
  const getFeedbackLink = (f: FeedbackData) => {
    try {
      const url = new URL(f.pageUrl);
      url.searchParams.set("feedback_id", f.id);
      url.searchParams.set("fx", f.xPercent.toString());
      url.searchParams.set("fy", f.yPercent.toString());
      return url.toString();
    } catch {
      return f.pageUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-[17px] text-gray-500 hover:text-gray-700 mb-1 block min-h-[44px] flex items-center">
                ← Back to site
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                👁️ Feedback Dashboard
              </h1>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                disabled={feedback.length === 0}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[17px] font-medium min-h-[44px]"
              >
                Export CSV
              </button>
              <button
                onClick={clearAll}
                disabled={feedback.length === 0}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[17px] font-medium min-h-[44px]"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Filter */}
          {uniquePages.length > 1 && (
            <div className="mt-4 flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-full text-[17px] transition-colors min-h-[44px] ${
                  filter === "all"
                    ? "bg-[#FDC500] text-black font-medium"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All ({feedback.length})
              </button>
              {uniquePages.map(page => (
                <button
                  key={page}
                  onClick={() => setFilter(page)}
                  className={`px-4 py-2 rounded-full text-[17px] transition-colors min-h-[44px] ${
                    filter === page
                      ? "bg-[#FDC500] text-black font-medium"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {page} ({feedback.filter(f => getPagePath(f.pageUrl) === page).length})
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {feedback.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👁️</div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">No feedback yet</h2>
            <p className="text-gray-500 mb-6">
              Click the feedback button on any page to start collecting comments.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-[#FDC500] text-black font-medium rounded-lg hover:bg-[#e6b200] transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFeedback.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex">
                  {/* Screenshot thumbnail */}
                  {f.screenshot && (
                    <div
                      className="w-48 h-48 flex-shrink-0 cursor-pointer relative group"
                      onClick={() => setExpandedImage(f.screenshot || null)}
                    >
                      <img
                        src={f.screenshot}
                        alt="Screenshot"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                          Click to expand
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">👁️</span>
                          <div>
                            <p className="font-medium text-gray-900">{getPagePath(f.pageUrl)}</p>
                            <p className="text-xs text-gray-500">{formatDate(f.timestamp)}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 mt-3 pl-11">{f.comment}</p>
                        <div className="mt-3 pl-11 flex items-center gap-4 text-xs text-gray-400">
                          <span>Position: {f.xPercent.toFixed(1)}% x {f.yPercent.toFixed(1)}%</span>
                          <span>Viewport: {f.viewportWidth}×{f.viewportHeight}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <a
                          href={getFeedbackLink(f)}
                          className="px-4 py-2 bg-[#FDC500] text-black text-[17px] font-medium rounded-lg hover:bg-[#e6b200] transition-colors text-center min-h-[44px] flex items-center justify-center"
                        >
                          View on Page →
                        </a>
                        <button
                          onClick={() => deleteFeedback(f.id)}
                          className="px-4 py-2 text-red-600 text-[17px] hover:bg-red-50 rounded-lg transition-colors min-h-[44px]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image lightbox */}
      {expandedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={expandedImage}
              alt="Screenshot"
              className="max-w-full max-h-[80vh] rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
