"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Minimalist spinner component
function Spinner() {
  return (
    <div className="flex justify-center items-center w-full py-16">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600" />
    </div>
  );
}

export type Hadis = {
  hadithTitle: string;
  hadithNarrator: string;
  hadithArabic: string;
  hadithEnglish: string;
  hadithStatus: string;
  hadithBookName: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "sahih":
      return "bg-green-100 text-green-700 border border-green-300";
    case "hasan":
      return "bg-green-50 text-green-600 border border-green-200";
    case "da'eef":
      return "bg-gray-100 text-gray-500 border border-gray-200";
    default:
      return "bg-gray-50 text-gray-400 border border-gray-100";
  }
};

export default function Home() {
  const [hadiths, setHadiths] = useState<Hadis[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchHadiths = async () => {
      setLoading(true);
      const response = await fetch(`/api/hadis?page=${page}`);
      const result = await response.json();
      if (Array.isArray(result)) {
        setHadiths(result);
        setTotalPages(1625); // fallback if API doesn't return total pages
      } else {
        setHadiths(result.hadiths || []);
        setTotalPages(result.totalPages || 1625);
      }
      setLoading(false);
    };
    fetchHadiths();
  }, [page]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start py-6 px-2 sm:px-4">
      <header className="w-full max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-800 text-center font-serif tracking-tight">
          Hadis Today
        </h1>
        <p className="text-base sm:text-lg text-green-600 text-center mt-1 font-sans">
          Explore the Wisdom of Hadith
        </p>
      </header>
      <main className="w-full max-w-4xl mx-auto flex-1">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {hadiths.map((hadith, index) => (
                <Card
                  key={index}
                  className="bg-white border border-green-100 shadow-sm rounded-xl flex flex-col h-full transition hover:shadow-md"
                >
                  <CardHeader className="bg-green-50 rounded-t-xl px-4 py-3 border-b border-green-100">
                    <CardTitle className="text-lg font-bold text-green-900 truncate font-serif">
                      {hadith.hadithTitle || "Title Not Yet Available"}
                    </CardTitle>
                    <CardDescription className="text-xs text-green-600 mt-1 font-sans">
                      {hadith.hadithNarrator || "Narrator Not Yet Available"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow px-4 py-4">
                    <p className="text-right font-arabic text-base text-green-800 leading-relaxed mb-2">
                      {hadith.hadithArabic || "Hadith Arabic Not Yet Available"}
                    </p>
                    <p className="text-sm italic text-green-700 font-sans">
                      {hadith.hadithEnglish ||
                        "Hadith English Not Yet Available"}
                    </p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between px-4 py-2 bg-green-50 rounded-b-xl border-t border-green-100">
                    <span className="text-xs text-green-700 font-sans">
                      {hadith.hadithBookName ||
                        "Hadith Book Name Not Yet Available"}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${getStatusColor(hadith.hadithStatus)}`}
                    >
                      {hadith.hadithStatus || "Status Not Yet Available"}
                    </span>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                className="px-3 py-1 rounded bg-green-100 text-green-700 font-semibold disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="text-green-800 font-semibold">
                Page {page} of {totalPages}
              </span>
              <button
                className="px-3 py-1 rounded bg-green-100 text-green-700 font-semibold disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
      <footer className="w-full max-w-4xl mx-auto mt-8 text-center text-xs text-green-300">
        Created by mnajmuddean
      </footer>
    </div>
  );
}
