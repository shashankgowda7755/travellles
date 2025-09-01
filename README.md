# 🌟 Miles Alone - Personal Journey Platform

A modern, full-stack personal journey platform built for sharing authentic life experiences, meaningful places, and personal stories. Perfect for documenting personal growth, solo adventures, and life's meaningful moments.

## ✨ Features

### 🗺️ Interactive Journey Map
- Personal location tracking
- Custom place pins with categories
- Journey progress visualization
- Interactive place exploration

### 📝 Rich Content Management
- Personal blog posts with rich text editor
- Photo galleries with collections
- Place guides and experiences
- Social media integration

### 🎯 Admin Dashboard
- Complete content management system
- Analytics and visitor insights
- SEO optimization tools
- Newsletter management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon/Supabase)
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/miles-alone.git
cd miles-alone

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Deploy database schema
npm run db:push

# Start development server
npm run dev
```

## 📋 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `SESSION_SECRET` | ✅ | 64-character random string |
| `ADMIN_PASSWORD` | ✅ | Admin panel password |
| `NODE_ENV` | ✅ | `production` for live sites |

## 🏗️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Node.js, Express, Drizzle ORM
- **Database**: PostgreSQL (Neon/Supabase)
- **Deployment**: Vercel (serverless functions)

## 🗄️ Database Setup

### Neon Database (Recommended)
1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project
3. Copy the connection string
4. Add to your `.env` file

### Supabase Database
1. Go to [Supabase](https://supabase.com/dashboard)
2. Create a new project
3. Get connection string from Settings → Database
4. Add to your `.env` file

## 🛡️ Security

- All content editing requires admin authentication
- Secure session management with HTTP-only cookies
- SSL-only database connections in production
- Environment-based configuration

## 🎯 Admin Access

After deployment:
1. Go to `/admin` on your site
2. Login with username: `admins` and your `ADMIN_PASSWORD`
3. Start adding your personal journey content!

## 📁 Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
├── api/            # Vercel serverless function
├── shared/         # Database schema and types
├── vercel.json     # Vercel deployment config
└── .env.example    # Environment variables template
```

## 🚀 Deployment Status

✅ **Ready for Vercel deployment**  
✅ **Database schema configured**  
✅ **API endpoints implemented**  
✅ **Frontend build optimized**  
✅ **Environment variables documented**  

---

**Ready to deploy?** Push to GitHub and connect to Vercel! 🚀