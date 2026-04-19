# 🚀 HelpHub AI - Hackathon Project

## ✅ Completed Features

### 🔐 Authentication System
- User Signup & Login
- JWT-based authentication
- Password hashing (bcrypt)
- Protected routes

---

### 📦 Help Request System
- Create help requests with AI auto-categorization
- View all requests with filters
- Mark request as solved
- Request status tracking
- AI-powered urgency detection
- Smart tag suggestions

---

### 👤 User Profile & Onboarding
- User onboarding (name, skills, interests, location)
- Profile page with edit functionality
- Trust score system

---

### 📊 Dashboard
- Total requests count
- Solved requests
- Pending requests
- Recent activity feed
- Quick action buttons

---

### 🌍 Explore / Feed
- View all requests
- Filter by category & urgency
- “I can help” interaction
- Clean card-based UI

---

### 📄 Request Detail Page
- Full request details
- AI-generated summary
- Mark as solved
- Help action button

---

### 🏆 Leaderboard
- Top helpers ranking
- Trust scores
- Contribution tracking
- Badge system (demo)

---

### 🤖 AI Center
- AI insights and trends
- Trending skills
- Platform statistics
- Smart recommendations

---

### 🎨 UI/UX
- Glassmorphism design
- Responsive layout
- Clean dashboard and forms
- Multi-page navigation
- Consistent styling

---

### ⚙️ Backend
- Node.js + Express
- MongoDB + Mongoose
- REST APIs
- Modular architecture (controllers, routes, models)
- AI helper utilities

---

### 🌐 Frontend
- HTML, CSS, JavaScript
- API integration
- Dynamic rendering
- LocalStorage for auth tokens

---

## 🧠 AI Features

### Implemented:
1. **Auto Urgency Detection** - Analyzes request description for urgency keywords
2. **Smart Categorization** - Automatically categorizes requests based on content
3. **Tag Suggestions** - Suggests relevant tags from request content
4. **AI Summary Generation** - Creates concise summaries for requests

---

## 🚀 Deployment
- Frontend: Vercel (https://hackathon-app-frox.vercel.app)
- Backend: Vercel (https://hackathon-setup.vercel.app)

---

## 📁 Project Structure

```
hackathon-setup/
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   └── index.js (main app)
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── itemController.js
│   │   │   ├── requestController.js
│   │   │   └── userController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── Item.js
│   │   │   ├── Request.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── itemRoutes.js
│   │   │   ├── requestRoutes.js
│   │   │   └── userRoutes.js
│   │   └── utils/
│   │       └── aiHelpers.js (AI features)
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── ai.js
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── explore.js
│   │   ├── leaderboard.js
│   │   ├── onboarding.js
│   │   ├── profile.js
│   │   ├── request.js
│   │   └── request-detail.js
│   ├── ai.html
│   ├── dashboard.html
│   ├── explore.html
│   ├── index.html (landing page)
│   ├── leaderboard.html
│   ├── login.html
│   ├── onboarding.html
│   ├── profile.html
│   ├── request.html
│   ├── request-detail.html
│   └── signup.html
└── README.md
```

---

## 🔧 Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcrypt
- **Styling**: Custom CSS with glassmorphism effects
- **Deployment**: Vercel (Frontend + Backend)

---

## 🎯 Hackathon Requirements Met

✅ Multi-page structure  
✅ Clear navigation  
✅ Product-level thinking  
✅ Smart UI/UX  
✅ Authentication with role selection  
✅ Onboarding with AI suggestions  
✅ Dashboard with stats and insights  
✅ Explore/Feed with filters  
✅ Create request with AI features  
✅ Request detail page with AI summary  
✅ Profile management  
✅ Leaderboard system  
✅ AI Center page  
✅ Card-based modern UI  
✅ Full platform architecture  

---

## 🚀 Getting Started

### Backend Setup
```bash
cd backend
npm install
# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
npm start
```

### Frontend Setup
```bash
# Simply open any HTML file in a browser
# Or use a local server:
npx serve frontend
```

---

## 🎨 Design Philosophy
- Inspired by Notion, Stripe, and Linear
- Clean spacing and hierarchy
- Glassmorphism effects
- Responsive and mobile-friendly
- Product-focused, not assignment-focused

---

## 📝 Notes
This is a fully functional hackathon project demonstrating:
- Full-stack development skills
- AI integration capabilities
- Modern UI/UX design
- RESTful API architecture
- Secure authentication
- Real-world product thinking