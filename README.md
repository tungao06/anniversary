# Anniversary Project

A Next.js project for creating a special anniversary website with Google Drive integration.

## Features

- 🚀 Next.js 14 with App Router
- 📸 Google Drive API integration for images and videos
- ⚡ Performance optimized with caching
- 🎨 Tailwind CSS for styling
- 📝 TypeScript for type safety
- 🔒 Environment variables for secure configuration

## Project Structure

```
anniversary/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── drive/         # Google Drive API endpoint
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Library code
│   ├── env.ts            # Environment variables
│   └── constants.ts       # Constants
├── services/              # Service layer
│   └── googleDrive.ts    # Google Drive service
├── types/                 # TypeScript types
│   └── index.ts          # Type definitions
├── utils/                 # Utility functions
│   ├── cache.ts          # Caching utilities
│   └── format.ts         # Formatting utilities
└── public/               # Static assets
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `env.example` to `.env.local`
   - Fill in your Google Drive API credentials:
     ```env
     GOOGLE_DRIVE_API_KEY=your_api_key_here
     GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
     ```

3. **Get Google Drive API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google Drive API
   - Create credentials (API Key)
   - Restrict the API key to Google Drive API only

4. **Get Google Drive Folder ID:**
   - Open your Google Drive folder
   - The folder ID is in the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## API Endpoints

### GET /api/drive
Fetches all media files from Google Drive folder.

**Query Parameters:**
- `folderId` (optional): Specific folder ID to fetch from

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "file_id",
      "name": "image.jpg",
      "type": "image",
      "thumbnailUrl": "https://...",
      "directUrl": "https://...",
      "width": 1920,
      "height": 1080
    }
  ],
  "message": "Found 10 media items"
}
```

## Key Features

### 1. Professional Structure
- Clear separation of concerns
- Organized folder structure
- Reusable components and utilities

### 2. Google Drive Integration
- Fetches images and videos from Google Drive
- Automatic thumbnail generation
- Support for multiple file formats

### 3. Performance Optimizations
- Image optimization with Next.js Image component
- Caching with revalidation
- Lazy loading support

### 4. Security
- Environment variables for sensitive data
- API key validation
- Error handling

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Next Steps

1. Create UI components for displaying media
2. Add interactive features and animations
3. Implement hidden secrets and surprises
4. Add custom styling for anniversary theme
