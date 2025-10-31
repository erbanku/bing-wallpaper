# Bing Wallpaper - Next.js Frontend

This is a modern Next.js application that displays daily Bing wallpapers in 4K quality.

## Features

- 🎨 Modern, responsive UI with Tailwind CSS
- 🖼️ Beautiful hero section with featured wallpaper
- 📱 Mobile-friendly design
- 🗂️ Monthly archive pages
- ⚡ Static site generation for fast loading
- 🌙 Dark mode support

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

```bash
cd nextjs-app
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

Build the static site for production:

```bash
npm run build
```

The static files will be generated in the `out` directory.

### Deployment

The site can be deployed to any static hosting service:

- GitHub Pages
- Vercel
- Netlify
- AWS S3
- Cloudflare Pages

## Data Source

The application reads wallpaper data from the `bing-wallpaper.md` file in the parent directory, which is automatically updated by the Java backend via GitHub Actions.

## Project Structure

```
nextjs-app/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── archive/
│       └── [month]/
│           └── page.tsx    # Monthly archive pages
├── lib/
│   └── wallpaper.ts        # Data fetching utilities
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
└── package.json            # Dependencies
```

## Customization

### Styling

The app uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.ts`.

### Data Format

The app expects wallpaper data in the following format in `../bing-wallpaper.md`:

```
2025-10-31 | [Description](url)
```

## License

See the parent repository's LICENSE.md file.
