# 🧠 IdeaForge

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?style=flat-square)
![Status](https://img.shields.io/badge/status-active-success.svg?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7-green?style=flat-square&logo=mongodb)
![Raindrop](https://img.shields.io/badge/liquidmetal-a66fee?style=flat-square&logo=Raindrop)
![Stripe](https://img.shields.io/badge/Stripe-grey?style=flat-square&logo=stripe)
![Netlify](https://img.shields.io/badge/Netlify-Deploy-blue?style=flat-square&logo=netlify)
![Cloudflare](https://img.shields.io/badge/Cloudflare-grey?style=flat-square&logo=cloudflare)
![vulter](https://img.shields.io/badge/vulter-0080ff?style=flat-square&logo=vulter)
![workos](https://img.shields.io/badge/workos-5c5cf0?style=flat-square&logo=workos)

> **"From Chaos to Clarity — Build Your MVP with Confidence"**  
> The AI-powered workspace for developers and indie hackers who turn ideas into reality.

---

## 🎯 What is IdeaForge?

**IdeaForge** is a specialized SaaS platform built for **developers and indie hackers** who struggle with the chaos of new ideas. When inspiration strikes, you often don't know where to start, what to build first, or how to structure your project.

**IdeaForge solves this** by transforming your raw idea into a complete, actionable blueprint in minutes.

### The Problem
You have a brilliant idea, but:
- 🤯 Your thoughts are scattered and unorganized
- 🤷 You don't know what tech stack to use
- 📋 You're unsure about the MVP scope
- 🗺️ You can't visualize the user journey
- ⏰ You waste hours planning instead of building

### The Solution
Enter your idea into IdeaForge's **AI Workspace**, and our intelligent system instantly generates:

✅ **Complete Visual Map** — See your entire idea laid out visually with all components and relationships  
✅ **User Journey Mapping** — Understand how users will interact with your product  
✅ **Recommended Tech Stack** — Get AI-powered technology recommendations tailored to your project  
✅ **AI Insights** — Deep analysis of your idea with strategic recommendations  
✅ **Next Steps** — Clear, prioritized action items to move forward  
✅ **MVP Checklist** — Kanban board with all essential features for your minimum viable product  
✅ **Complete Prompt** — Copy-paste ready prompt for v0, Bolt, or any AI coding tool to build your MVP instantly

---

## ✨ Key Features

### 🤖 AI-Powered Workspace
- **Liquidmetal Raindrop AI** with smart memory and internal Llama models
- Contextual understanding of your project across sessions
- Intelligent suggestions based on your development style

### 🗺️ Visual Intelligence
- **Interactive Mind Maps**: Auto-generated visual representation of your entire idea
- **User Journey Flows**: See how users navigate through your product
- **Component Relationships**: Understand dependencies and connections
- **Glassmorphism UI**: Beautiful, draggable nodes with a premium feel

### 📊 Project Planning Suite
- **Tech Stack Recommendations**: AI-curated technology suggestions
- **MVP Kanban Board**: Pre-populated with essential features
- **Next Steps Timeline**: Prioritized action items
- **AI Insights Panel**: Strategic analysis and recommendations

### 🎨 Premium Design
- **"Natural Intelligence" Design System**: Calm, Notion-like aesthetic with stone colors
- **Dark Mode**: Perfect for late-night coding sessions
- **Responsive**: Works seamlessly on desktop and tablet
- **Minimal Distractions**: Focus on what matters — your idea

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with custom CSS Variables
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visual Mapping**: [React Flow](https://reactflow.dev/) (`@xyflow/react`)

### Backend & Infrastructure
- **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose
- **Authentication**: [WorkOS](https://workos.com/) AuthKit
- **Payments**: [Stripe](https://stripe.com/)
- **Hosting**: [Netlify](https://www.netlify.com/)

### AI & Intelligence
- **AI Engine**: [**Liquidmetal Raindrop**](https://liquidmetal.run) with [smart memory](https://docs.liquidmetal.ai/concepts/smartmemory/)
- **Model**: Internal [**AI model**](https://docs.liquidmetal.ai/concepts/ai-models/) models for contextual understanding
- **Features**: Persistent context, multi-turn conversations, project-aware suggestions

### State & Data Management
- **State**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Forms**: React Hook Form
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)
- WorkOS account
- Stripe account
- Netlify account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   https://github.com/TheekshanaCN/Visual-Brain.git
   cd Visual-Brain
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication (WorkOS)
   WORKOS_CLIENT_ID=your_workos_client_id
   WORKOS_API_KEY=your_workos_api_key
   WORKOS_REDIRECT_URI=http://localhost:3000/auth/callback
   JWT_SECRET_KEY=your_jwt_secret_key

   # AI (Liquidmetal Raindrop)
   LIQUIDMETAL_API_KEY=your_liquidmetal_api_key
   LIQUIDMETAL_ENDPOINT=your_liquidmetal_endpoint

   # Payments (Stripe)
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   
   # Stripe Price IDs (for Credit Plans)
   STRIPE_STARTER_PRICE_ID=price_starter_id
   STRIPE_PRO_PRICE_ID=price_pro_id
   STRIPE_POWER_PRICE_ID=price_power_id

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Seed Database** (Optional)
   Initialize credit plans in MongoDB:
   ```bash
   npx tsx scripts/seed-credit-plans.ts
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to start building!

---

## 📂 Project Structure

```
idea-forge/
├── app/                      # Next.js 16 App Router
│   ├── api/                  # API Routes
│   │   ├── projects/         # Project CRUD
│   │   ├── stripe/           # Payment webhooks
│   │   └── feedback/         # User feedback
│   ├── dashboard/            # User Dashboard
│   ├── projects/[id]/        # AI Workspace & Canvas
│   ├── pricing/              # Pricing page
│   └── globals.css           # Design system & stone palette
├── components/               # React Components
│   ├── ui/                   # Radix UI primitives
│   ├── project/              # Canvas, Cards, Panels
│   │   ├── VisualMap.tsx     # Interactive mind map
│   │   ├── ProjectCards.tsx  # MVP, Tech Stack, Insights
│   │   └── FeedbackModal.tsx # User feedback
│   ├── DashboardPage.tsx     # Project management
│   └── Navbar.tsx            # Navigation
├── lib/                      # Utilities & Server Logic
│   ├── db.ts                 # MongoDB connection
│   ├── store.ts              # Zustand state management
│   ├── server/               # Server-side utilities
│   │   └── credit-plans.ts   # Credit plan management
│   └── user-utils.ts         # User credit operations
├── models/                   # Mongoose Schemas
│   ├── Project.ts            # Project model
│   ├── User.ts               # User model
│   ├── CreditPlan.ts         # Credit plans
│   └── AdminPricingSettings.ts
├── scripts/                  # Utility scripts
│   └── seed-credit-plans.ts  # Database seeding
└── public/                   # Static assets
```

---

## 🎨 Design Philosophy

IdeaForge follows the **"Natural Intelligence"** design system:
- **Stone Color Palette**: Calm, professional tones (stone-50 to stone-900)
- **Notion-like Aesthetic**: Clean, minimal, distraction-free
- **Glassmorphism**: Modern glass effects on interactive elements
- **Smooth Animations**: Framer Motion for delightful micro-interactions
- **Dark Mode First**: Optimized for developers who code at night

---

## 🚀 Deployment

### Deploy to Netlify

1. **Connect your repository** to Netlify
2. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Add environment variables** in Netlify dashboard
4. **Deploy!**

---

## 💡 Use Cases

### For Indie Hackers
- Validate ideas quickly before investing time
- Get a complete project blueprint in minutes
- Generate prompts for AI coding tools to build MVPs fast

### For Developers
- Organize scattered thoughts into structured plans
- Get tech stack recommendations based on project requirements
- Visualize complex system architectures

### For Product Managers
- Map user journeys visually
- Create MVP checklists automatically
- Share visual project blueprints with teams

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Liquidmetal Raindrop** for the intelligent AI engine
- **WorkOS** for seamless authentication
- **ShadCN** for accessible component primitives
- **React Flow** for the visual mapping capabilities

---

<p align="center">
  <strong>Built with ❤️ for developers who ship</strong><br>
  Created by <a href="https://github.com/TheekshanaCN">Theekshana</a>
</p>
