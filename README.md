# Northern Spark Photography

A modern, responsive photography portfolio website for Northern Spark Photography in Nisswa, Minnesota.

## Features

- Responsive design optimized for mobile, tablet, and desktop
- Image gallery with lightbox
- About section, pricing packages, and contact form
- Hamburger menu for navigation
- SEO optimized
- Fast performance

## Technology Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- Deployed on Netlify

## Development

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/northern-spark-photo.git
   cd northern-spark-photo
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment on Netlify

### Option 1: Deploy from Git

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Sign up or log in to [Netlify](https://www.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 2: Deploy from local build

1. Build the project locally:
   ```bash
   npm run build
   ```

2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Login to Netlify:
   ```bash
   netlify login
   ```

4. Deploy the site:
   ```bash
   netlify deploy --prod
   ```

5. When prompted, specify `dist` as the publish directory.

## Project Structure

```
northern-spark-photo/
├── components/        # React components
├── public/            # Static assets
├── src/
│   ├── data/          # Data files for the site
│   ├── App.tsx        # Main App component
│   ├── main.tsx       # Entry point
│   └── types.ts       # TypeScript types
├── index.html         # HTML template
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.ts     # Vite configuration
└── netlify.toml       # Netlify configuration
```

## Customization

- Replace placeholder images with real photography
- Update colors in `tailwind.config.js` to match your brand
- Update content in the components
- Add additional pages as needed

## License

All rights reserved. This code is not licensed for reuse without permission.

## Contact

For inquiries or support, contact [your-email@example.com](mailto:your-email@example.com)