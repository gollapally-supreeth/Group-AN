



# Future Flow ( AI-Powered Roadmap & Career Path Generator )

Transforming career guidance from generic advice to **dynamic, personalized, AI-driven roadmaps** with curated resources and structured learning plans.

---

## 🧠 Problem Statement

Students often face two major challenges in career planning:

1. **Choosing the Right Career Path**
  - With hundreds of options post-10th, 12th, or higher education, students struggle to identify which careers align with their interests, skills, and education background.
   
2. **Planning the Path to Reach Their Goal**
  - Once a career is chosen, learners lack clear guidance on the skills to acquire, the sequence of learning, projects to build, and the best resources available online.
  - Most current solutions provide only static lists, scattered advice, or generic recommendations, leaving students overwhelmed and unfocused.

**Our solution:** A multi-agent AI system that generates **career mindmaps**, personalized learning roadmaps, and curates resources across the internet to guide students from **career selection → skill mastery → goal achievement**.

---

## 💡 Solution Overview

Transform your learning journey with AI-generated, personalized roadmaps. Master any skill with step-by-step guidance, curated resources, and progress tracking.
### 1️⃣ Career Path Explorer (Mindmap Generator)

- Input: Student's current education level (10th, 12th, Diploma, B.Tech, M.Tech, etc.)
- AI generates **career mindmaps** showing all possible career trajectories for that education level.
- Students can select a desired career role from the visual map.
- Example: 12th PCM → Engineering → Computer Science → Data Scientist / Software Engineer / Cloud Architect

---

### 2️⃣ Roadmap & Course Planner

🤖 AI-Powered Roadmap Generation
Personalized Learning Paths: Custom 4-week roadmaps tailored to your skill level, time availability, and learning style
Smart Resource Discovery: Automatically curated YouTube tutorials, articles, and documentation
Adaptive Difficulty: Progressive learning structure that adapts to your experience level

📊 Progress Tracking & Analytics
Visual Progress Indicators: Track completion across weeks and individual tasks
Milestone Celebrations: Built-in checkpoints and achievement system
Learning Analytics: Insights into your learning patterns and progress

👥 Community Features (Pro)
Public Roadmap Sharing: Share your roadmaps with the community
Discover Learning Paths: Browse and get inspired by others' roadmaps
Collaborative Learning: Learn from proven learning strategies

💎 Subscription Management
Freemium Model: 1 free roadmap per month, upgrade for unlimited access
Razorpay Integration: Secure payments for Indian users (₹79/month)
Usage Analytics: Track API usage and subscription limits

---

### 🔄 Process Pipeline

1. **Career Mindmap Generation**
  - Student selects education level
  - LLM generates visual career paths with multiple options

2. **Career Selection**
  - Student chooses a desired career role

3. **Profiling Agent**
  - Assesses student background, skill gaps, and learning style

4. **Roadmap Generation**
  - Multi-agent system creates step-by-step personalized roadmap

5. **Resource Aggregation**
  - Web scraping + RAG approach stores the best online resources in a vector database

6. **Curriculum Planner Agent**
  - Converts roadmap and resources into weekly study plans, project trackers, and skill checklists

7. **Final Output**
  - Downloadable PDF roadmap
  - Mindmap visualization
  - Personalized study schedule
  - Resource library
  - Optional interactive Q&A via chatbot

---

## 🧠 Architecture Diagram

              ┌─────────────────────────┐
              │   User Input (Profile)  │
              │ - Education Level       │
              │ - Background / Skills   │
              └───────────┬────────────┘
                      │
                      ▼
           ┌────────────────────────────┐
           │ Career Mindmap Generator   │
           │ (LLM + Visualization)     │
           └───────────┬────────────────┘
                      │
                      ▼
             ┌───────────────────────┐
             │ User Career Selection │
             └───────────┬───────────┘
                     │
                     ▼
             ┌───────────────────────┐
             │   Profiling Agent      │
             │ - Skill Gap Analysis   │
             │ - Learning Style       │
             └───────────┬───────────┘
                     │
                     ▼
           ┌────────────────────────────┐
           │ Roadmap Generator Agent     │
           │ - Stepwise Learning Plan    │
           │ - Fundamentals → Projects  │
           └───────────┬────────────────┘
                     │
                     ▼
      ┌────────────────────────────────────────┐
      │ Resource Scraper Agent + Vector DB      │
      │ - YouTube / Coursera / Udemy / GitHub  │
      │ - Blogs, cheat sheets, roadmap.sh      │
      │ - Stored in ChromaDB / FAISS           │
      └───────────┬────────────────────────────┘
              │
              ▼
        ┌─────────────────────┐
        │ Curriculum Planner  │
        │ - Weekly Study Plan │
        │ - Project Tracker   │
        │ - Skill Checklists  │
        └───────────┬─────────┘
                │
                ▼
        ┌───────────────────────────┐
        │      Final Output          │
        │ - PDF Roadmap             │
        │ - Mindmap Visualization   │
        │ - Interactive Chatbot     │
        │ - Resource Library        │
        └───────────────────────────┘


---

## 🛠️ Tech Stack

| Component                  | Technology / Tool                  |
|-----------------------------|-----------------------------------|
| LLM Reasoning               | GPT-5 / Claude / Gemini           |
| Agents Framework            | LangChain Multi-Agent / CrewAI    |
| Embeddings                  | `text-embedding-3-small`          |
| Database                    | SupaBase                          |
| Web Scraping                | requests / BeautifulSoup4 / serpapi |
| Backend (optional)          | FastAPI                            |
| Visualization               | Plotly / NetworkX / Graphviz       |

---

## 🌟 Key Features

- **Multi-Agent Architecture:** Profiling, roadmap generation, resource scraping, and curriculum planning
- **Career Mindmaps:** Visual paths for any education level
- **Personalized Roadmaps:** Step-by-step plan tailored to skill gaps and learning style
- **Resource Aggregation:** Curated, verified online resources
- **Interactive Q&A (Optional):** Chatbot interface for career or topic queries
- **Downloadable Outputs:** PDFs, trackers, mindmaps, and study plans

---

## 🎥 Demo Flow 
1. Select education level → Generate career mindmap
2. Choose desired career role
3. Show AI profiling and skill gap analysis
4. Generate roadmap + weekly study plan
5. Display curated resources
6. Optional: Ask chatbot career or skill-related questions

---

```

🔧 Configuration
Environment Variables
Variable	Description	Required
VITE_SUPABASE_URL	Supabase project URL	Yes
VITE_SUPABASE_ANON_KEY	Supabase anonymous key	Yes
SUPABASE_SERVICE_ROLE_KEY	Supabase service role key	Yes
GEMINI_API_KEY	Google Gemini API key	Yes
YOUTUBE_API_KEY	YouTube Data API v3 key	Yes
RAZORPAY_KEY_ID	Razorpay key ID	Optional
RAZORPAY_KEY_SECRET	Razorpay secret key	Optional

API Rate Limits
Service	Free Tier	Pro Tier
Roadmap Generation	1/month	Unlimited
YouTube Searches	20/month	Unlimited

🎨 Customization
Theming
The app uses Tailwind CSS with custom design tokens. Modify colors in:

`src/index.css` - CSS custom properties
`tailwind.config.ts` - Tailwind theme extension

Adding New Components
```bash
# Add a new Shadcn/ui component
npx shadcn-ui@latest add [component-name]
```

Google Gemini for AI-powered roadmap generation
YouTube Data API for video resource discovery
Razorpay for seamless payment processing 

