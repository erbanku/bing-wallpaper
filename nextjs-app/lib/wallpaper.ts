import fs from 'fs';
import path from 'path';

export interface Wallpaper {
  date: string;
  copyright: string;
  url: string;
  thumbnailUrl: string;
}

// Parse the markdown file to extract wallpaper data
export function getWallpapers(): Wallpaper[] {
  const filePath = path.join(process.cwd(), '..', 'bing-wallpaper.md');
  
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const wallpapers: Wallpaper[] = [];

  for (const line of lines) {
    // Match pattern: 2025-10-31 | [description](url)
    const match = line.match(/^(\d{4}-\d{2}-\d{2})\s*\|\s*\[([^\]]+)\]\(([^)]+)\)/);
    if (match) {
      const date = match[1];
      const copyright = match[2];
      const url = match[3];
      
      // Generate thumbnail URL
      const thumbnailUrl = url.includes('?') 
        ? `${url}&pid=hp&w=384&h=216&rs=1&c=4`
        : `${url}?pid=hp&w=384&h=216&rs=1&c=4`;

      wallpapers.push({
        date,
        copyright,
        url,
        thumbnailUrl,
      });
    }
  }

  return wallpapers;
}

// Get wallpapers grouped by year and month
export function getWallpapersByMonth(): Record<string, Wallpaper[]> {
  const wallpapers = getWallpapers();
  const grouped: Record<string, Wallpaper[]> = {};

  for (const wallpaper of wallpapers) {
    const yearMonth = wallpaper.date.substring(0, 7); // YYYY-MM
    if (!grouped[yearMonth]) {
      grouped[yearMonth] = [];
    }
    grouped[yearMonth].push(wallpaper);
  }

  return grouped;
}

// Get available months
export function getAvailableMonths(): string[] {
  const grouped = getWallpapersByMonth();
  return Object.keys(grouped).sort().reverse();
}

// Get wallpapers for a specific month
export function getWallpapersForMonth(yearMonth: string): Wallpaper[] {
  const grouped = getWallpapersByMonth();
  return grouped[yearMonth] || [];
}

// Get recent wallpapers (default: 30)
export function getRecentWallpapers(count: number = 30): Wallpaper[] {
  const wallpapers = getWallpapers();
  return wallpapers.slice(0, count);
}

// Get months grouped by year
export function getMonthsByYear(): Record<string, string[]> {
  const months = getAvailableMonths();
  const grouped: Record<string, string[]> = {};

  for (const month of months) {
    const year = month.substring(0, 4);
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(month);
  }

  return grouped;
}
