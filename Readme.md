**Prototype youtube link :**   https://youtu.be/vSmYL7FWncI


# 🚀 Future Flow (AI-Powered Roadmap & Career Path Generator)

Transforming career guidance from **generic advice** to **dynamic, personalized, AI-driven learning roadmaps** with curated resources and structured weekly learning plans.

---

## 🧠 Problem Statement

Students often face two major challenges in their learning journey:

1. **Lack of Personalized Guidance**  
   Most platforms provide static lists or one-size-fits-all content. Learners struggle to know what to study next or how to structure their progress.

2. **Resource Overload Without Structure**  
   Countless tutorials exist online, but students often feel overwhelmed about which ones to follow or in what order.

Our system solves this by creating **AI-powered personalized roadmaps** that guide learners step-by-step from fundamentals to mastery, supported by curated online resources and adaptive feedback.

---

## 💡 Solution Overview

Transform your learning experience with AI-generated roadmaps that are **personalized**, **adaptive**, and **resource-rich**.

### 🧭 Core Features

#### 1️⃣ AI-Powered Roadmap Generation
- **Personalized Learning Paths** — Tailored to your current skill level, available time, and learning style.  
- **Smart Resource Discovery** — Automatically curates top YouTube tutorials, articles, and documentation.  
- **Adaptive Difficulty** — Gradually increases complexity as you progress.

#### 2️⃣ Progress Tracking & Analytics
- **Visual Progress Indicators** — Track completion across weekly milestones.  
- **Milestone Celebrations** — Get achievements and learning badges.  
- **Learning Analytics** — Understand your learning patterns and growth rate.

#### 3️⃣ Community Features (Pro)
- **Public Roadmap Sharing** — Share your learning journeys with peers.  
- **Discover Learning Paths** — Get inspired by community-shared roadmaps.  
- **Collaborative Learning** — Discuss, compare, and co-learn with others.

#### 4️⃣ Subscription Management
- **Freemium Model** — 1 free roadmap/month; upgrade for unlimited access.  
- **Razorpay Integration** — Secure payments (₹79/month).  
- **Usage Analytics** — Track API calls and subscription limits.

---

## 🔄 Process Pipeline

1. **User Input**
   - Education background, skill level, and learning goals.

2. **Profiling Agent**
   - Analyzes user background and identifies learning gaps.

3. **Roadmap Generator Agent**
   - Builds a structured weekly learning roadmap.

4. **Resource Aggregation**
   - Web scraping + RAG (Retrieval-Augmented Generation) approach curates the best YouTube, GitHub, Coursera, and blog content.  
   - Data stored in **ChromaDB / FAISS** for fast retrieval.

5. **Curriculum Planner**
   - Converts the roadmap into a **weekly study plan** with projects, checklists, and progress tracking.

6. **Final Output**
   - ✅ Downloadable PDF Roadmap  
   - ✅ Resource Library  
   - ✅ Interactive Q&A Chatbot  

---

## 🧠 Architecture Diagram

```
          ┌─────────────────────────┐
          │   User Input (Profile)  │
          │ - Education Level       │
          │ - Background / Skills   │
          └───────────┬────────────┘
                      │
                      ▼
         ┌────────────────────────────┐
         │   Profiling Agent          │
         │ - Skill Gap Analysis       │
         │ - Learning Style           │
         └───────────┬───────────────┘
                      │
                      ▼
       ┌───────────────────────────────┐
       │ Roadmap Generator Agent       │
       │ - Stepwise Learning Plan      │
       │ - Fundamentals → Projects     │
       └───────────┬──────────────────┘
                      │
                      ▼
  ┌────────────────────────────────────────┐
  │ Resource Scraper Agent + Vector DB      │
  │ - YouTube / Coursera / GitHub          │
  │ - Blogs, Cheatsheets, Roadmap.sh       │
  │ - Stored in ChromaDB / FAISS           │
  └───────────┬────────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────────┐
        │ Curriculum Planner Agent     │
        │ - Weekly Study Plan          │
        │ - Project Tracker            │
        │ - Skill Checklists           │
        └───────────┬─────────────────┘
                      │
                      ▼
        ┌────────────────────────────┐
        │ Final Output                │
        │ - PDF Roadmap               │
        │ - Interactive Chatbot       │
        │ - Resource Library          │
        └────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Component | Technology / Tool |
|------------|------------------|
| **LLM Reasoning** | GPT-5 / Claude / Gemini |
| **Database** | Supabase |
| **Vector Store** | Supabase buckets |
| **Web Scraping** | Requests / BeautifulSoup4 / SerpAPI |
| **Backend** | deno environment(supabase serverless backend) |
| **Frontend** | React + Tailwind + Shadcn UI |

---

## 🌟 Key Features

- ✅ Multi-Agent Architecture  
- ✅ Personalized Roadmap Generator  
- ✅ Resource Aggregation using RAG  
- ✅ Adaptive Difficulty Levels  
- ✅ Interactive Chatbot  
- ✅ Downloadable PDFs & Trackers  

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|-----------|-------------|-----------|
| `VITE_SUPABASE_URL` | Supabase project URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | ✅ |
| `GEMINI_API_KEY` | Google Gemini API key | ✅ |
| `YOUTUBE_API_KEY` | YouTube Data API v3 key | ✅ |
| `RAZORPAY_KEY_ID` | Razorpay key ID | Optional |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key | Optional |

---

## 💰 API Rate Limits

| Service | Free Tier | Pro Tier |
|----------|------------|----------|
| Roadmap Generation | 1/month | Unlimited |
| YouTube Searches | 20/month | Unlimited |

---

---

## ⚙️ Planned But Unimplemented

We had initially planned to integrate a **Career Path Explorer (Mindmap Generator)** that visually displayed multiple career trajectories based on user education levels.  
However, due to **time constraints**, this feature was not implemented in the current version and is reserved for a future release.
