# EduMe AI Frontend

This is the frontend application for EduMe AI, built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the frontend directory with your Firebase configuration:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
npm run build
npm start
```

## Features

- **Authentication**: Firebase Auth integration
- **Database**: Firestore for data storage
- **Wallet Integration**: MetaMask wallet connection
- **Learning System**: Course management with progress tracking
- **Rewards System**: Token-based rewards and achievements
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Wallet**: Ethers.js for MetaMask integration
- **State Management**: React Context API

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
├── components/            # Reusable UI components
├── contexts/             # React Context providers
├── lib/                  # Utility functions and configurations
├── public/               # Static assets
└── styles/               # Global styles
```

## Contributing

1. Follow the existing code style
2. Add TypeScript types for new components
3. Test your changes thoroughly
4. Update documentation as needed
