# Future Flow ( AI-Powered Career Path & Roadmap Generator )

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

The system works in **two stages**:

### 1️⃣ Career Path Explorer (Mindmap Generator)

- Input: Student's current education level (10th, 12th, Diploma, B.Tech, M.Tech, etc.)
- AI generates **career mindmaps** showing all possible career trajectories for that education level.
- Students can select a desired career role from the visual map.
- Example: 12th PCM → Engineering → Computer Science → Data Scientist / Software Engineer / Cloud Architect

---

### 2️⃣ Roadmap & Course Planner

- After a career is selected, the system generates a **personalized learning roadmap** including:
  - **Fundamentals and core concepts**
  - **Required tools and technologies**
  - **Intermediate and advanced topics**
  - **Project-based milestones**
  - **Internship & job preparation plan**
- **Resource Retrieval Agent** scrapes the web for high-quality resources:
  - YouTube playlists
  - Coursera / Udemy / NPTEL courses
  - GitHub project templates
  - Blogs, cheat sheets, roadmap.sh references
- All resources are stored in a **Vector Database (ChromaDB/FAISS)** for fast retrieval and future query by a chatbot interface.

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
| Vector Database             | ChromaDB / FAISS                  |
| Web Scraping                | requests / BeautifulSoup4 / serpapi |
| Backend (optional)          | FastAPI                            |
| Demo / Notebook             | Jupyter / Google Colab             |
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
