import Image from "next/image";
import Link from "next/link";
import { getRecentWallpapers, getMonthsByYear } from "@/lib/wallpaper";

export default function Home() {
  const wallpapers = getRecentWallpapers(30);
  const monthsByYear = getMonthsByYear();
  const years = Object.keys(monthsByYear).sort().reverse();
  const featuredWallpaper = wallpapers[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredWallpaper && (
        <section className="relative h-[70vh] overflow-hidden">
          <Image
            src={featuredWallpaper.thumbnailUrl}
            alt={featuredWallpaper.copyright}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-slate-900/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center">
              Bing Wallpaper
            </h1>
            <p className="text-xl md:text-2xl text-center max-w-3xl mb-2">
              Daily 4K Ultra HD Wallpapers from Bing
            </p>
            <p className="text-sm md:text-base text-center max-w-2xl opacity-90">
              {featuredWallpaper.copyright}
            </p>
            <p className="text-sm mt-2 opacity-75">{featuredWallpaper.date}</p>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Recent Wallpapers Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Recent Wallpapers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-slate-800/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-sm font-medium mb-1">{wallpaper.date}</p>
                    <p className="text-xs line-clamp-2">{wallpaper.copyright}</p>
                    <a
                      href={wallpaper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded backdrop-blur-sm transition-colors"
                    >
                      Download 4K
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Archive Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Browse by Month</h2>
          <div className="space-y-8">
            {years.map((year) => (
              <div key={year} className="space-y-3">
                <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-300 dark:border-slate-600 pb-2">
                  {year}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {monthsByYear[year].map((month) => (
                    <Link
                      key={month}
                      href={`/archive/${month}`}
                      className="px-5 py-2.5 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm font-medium"
                    >
                      {month.substring(5, 7)}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
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
