# eduMe_AI - AI-Powered Learning Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8](https://img.shields.io/badge/python-3.8-blue.svg)](https://www.python.org/downloads/)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)](https://fastapi.tiangolo.com/)

## 🎓 Overview

eduMe_AI is a comprehensive AI-powered learning platform that combines cutting-edge AI technology with educational tools. The platform features a SadTalker API for creating talking avatars from images and audio, along with a modern web interface for various learning activities.

### 🌟 Key Features

- **AI Avatar Generation**: Create talking avatars using SadTalker technology
- **Career Quiz System**: Interactive career assessment and guidance
- **AI Tutoring**: Personalized learning assistance
- **Exam Preparation**: Comprehensive study tools and resources
- **Skill Hub**: Learning path recommendations and skill development
- **Rewards System**: Gamified learning experience
- **Leaderboard**: Competitive learning environment

## 🏗️ Architecture

The project consists of two main components:

### Backend (SadTalker API)
- **FastAPI** server with SadTalker integration
- **AWS S3** integration for file storage
- **Docker** support for easy deployment
- **CUDA** support for GPU acceleration

### Frontend (Learning Platform)
- **Next.js 15** with TypeScript
- **Tailwind CSS** for modern styling
- **Firebase** for authentication and data storage
- **Framer Motion** for smooth animations
- **Radix UI** components for accessibility

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 18+
- CUDA-compatible GPU (optional but recommended)
- Docker (for containerized deployment)

### Backend Setup

#### Manual Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd eduMe_AI/backend
```

2. **Create and activate conda environment**
```bash
conda create -n sadtalker python=3.8
conda activate sadtalker
```

3. **Install PyTorch with CUDA support**
```bash
pip install torch==1.12.1+cu113 torchvision==0.13.1+cu113 torchaudio==0.12.1 --extra-index-url https://download.pytorch.org/whl/cu113
```

4. **Install other dependencies**
```bash
conda install ffmpeg
pip install -r requirements.txt
```

5. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your AWS credentials and other settings
```

6. **Download SadTalker models**
```bash
bash scripts/download_models.sh
```

7. **Start the API server**
```bash
uvicorn --host "0.0.0.0" --port "8000" api:app
```

#### Docker Installation

1. **Build the Docker image**
```bash
cd backend
docker build -t sadtalker .
```

2. **Run with GPU support**
```bash
docker run --gpus=all --rm -p 8000:8000 -v ./.env:/sadtalker/.env -d --name sadtalker sadtalker
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd ../frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Create .env.local with your Firebase configuration
```

4. **Start development server**
```bash
npm run dev
```

## 📚 API Documentation

### SadTalker API Endpoints

#### Generate Talking Avatar
```bash
POST /generate/
```

**Request Body:**
```json
{
  "image_link": "https://example.com/image.jpg",
  "audio_link": "https://example.com/audio.wav",
  "s3_object_path": "uploads/avatar/"
}
```

**Response:**
```json
{
  "status": "success",
  "video_url": "https://s3.amazonaws.com/bucket/video.mp4"
}
```

#### Test the API
```bash
curl -X POST "http://localhost:8000/generate/" \
  -H "Content-Type: application/json" \
  -d '{
    "image_link": "https://raw.githubusercontent.com/OpenTalker/SadTalker/main/examples/source_image/happy.png",
    "audio_link": "https://github.com/OpenTalker/SadTalker/raw/main/examples/driven_audio/chinese_poem2.wav"
  }'
```

### API Documentation UI
Visit `http://localhost:8000/docs` for interactive API documentation.

## 🎯 Learning Platform Features

### Career Quiz System
- Interactive career assessment questions
- Personalized career recommendations
- Progress tracking and analytics

### AI Tutoring
- Personalized learning paths
- Real-time assistance
- Adaptive content delivery

### Exam Preparation
- Comprehensive study materials
- Practice tests and quizzes
- Performance analytics

### Skill Hub
- Skill assessment tools
- Learning path recommendations
- Progress tracking

### Rewards & Gamification
- Point-based reward system
- Achievement badges
- Leaderboard competition

## 🛠️ Development

### Project Structure
```
eduMe_AI/
├── backend/                 # SadTalker API server
│   ├── api.py              # FastAPI application
│   ├── src/                # SadTalker source code
│   ├── scripts/            # Utility scripts
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js learning platform
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   ├── contexts/           # React contexts
│   └── package.json        # Node.js dependencies
└── README.md              # This file
```

### Environment Variables

#### Backend (.env)
```env
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
AWS_S3_REGION=us-west-1
AWS_S3_BUCKET_NAME=your_bucket_name
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 🚀 Deployment

### Production Build

#### Backend
```bash
cd backend
docker build -t eduMe_AI_backend .
docker run -p 8000:8000 eduMe_AI_backend
```

#### Frontend
```bash
cd frontend
npm run build
npm start
```

### Environment Setup
1. Set up AWS S3 bucket for file storage
2. Configure Firebase project for authentication
3. Set up environment variables in production
4. Configure domain and SSL certificates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SadTalker**: Original SadTalker implementation by [OpenTalker](https://github.com/OpenTalker/SadTalker)
- **Phạm Gia Linh**: Original API implementation from [sad-talker-api](https://gitlab.com/phamgialinhlx/sad-talker-api)
- **FastAPI**: Modern web framework for building APIs
- **Next.js**: React framework for production
- **Tailwind CSS**: Utility-first CSS framework

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the [FAQ](backend/docs/FAQ.md) for common questions

## 🔄 Updates

See [CHANGELOG](backend/docs/changlelog.md) for detailed version history and updates.

---

**Made with ❤️ for educational innovation**


