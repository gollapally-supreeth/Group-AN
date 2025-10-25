# 🎯 PathGenie - AI-Powered Learning Roadmaps

[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)

> Transform your learning journey with AI-generated, personalized roadmaps. Master any skill with step-by-step guidance, curated resources, and progress tracking.

![PathGenie Demo](./public/demo-screenshot.png)

## ✨ Features

### 🤖 AI-Powered Roadmap Generation
- **Personalized Learning Paths**: Custom 4-week roadmaps tailored to your skill level, time availability, and learning style
- **Smart Resource Discovery**: Automatically curated YouTube tutorials, articles, and documentation
- **Adaptive Difficulty**: Progressive learning structure that adapts to your experience level

### 📊 Progress Tracking & Analytics
- **Visual Progress Indicators**: Track completion across weeks and individual tasks
- **Milestone Celebrations**: Built-in checkpoints and achievement system
- **Learning Analytics**: Insights into your learning patterns and progress

### 👥 Community Features (Pro)
- **Public Roadmap Sharing**: Share your roadmaps with the community
- **Discover Learning Paths**: Browse and get inspired by others' roadmaps
- **Collaborative Learning**: Learn from proven learning strategies

### 💎 Subscription Management
- **Freemium Model**: 1 free roadmap per month, upgrade for unlimited access
- **Razorpay Integration**: Secure payments for Indian users (₹79/month)
- **Usage Analytics**: Track API usage and subscription limits

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm/yarn/bun
- **Supabase Account** for database and authentication
- **API Keys** for Gemini AI and YouTube Data API
- **Razorpay Account** for payment processing (optional)

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/pathgenie.git
cd pathgenie
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI & External APIs
GEMINI_API_KEY=your_gemini_api_key
YOUTUBE_API_KEY=your_youtube_data_api_key

# Payment Integration (Optional)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the database migrations:

```bash
# Navigate to your Supabase dashboard
# Go to SQL Editor and run the migration files in order:
# supabase/migrations/*.sql
```

3. Set up Row Level Security (RLS) policies (included in migrations)

### 4. Deploy Edge Functions

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Deploy edge functions
supabase functions deploy generate-roadmap
supabase functions deploy generate-learning-resources
supabase functions deploy razorpay-create-checkout
supabase functions deploy razorpay-webhook
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your application.

## 🏗️ **Technical Architecture** (Startup-Grade Infrastructure)

### Why Our Tech Stack Scales
Our technology choices reflect startup best practices: **fast iteration**, **cost efficiency**, and **infinite scalability**.

### Frontend Stack (Modern & Performant)
- **React 18** with TypeScript for type safety and developer productivity
- **Vite** for lightning-fast development and optimized builds
- **Tailwind CSS** + **Shadcn/ui** for consistent, maintainable design system
- **React Router** for seamless single-page application experience
- **TanStack React Query** for intelligent server state management and caching

### Backend Stack (Serverless & Scalable)
- **Supabase** (PostgreSQL) for production-grade database with real-time capabilities
- **Supabase Edge Functions** (Deno) for serverless compute that scales to zero
- **Row Level Security** for enterprise-grade data protection
- **Real-time subscriptions** for live user experiences

### AI & External Services (Best-in-Class APIs)
- **Google Gemini 1.5 Flash** for state-of-the-art AI roadmap generation
- **YouTube Data API v3** for automated content discovery and curation
- **Razorpay** for localized payment processing in Indian market

### Deployment & DevOps (Production-Ready)
- **Frontend**: Vercel/Netlify with global CDN and automatic deployments
- **Backend**: Supabase managed infrastructure with 99.9% uptime SLA
- **Database**: Auto-scaling PostgreSQL with point-in-time recovery
- **Monitoring**: Built-in analytics and error tracking

## 📁 Project Structure

```
pathgenie/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── roadmap/        # Roadmap-specific components
│   │   ├── Hero.tsx        # Landing page hero
│   │   ├── SkillGenerator.tsx # Main roadmap creation form
│   │   └── ...
│   ├── pages/              # Application routes
│   │   ├── Index.tsx       # Landing page
│   │   ├── Roadmaps.tsx    # User dashboard
│   │   ├── RoadmapView.tsx # Individual roadmap view
│   │   └── ...
│   ├── contexts/           # React Context providers
│   │   └── AuthContext.tsx # Authentication state
│   ├── hooks/              # Custom React hooks
│   │   ├── useSubscription.ts
│   │   ├── useResourceDiscovery.ts
│   │   └── ...
│   ├── integrations/       # External service integrations
│   │   └── supabase/       # Supabase client and types
│   ├── services/           # Business logic services
│   │   └── razorpay.ts     # Payment processing
│   └── lib/                # Utility functions
├── supabase/
│   ├── functions/          # Edge Functions (serverless backend)
│   │   ├── generate-roadmap/
│   │   ├── generate-learning-resources/
│   │   ├── razorpay-*/     # Payment related functions
│   │   └── ...
│   └── migrations/         # Database schema migrations
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # Run TypeScript checks

# Database
npm run db:generate     # Generate TypeScript types from Supabase
npm run db:migrate      # Run database migrations
```

### Key Development Patterns

#### Authentication Flow
```typescript
// Use the AuthContext for user state
const { user, signIn, signOut } = useAuth();

// Protect routes
if (!user) {
  return <Navigate to="/auth" />;
}
```

#### API Calls to Edge Functions
```typescript
// Example: Generate roadmap
const { data, error } = await supabase.functions.invoke('generate-roadmap', {
  body: { skill, level, timeCommitment, learningStyle, goal, timeline }
});
```

#### Subscription Management
```typescript
// Check user subscription status
const { subscription, usage, isProUser } = useSubscription();

// Enforce limits
if (!isProUser && usage.gemini >= 1) {
  // Show upgrade prompt
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `YOUTUBE_API_KEY` | YouTube Data API v3 key | Yes |
| `RAZORPAY_KEY_ID` | Razorpay key ID | Optional |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key | Optional |

### API Rate Limits

| Service | Free Tier | Pro Tier |
|---------|-----------|----------|
| Roadmap Generation | 1/month | Unlimited |
| YouTube Searches | 20/month | Unlimited |

## 🎨 Customization

### Theming
The app uses Tailwind CSS with custom design tokens. Modify colors in:
- `src/index.css` - CSS custom properties
- `tailwind.config.ts` - Tailwind theme extension

### Adding New Components
```bash
# Add a new Shadcn/ui component
npx shadcn-ui@latest add [component-name]
```

### Custom Animations
Define custom animations in `tailwind.config.ts`:
```typescript
animation: {
  'custom-bounce': 'custom-bounce 1s ease-in-out infinite',
}
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

```bash
# Manual deployment
npm run build
vercel --prod
```

### Backend Deployment (Supabase)

Edge Functions deploy automatically when you push to your Supabase project:

```bash
supabase functions deploy --project-ref your-project-ref
```

### Database Migrations

```bash
# Apply migrations to production
supabase db push --project-ref your-project-ref
```

## 📊 Monitoring & Analytics

### Performance Monitoring
- Supabase Dashboard for database performance
- Vercel Analytics for frontend metrics
- Edge Function logs for backend monitoring

### Error Tracking
- Console error logging in development
- Supabase Edge Function logs for production errors
- User feedback through toast notifications

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following our coding standards
4. **Add tests** for new functionality
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Coding Standards
- Use TypeScript for all new code
- Follow React best practices and hooks patterns
- Use Prettier for code formatting
- Write meaningful commit messages
- Add JSDoc comments for complex functions

### Pull Request Guidelines
- Include a clear description of changes
- Add screenshots for UI changes
- Ensure all tests pass
- Update documentation if needed

## 📝 API Documentation

### Edge Functions

#### Generate Roadmap
```typescript
POST /functions/v1/generate-roadmap
Content-Type: application/json
Authorization: Bearer <user-jwt>

{
  "skill": "React",
  "level": "Beginner",
  "timeCommitment": "10",
  "learningStyle": "Visual",
  "goal": "Build a web application",
  "timeline": 4
}
```

#### Generate Learning Resources
```typescript
POST /functions/v1/generate-learning-resources
Content-Type: application/json
Authorization: Bearer <user-jwt>

{
  "taskId": "task-uuid",
  "skillName": "React",
  "taskTitle": "Learn React Hooks",
  "taskType": "video",
  "roadmapId": "roadmap-uuid"
}
```

### Database Schema

Key tables:
- `profiles` - User profiles and preferences
- `roadmaps` - Generated learning roadmaps
- `subscribers` - Subscription and payment data
- `learning_resources` - Curated learning materials
- `api_usage_tracking` - Rate limiting and analytics

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Database Connection Issues**
- Verify Supabase URL and keys in `.env.local`
- Check if RLS policies are properly configured
- Ensure service role key has proper permissions

**AI Generation Failures**
- Verify Gemini API key is valid and has quota
- Check Edge Function logs in Supabase dashboard
- Ensure prompts are within token limits

**Payment Issues**
- Verify Razorpay credentials in production
- Check webhook URL configuration
- Monitor payment webhooks in Razorpay dashboard


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) for the amazing backend-as-a-service platform
- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Google Gemini](https://deepmind.google/technologies/gemini/) for AI-powered roadmap generation
- [YouTube Data API](https://developers.google.com/youtube/v3) for video resource discovery
- [Razorpay](https://razorpay.com/) for seamless payment processing

---

**Built with ❤️ by PardhaSaraadhi for learners worldwide**

[🌟 Star this repo](https://github.com/yourusername/pathgenie) | [🐛 Report Bug](https://github.com/yourusername/pathgenie/issues) | [💡 Request Feature](https://github.com/yourusername/pathgenie/issues)
