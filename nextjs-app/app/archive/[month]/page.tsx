import Image from "next/image";
import Link from "next/link";
import { getWallpapersForMonth, getAvailableMonths } from "@/lib/wallpaper";

export async function generateStaticParams() {
  const months = getAvailableMonths();
  return months.map((month) => ({
    month: month,
  }));
}

export default async function ArchivePage({
  params,
}: {
  params: Promise<{ month: string }>;
}) {
  const { month } = await params;
  const wallpapers = getWallpapersForMonth(month);
  const allMonths = getAvailableMonths();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-slate-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">
            Archive: {month}
          </h1>
          <p className="text-xl mt-2 opacity-90">
            {wallpapers.length} wallpaper{wallpapers.length !== 1 ? "s" : ""}
          </p>
        </div>
      </header>

      {/* Month Navigation */}
      <div className="bg-gray-100 dark:bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {allMonths.map((m) => (
              <Link
                key={m}
                href={`/archive/${m}`}
                className={`px-4 py-2 rounded-lg transition-all ${
                  m === month
                    ? "bg-slate-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700"
                }`}
              >
                {m}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Wallpapers Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {wallpapers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wallpapers.map((wallpaper) => (
              <div
                key={wallpaper.date}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="relative aspect-video">
                  <Image
                    src={wallpaper.thumbnailUrl}
                    alt={wallpaper.copyright}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-slate-800/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-sm font-medium mb-1">{wallpaper.date}</p>
                    <p className="text-xs line-clamp-2 mb-2">{wallpaper.copyright}</p>
                    <a
                      href={wallpaper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded backdrop-blur-sm transition-colors"
                    >
                      Download 4K
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No wallpapers found for this month.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Powered by{" "}
            <a
              href="https://github.com/erbanku/bing-wallpaper"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 font-medium"
            >
              GitHub.com/erbanku
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
