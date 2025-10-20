# CurlCraft: The Interactive cURL Playground

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/kristopher-lab/generated-app-20251020-133308)

An interactive, retro-themed web playground for learning and experimenting with cURL commands.

CurlCraft is a visually striking, retro-themed single-page web application designed to be an educational playground for the cURL command-line tool. It provides a hands-on, interactive experience for users to learn, build, and test cURL commands directly in their browser. The application is divided into three distinct, seamlessly integrated sections: an Interactive Playground for command construction, a comprehensive Documentation section explaining cURL and its switches, and a Command Cookbook with practical, real-world examples. The entire experience is wrapped in a nostalgic, early-internet aesthetic, featuring neon text, pixelated fonts, and terminal-like interfaces, making learning cURL both engaging and fun.

## Key Features

*   **Interactive Playground:** Build cURL commands with a user-friendly interface of checkboxes and inputs.
*   **Real-time Command Generation:** See your cURL command string update instantly as you select options.
*   **In-Browser Execution:** Run your crafted commands against a mock API and view the response directly in the built-in terminal.
*   **Comprehensive Docs:** An integrated reference guide explaining what cURL is and detailing its most common switches.
*   **Command Cookbook:** A collection of practical, real-world cURL examples that you can load directly into the playground.
*   **Retro Aesthetic:** A unique, nostalgic UI with a dark theme, neon text, and pixelated fonts for a fun learning experience.

## Technology Stack

*   **Frontend:** React, Vite, TypeScript
*   **Backend:** Cloudflare Workers with Hono
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui
*   **State Management:** Zustand
*   **Icons:** Lucide React
*   **Animation:** Framer Motion

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Bun](https://bun.sh/) installed on your machine.
*   A code editor like VS Code.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/curlcraft.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd curlcraft
    ```

3.  **Install dependencies:**
    ```sh
    bun install
    ```

## Development

To run the development server, which includes both the Vite frontend and the Cloudflare Worker for the backend, use the following command:

```sh
bun dev
```

This will start the application, and you can view it in your browser at `http://localhost:3000` (or the port specified in your terminal). The server supports hot-reloading, so changes you make to the code will be reflected automatically.

## Deployment

This project is configured for easy deployment to Cloudflare Pages.

1.  **Login to Wrangler:**
    If you haven't already, you'll need to authenticate Wrangler with your Cloudflare account.
    ```sh
    bunx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script, which will build the application and deploy it to your Cloudflare account.
    ```sh
    bun deploy
    ```

Alternatively, you can deploy directly from your GitHub repository with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/kristopher-lab/generated-app-20251020-133308)

## Project Structure

*   `src/`: Contains all the frontend React application code.
    *   `components/`: Reusable React components, including the main UI sections (`CurlPlayground`, `CurlDocs`, `CurlCookbook`) and shadcn/ui components.
    *   `pages/`: Main page components for the application.
    *   `store/`: Zustand store for state management.
    *   `lib/`: Utility functions and static data.
*   `worker/`: Contains the Cloudflare Worker backend code, built with Hono.
    *   `userRoutes.ts`: Defines the API routes for the application, including the mock cURL proxy.
*   `public/`: Static assets that are served directly.
*   `index.html`: The main HTML entry point for the application.
*   `tailwind.config.js`: Configuration for Tailwind CSS, including the retro theme.

## License

This project is licensed under the MIT License.