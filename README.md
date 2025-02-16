
# Meta Video Hook Generator

## Overview

A modern web application that leverages AI to generate engaging hooks for Meta platforms (Instagram and Facebook) video content. The application uses OpenAI's GPT models through Supabase Edge Functions to create both visual captions and verbal hooks optimized for social media engagement.

## Features

- **Dual Hook Generation**: Creates both visual (caption) and verbal (speech) hooks
- **Platform-Specific**: Optimized for Instagram and Facebook content
- **AI-Powered**: Utilizes OpenAI's GPT models for intelligent content generation
- **Real-Time Processing**: Instant hook generation with loading states
- **Copy-to-Clipboard**: Easy one-click copying of generated hooks
- **Responsive Design**: Works seamlessly on all devices

## Tech Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - Vite

- **Backend**:
  - Supabase Edge Functions
  - OpenAI API integration
  - CORS-enabled API endpoints

## Local Development

1. Clone the repository:
```sh
git clone <your-repo-url>
cd meta-video-hook-generator
```

2. Install dependencies:
```sh
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Supabase and OpenAI API credentials

4. Start the development server:
```sh
npm run dev
```

Visit `http://localhost:8080` to see the application running locally.

## Architecture

The application follows a modern, component-based architecture:

- **Frontend**: React components with TypeScript for type safety
- **Edge Functions**: Serverless functions for API interactions
- **State Management**: React's useState for local state
- **API Integration**: Supabase client for Edge Function calls
- **UI Components**: shadcn/ui for consistent design

## API Integration

The application integrates with OpenAI's GPT models through a secure Edge Function, which:
- Accepts video content descriptions
- Processes them through the AI model
- Returns formatted hook suggestions
- Handles errors gracefully with fallback responses

## Future Enhancements

- User authentication
- Hook history saving
- More platform integrations
- Custom hook templates
- Analytics dashboard

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
