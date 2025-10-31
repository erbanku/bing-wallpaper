import Image from "next/image";
import Link from "next/link";
import { getRecentWallpapers, getAvailableMonths } from "@/lib/wallpaper";

export default function Home() {
  const wallpapers = getRecentWallpapers(30);
  const months = getAvailableMonths();
  const featuredWallpaper = wallpapers[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {featuredWallpaper && (
        <section className="relative h-[70vh] overflow-hidden">
          <Image
            src={featuredWallpaper.url}
            alt={featuredWallpaper.copyright}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
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
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
          <div className="flex flex-wrap gap-3">
            {months.map((month) => (
              <Link
                key={month}
                href={`/archive/${month}`}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                {month}
              </Link>
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
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              GitHub.com/erbanku
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
