# 🎄 Naughty and Nice - Secret Santa Web App

A cozy, festive Secret Santa web application built with React, TypeScript, Express.js, and MongoDB. Organize gift exchanges with friends, family, or coworkers in a beautiful, user-friendly interface.

## ✨ Features

### 🎁 Core Features (MVP)
- **Group Creation**: Create Secret Santa groups with custom budgets and exchange dates
- **Easy Joining**: Participants join with a simple group code
- **Smart Assignment**: Automatic Secret Santa assignment algorithm (no self-assignments)
- **Gift Preferences**: Participants can share detailed gift preferences
- **Reveal System**: Secure, unique links for each participant to see their assignment
- **Responsive Design**: Beautiful on desktop and mobile devices

### 🔮 Coming Soon
- **AI Gift Assistant**: Personalized gift suggestions powered by AI
- **Magic Link Authentication**: Passwordless login system
- **Advanced Group Management**: More customization options
- **Gift Tracking**: Mark gifts as purchased
- **Notifications**: Email reminders and updates

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** with custom cozy winter theme
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for beautiful icons

### Backend
- **Express.js** with TypeScript
- **MongoDB** with Mongoose ODM
- **CORS** enabled for cross-origin requests
- **Nanoid** for generating unique codes

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd naughty-and-nice
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # In the backend directory, create a .env file:
   cp .env.example .env
   
   # Edit .env with your settings:
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/naughty-and-nice
   NODE_ENV=development
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB:
   mongod
   
   # Or make sure your MongoDB Atlas connection string is in .env
   ```

6. **Run the application**
   ```bash
   # From the root directory, start both frontend and backend:
   npm run start-all
   
   # Or run separately:
   npm run dev          # Frontend (port 3000)
   npm run backend      # Backend (port 5000)
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
naughty-and-nice/
├── src/                    # Frontend React app
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # React entry point
│   └── index.css          # Global styles with Tailwind
├── backend/               # Express.js API
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── server.ts      # Express server
│   └── package.json       # Backend dependencies
├── public/                # Static assets
├── package.json           # Frontend dependencies
└── README.md             # This file
```

## 🎨 Design System

### Color Palette
- **Christmas Red**: Primary accent color for buttons and highlights
- **Forest Green**: Secondary color for navigation and text
- **Cream**: Warm background tones and subtle accents
- **White/Transparent**: Cards and overlays with backdrop blur

### Components
- **Cozy Cards**: Rounded corners with subtle shadows and transparency
- **Festive Buttons**: Prominent with smooth hover effects
- **Modern Forms**: Clean inputs with focus states
- **Responsive Layout**: Mobile-first design approach

## 🔧 API Endpoints

### Groups
- `POST /api/groups` - Create a new group
- `GET /api/groups/:id` - Get group by ID
- `GET /api/groups/code/:code` - Get group by invitation code

### Participants
- `POST /api/participants` - Join a group
- `GET /api/participants/group/:groupId` - List participants in a group
- `GET /api/participants/:uniqueId` - Get participant by unique ID

### Assignments
- `POST /api/assignments/generate/:groupId` - Generate Secret Santa assignments
- `GET /api/assignments/reveal/:uniqueId` - Get assignment for reveal page
- `GET /api/assignments/status/:groupId` - Check if assignments exist

## 🏗️ Development

### Scripts
```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
cd backend
npm run dev          # Start with nodemon
npm run build        # Compile TypeScript
npm run start        # Start compiled server

# Both
npm run start-all    # Start frontend and backend concurrently
```

### Environment Variables
```bash
# Backend (.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/naughty-and-nice
NODE_ENV=development
```

## 🎯 Usage Guide

### For Group Creators
1. Click "Create Group" on the homepage
2. Fill in group details (name, description, date, budget)
3. Share the generated group code with participants
4. Monitor participants joining in the group dashboard
5. Generate Secret Santa assignments when everyone has joined

### For Participants
1. Click "Join Group" on the homepage
2. Enter the group code provided by the organizer
3. Fill in your details and gift preferences
4. Bookmark your unique reveal page link
5. Check your assignment when it's generated

## 🚧 Known Limitations (MVP)

- No user authentication (magic links coming soon)
- No email notifications (manual sharing of links)
- Basic assignment algorithm (no complex exclusion rules)
- No group editing after creation
- No gift purchase tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎄 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact the development team

---

**Happy Secret Santa organizing! 🎅🎁** 