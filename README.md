# Visual Brain 🧠

**Visual Brain** is an intelligent tool that transforms messy thoughts, notes, and ideas into structured, visual clusters. Powered by Google's Gemini AI, it organizes your raw input into a clear, interactive mind map, providing summaries, key themes, and actionable next steps.

![Visual Brain](https://raw.githubusercontent.com/TheekshanaCN/Visual-Brain/refs/heads/main/public/og-image.JPG?token=GHSAT0AAAAAADN3UTPSW2CTIMZDHJFZZ2EC2JB5JTA)

## ✨ Features

- **AI Auto-Clustering**: Automatically groups raw text into logical categories and sub-items.
- **Interactive Visual Map**: Draggable nodes and connections using [React Flow](https://reactflow.dev/).
- **AI Insights Panel**: Generates a concise summary, identifies key themes, and suggests next steps.
- **Snapshot Export**: Export your visual graph as a high-quality PNG image.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Visualization**: [React Flow](https://reactflow.dev/)
- **AI Model**: [Google Gemini 2.0 Flash](https://ai.google.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/visual-brain.git
    cd visual-brain
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up Environment Variables:**

    Create a `.env.local` file in the root directory and add your Gemini API key:

    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

1.  **Input**: Paste your raw notes, brainstorming ideas, or random thoughts into the text box on the left.
2.  **Visualize**: Click the **"Visualize"** button. The AI will process your text (this may take a few seconds).
3.  **Explore**:
    - **Map**: Interact with the generated nodes. Drag them around to organize your thoughts.
    - **Insights**: Check the panel on the right for a summary and actionable steps.
4.  **Export**: Click **"Export Snapshot"** at the bottom to save your map as an image.


## 👤 Author

**Theekshana**

- [GitHub](https://github.com/TheekshanaCN)
- [LinkedIn](https://www.linkedin.com/in/theekshana-chamodhya)
- [X (Twitter)](https://x.com/theekshana_c_n)

---

*Built with ❤️ using Next.js and Gemini AI.*
