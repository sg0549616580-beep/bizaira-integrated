# Environment Setup Guide

## Quick Start (Development with Mock Data)

The application is configured to work immediately with mock data. No additional setup required to run!

### Just Run:
```bash
npm run dev      # Starts frontend on http://localhost:4173
npm start        # Starts backend on http://localhost:3000
```

---

## Environment Variables Explained

### `PORT` (Default: 3000)
- Backend Express server port
- Change only if 3000 is already in use

### `AI_API_KEY` (Optional)
- **Purpose**: Enables real AI image and text generation
- **Type**: String (API key)
- **How to Get**:
  1. Visit https://ai.gateway.lovable.dev
  2. Create an account / login
  3. Generate API keys in dashboard
  4. Copy key here
- **Without it**: Features use mock data (perfect for dev/testing)

### `DATABASE_URL` (Optional)
- **Purpose**: Connects to PostgreSQL database
- **Type**: PostgreSQL connection string
- **Format**: `postgresql://user:password@host:port/dbname`
- **Without it**: Data is stored in browser localStorage (development only)
- **Can Set Up Later**: Database is not required to run the app

---

## Setup Scenarios

### ✅ Scenario 1: Quick Development (Recommended)
**Status**: Ready now, no setup needed

```env
PORT=3000
AI_API_KEY=         # Empty - mock data
DATABASE_URL=       # Empty - localStorage
```

**What Works**:
- Browse all pages ✅
- AI wizard forms (no actual generation)
- Authentication (mock mode)
- Dashboard & all features

**Good For**: UI/UX development, testing flows, demos

---

### 🎯 Scenario 2: With AI Features
**Time**: ~10 minutes

1. **Get API Key**:
   ```bash
   # Visit https://ai.gateway.lovable.dev
   # Create account and generate API key
   ```

2. **Update .env**:
   ```env
   AI_API_KEY=sk-xxx...your-key-here...xxx
   ```

3. **Restart server**:
   ```bash
   npm start  # Backend will now call AI gateway
   ```

**What Works**:
- Everything from Scenario 1, plus:
- Real image generation ✅
- Real text generation ✅
- AI features functional ✅

**Good For**: Testing AI features, generating real content

---

### 💾 Scenario 3: With Database
**Time**: ~15-30 minutes (depends on setup speed)

1. **Set Up PostgreSQL**:

   **Option A - Local (Mac/Linux)**:
   ```bash
   # Install PostgreSQL
   brew install postgresql@15
   
   # Start service
   brew services start postgresql@15
   
   # Create database
   createdb bizaira
   ```

   **Option B - Local (Windows)**:
   - Download from https://www.postgresql.org/download/windows/
   - Run installer with default settings
   - Note: password (typically "postgres")

   **Option C - Cloud (Recommended)**:
   - Sign up: https://render.com
   - Create PostgreSQL instance
   - Copy connection string

2. **Update .env**:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/bizaira
   ```

3. **Run migrations** (when implemented):
   ```bash
   # npm run db:migrate  # Future command
   ```

4. **Restart server**:
   ```bash
   npm start
   ```

**What Works**:
- Everything from Scenario 2, plus:
- User data persistence ✅
- Authentication storage ✅
- Creation history ✅

**Good For**: Production deployment, data persistence

---

### 🔐 Scenario 4: Full Stack with Real Auth
**Time**: ~20-30 minutes

**Prerequisites**: Complete Scenario 3 first

1. **Create Supabase Project**:
   - Visit https://supabase.com
   - Create new project
   - Copy Project URL and Anon Key

2. **Update supabase client** (`src/integrations/supabase/client.ts`):
   ```typescript
   import { createClient } from '@supabase/supabase-js'
   
   export const supabase = createClient(
     process.env.VITE_SUPABASE_URL!,
     process.env.VITE_SUPABASE_ANON_KEY!
   )
   ```

3. **Add to .env**:
   ```env
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-key-here
   ```

4. **Restart**:
   ```bash
   npm run dev  # Frontend picks up new vars
   npm start    # Backend
   ```

**What Works**:
- Everything from Scenario 3, plus:
- Real user authentication ✅
- OAuth providers (Google, GitHub) ✅
- Secure session management ✅

**Good For**: Production-ready application

---

## Checking Your Setup

### Frontend Ready?
```bash
npm run dev
# Visit http://localhost:4173
# Should see landing page ✅
```

### Backend Ready?
```bash
npm start
# Server logs: "[server] running on port 3000" ✅
```

### API Working?
```bash
# Test from browser console:
fetch('/api/generate-text', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'Hello' })
})
// Should return mock or real response
```

### Database Connected?
```bash
# When DATABASE_URL is set, server logs connection success
# Look for: "Database connected" or similar
```

---

## Troubleshooting

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use
```env
PORT=3001  # Use different port
```

### AI_API_KEY not working
- Check key is valid at https://ai.gateway.lovable.dev
- Verify key is copied completely (no spaces)
- Check rate limits haven't been exceeded

### Database connection fails
- Verify connection string format
- Check PostgreSQL is running
- Try connecting with pgAdmin or similar

### CSS/styling looks broken
```bash
npm run build  # Rebuild with latest styles
```

---

## Development Commands

```bash
# Start frontend (Vite dev server)
npm run dev

# Start backend (Express with nodemon)
npm start

# Build for production
npm run build

# View compiled output
npm run preview
```

---

## Next Steps

1. ✅ **Right now**: Run `npm run dev` + `npm start` to see it working
2. **Soon**: Add `AI_API_KEY` for real AI features
3. **Later**: Set up PostgreSQL for data persistence
4. **Eventually**: Add Supabase for real authentication

---

## Need Help?

- **Vite docs**: https://vitejs.dev
- **React Router**: https://reactrouter.com
- **Express**: https://expressjs.com
- **PostgreSQL**: https://www.postgresql.org/docs
- **Supabase**: https://supabase.com/docs

Enjoy building! 🚀
