# 🧠 AI-Memory - Your Intelligent Digital Memory Assistant

AI-Memory is a cutting-edge web application that combines traditional content management with AI-powered querying capabilities. Save your digital content and ask intelligent questions about it using advanced vector embeddings and AI models.

[![AI-Memory Demo](https://img.shields.io/badge/Status-Live-brightgreen)](https://ai-memory-five.vercel.app/) ![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20Node.js%20%7C%20AI-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## 🚀 Live Demo

**[🌐 Try AI-Memory Live](https://ai-memory-five.vercel.app/)**

Experience the full application without any setup required! Create an account and start building your intelligent digital memory.

## 🌟 Key Features

### 🤖 AI-Powered Querying

- **Semantic Search**: Query your saved content using natural language
- **Vector Embeddings**: Content automatically converted to vector embeddings using Pinecone
- **Intelligent Responses**: Powered by Google's Gemini AI for contextual answers
- **Source Attribution**: AI responses show which of your saved items were referenced

### 📚 Multi-Platform Content Storage

- **Documents**: Save text-based content and documents
- **YouTube Videos**: Store and query video content
- **Social Media**: Support for Twitter, LinkedIn, Instagram posts
- **Web Links**: Save any web content with descriptions
- **Pinterest Pins**: Visual content storage

### 🔐 Secure & Private

- **JWT Authentication**: Secure user authentication system
- **Private Namespaces**: Your content is isolated using Pinecone namespaces
- **Password Security**: Bcrypt hashing with 12 salt rounds
- **CORS Protection**: Configured for secure cross-origin requests

### 🌐 Sharing Capabilities

- **Public Brain Sharing**: Share your memory collection with others
- **Secure Hash Links**: Generated unique links for sharing
- **Read-Only Access**: Shared collections are view-only for privacy

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **React Router** for navigation
- **Axios** for API communication

### Backend

- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing

### AI & Vector Database

- **Google Gemini AI** (gemini-2.0-flash-exp model)
- **Pinecone** vector database for embeddings
- **Zod** for input validation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Pinecone account and API key
- Google AI Studio API key

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tiger-raj/ai-memory.git
   cd ai-memory/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the backend directory:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_INDEX_NAME=your_pinecone_index_name
   PINECONE_HOST=your_pinecone_host_url
   GEMINI_API_KEY=your_google_gemini_api_key
   NODE_ENV=development
   ```

4. **Start the backend server**
   ```bash
   npm run dev
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

3. **Environment Variables**
   Create a `.env` file in the frontend directory:

   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 API Documentation

### Authentication Endpoints

#### POST `/api/v1/signup`

Create a new user account.

```json
{
  "username": "string (6-30 chars)",
  "password": "string (6-30 chars, uppercase, number, special char)"
}
```

#### POST `/api/v1/signin`

Sign in with existing credentials.

```json
{
  "username": "string",
  "password": "string"
}
```

### Content Management

#### POST `/api/v1/content`

Add new content to your memory.

```json
{
  "title": "string",
  "link": "string (optional for documents)",
  "type": "youtube|twitter|pinterest|linkedin|document|link|instagram",
  "description": "string (optional, max 1000 chars)"
}
```

#### GET `/api/v1/content`

Retrieve all your saved content.

#### DELETE `/api/v1/content/:id`

Delete specific content item.

### AI Query System

#### POST `/api/v1/query`

Query your content with AI.

```json
{
  "query": "string (max 1000 chars)"
}
```

**Response:**

```json
{
  "message": "Query processed successfully",
  "response": "AI-generated response",
  "query": "original query",
  "sourceCount": 3
}
```

### Brain Sharing

#### POST `/api/v1/brain/share`

Toggle sharing of your memory collection.

```json
{
  "share": true
}
```

#### GET `/api/v1/brain/share`

Check current sharing status.

#### GET `/api/v1/brain/:hash`

Access shared memory collection.

## 🎯 Usage Examples

### Adding Content

1. Click "Add Content" in your dashboard
2. Select content type (Document, YouTube, etc.)
3. Enter title and optional link/description
4. Content is automatically processed and stored

### Querying with AI

1. Click "Query AI" in your dashboard
2. Ask natural language questions about your content
3. Receive intelligent responses with source attribution
4. Example: "What are the key points from my React tutorial videos?"

### Sharing Your Memory

1. Go to your dashboard
2. Toggle "Share Brain" to enable sharing
3. Copy the generated share link
4. Others can view (but not edit) your collection

## 🏗️ Project Structure

```
ai-memory/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── icons/          # Icon components
│   │   └── config.ts       # Configuration
│   ├── index.html
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── config/         # Database config
│   └── package.json
└── README.md
```

## 🔧 Advanced Configuration

### Pinecone Vector Database

- Index dimension: Configured for Gemini embeddings
- Namespaces: User-specific isolation
- Dynamic topK: Intelligent result count based on collection size

### AI Model Configuration

- Model: `gemini-2.0-flash-exp`
- Context window: Optimized for memory querying
- Response format: Conversational, 100-150 words

## 🌐 Deployment

### Live Application

- **Frontend**: Deployed on Vercel at [https://ai-memory-five.vercel.app/](https://ai-memory-five.vercel.app/)
- **Backend**: Deployed on Render with MongoDB Atlas

### Backend Deployment (Render)

1. Set environment variables in your Render dashboard
2. Deploy from GitHub repository
3. Ensure MongoDB Atlas connection

### Frontend Deployment (Vercel/Netlify)

1. Connect your GitHub repository
2. Set `VITE_BACKEND_URL` to your deployed backend URL
3. Build command: `npm run build`
4. Output directory: `dist`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Priyanshu Bajpai**

- GitHub: [@Tiger-raj](https://github.com/Tiger-raj)
- Project: Built with passion for intelligent digital organization

## 🙏 Acknowledgments

- Google AI for Gemini API
- Pinecone for vector database services
- MongoDB for database hosting
- Vercel for frontend deployment
- Render for backend deployment

---

**Note**: This is a demonstration project showcasing AI-powered content management. Currently, AI queries work best with document-type content. Future updates will expand AI querying to all content types.

---

Made with ❤️ for better digital organization
