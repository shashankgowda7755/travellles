# 🚀 Miles Alone - Personal Journey Platform

A comprehensive personal journey platform for documenting life experiences, adventures, and personal growth. Built with React, TypeScript, Express, and PostgreSQL.

## ✨ Features

- 🔐 **Secure Admin Panel** - Full content management system
- 📝 **Story System** - Create and manage personal experiences and life stories
- 📸 **Gallery Management** - Photo collections with multimedia integration
- 🗺️ **Interactive Journey Map** - Real-time life journey tracking
- 📧 **Newsletter System** - Email subscription management
- 📱 **Mobile Responsive** - Optimized for all devices
- ⚡ **Performance Optimized** - Fast loading and SEO ready

## 🚀 Quick Start

### 1. Database Setup
Choose your database provider:
- **Neon** (Recommended): [Setup Guide](DATABASE_SETUP.md)
- **Supabase**: [Setup Guide](DATABASE_SETUP.md)

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your database URL and credentials
```

### 3. Deploy to Vercel
1. **Push to GitHub**: Upload your project to GitHub
2. **Connect to Vercel**: Import your GitHub repo in Vercel
3. **Add Environment Variables**: Set DATABASE_URL, SESSION_SECRET, and ADMIN_PASSWORD
4. **Deploy**: Click deploy - it should work immediately!

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
3. Start adding your travel content!

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