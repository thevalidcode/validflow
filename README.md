# ValidFlow: Intelligent File Organization

Welcome to **ValidFlow**, a seamless desktop application engineered to bring order to your digital life! Tired of cluttered download folders or scattered documents? ValidFlow silently works in the background, automatically categorizing and moving your files into designated directories, ensuring your digital workspace remains pristine. It's built for efficiency, designed to make file management effortless and truly hands-free.

## 🚀 Getting Started

To get ValidFlow up and running on your local machine, follow these straightforward steps.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js & npm**: For the frontend and project orchestration. You can download it from [nodejs.org](https://nodejs.org/).
- **Python 3.12+**: For the backend services. Get it from [python.org](https://www.python.org/downloads/).
- **Pipenv**: For Python dependency management. Install with `pip install pipenv`.
- **Rustup**: For Tauri, the desktop framework. Install with `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh` (Linux/macOS) or download the installer (Windows) from [rustup.rs](https://rustup.rs/).

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate into the project directory**:
    ```bash
    cd validflow
    ```
3.  **Set up the backend**:
    - Change into the backend directory:
      ```bash
      cd validflow-backend
      ```
    - Install Python dependencies using Pipenv:
      ```bash
      pipenv install
      ```
    - Activate the Pipenv shell:
      ```bash
      pipenv shell
      ```
    - _(You can now return to the root directory for combined development)_
      ```bash
      exit # Exit pipenv shell temporarily if you want to run combined dev from root
      cd ..
      ```
4.  **Set up the frontend**:
    - Change into the frontend directory:
      ```bash
      cd validflow-frontend
      ```
    - Install Node.js dependencies:
      ```bash
      npm install
      ```
    - Build the Rust/Tauri core (this may take a moment):
      ```bash
      npm run tauri build
      ```
    - _(You can now return to the root directory for combined development)_
      ```bash
      cd ..
      ```

## 🏃‍♀️ Usage

Once all dependencies are installed, you can launch ValidFlow with a single command from the root project directory:

```bash
npm run dev
```

This command leverages `concurrently` to start both the Python backend (FastAPI server and file watcher) and the React frontend.

ValidFlow typically monitors your `Downloads` folder by default, automatically moving new files into categorized sub-folders within `~/Documents/ValidFlow` (e.g., `~/Documents/ValidFlow/Images`, `~/Documents/ValidFlow/Documents`). While the current UI is a landing page, the backend is actively classifying and logging file movements. Future updates will introduce a user interface for configuration and to view these logs directly.

## ✨ Features

ValidFlow isn't just another file sorter; it's a smart assistant designed to keep your digital space organized effortlessly.

- **Automatic File Categorization**: Intelligently classifies files (images, videos, documents, music, archives, installers, and others) based on MIME types and file extensions.
- **Real-time Folder Monitoring**: Continuously watches your designated download directory (default: `~/Downloads`) for newly created files using `watchdog`.
- **Smart File Movement**: Automatically moves categorized files to a structured destination directory (default: `~/Documents/ValidFlow/{Category}`). Files are only moved if a duplicate doesn't already exist in the target location, preventing unnecessary overwrites.
- **Cross-Platform Desktop Application**: Built with Tauri, providing a native, lightweight, and performant desktop experience on Windows, macOS, and Linux.
- **Backend API**: A FastAPI backend serves application status and historical file movement logs, paving the way for rich UI features.
- **Internal File Logging**: Maintains a local SQLite database (`file_logs.db`) to record all categorized file movements, including file name, category, and timestamp.

## 🛠️ Technologies Used

ValidFlow is a full-stack desktop application built with a modern tech stack, combining the strengths of Python, JavaScript, and Rust.

| Component             | Technology         | Description                                                                                         |
| :-------------------- | :----------------- | :-------------------------------------------------------------------------------------------------- |
| **Backend**           | Python             | Primary language for backend logic and file operations.                                             |
|                       | FastAPI            | High-performance web framework for the backend API.                                                 |
|                       | Uvicorn            | ASGI server for FastAPI.                                                                            |
|                       | Watchdog           | Python library for real-time file system event monitoring.                                          |
|                       | PyInstaller        | Used to bundle the Python backend into a single executable.                                         |
|                       | SQLite             | Lightweight, file-based database for logging file movements.                                        |
| **Frontend**          | React              | Declarative JavaScript library for building user interfaces.                                        |
|                       | TypeScript         | Superset of JavaScript that adds static types.                                                      |
|                       | Vite               | Fast and lightweight build tool for frontend development.                                           |
|                       | Tailwind CSS       | Utility-first CSS framework for rapid UI development.                                               |
|                       | ESLint             | Static code analysis tool for identifying problematic patterns.                                     |
|                       | React Router Dom   | Declarative routing for React applications.                                                         |
| **Desktop Framework** | Tauri              | Cross-platform framework for building desktop apps with web frontends (Rust backend, web frontend). |
|                       | tauri-plugin-shell | Tauri plugin to execute shell commands (used to start Python backend).                              |
| **Tooling**           | Concurrently       | Utility to run multiple commands concurrently (for dev setup).                                      |
|                       | Standard Version   | Automates versioning and changelog generation.                                                      |

## 🤝 Contributing

ValidFlow is an open-source project, and contributions are absolutely welcome! If you have ideas for new features, bug fixes, or improvements, please don't hesitate to contribute.

Here’s how you can get involved:

- **Fork the repository**: Start by forking the `validflow` repository to your GitHub account.
- **Create a new branch**: For any new feature or bug fix, create a dedicated branch.
  ```bash
  git checkout -b feature/your-feature-name
  ```
  or
  ```bash
  git checkout -b bugfix/issue-description
  ```
- **Make your changes**: Implement your features or fixes, ensuring your code adheres to the project's style and conventions.
- **Test your changes**: Before submitting, make sure your changes haven't introduced any regressions and work as expected.
- **Commit your changes**: Write clear and concise commit messages.
  ```bash
  git commit -m "feat: Add new awesome feature"
  ```
- **Push to your fork**:
  ```bash
  git push origin feature/your-feature-name
  ```
- **Open a Pull Request**: Submit a pull request from your branch to the `main` branch of the original repository. Provide a detailed description of your changes.

We appreciate your contributions and look forward to reviewing them!

## 📜 License

This project is licensed under the ISC License. Please refer to the `LICENSE` file in the root of the repository for the full license text. (Note: A separate `LICENSE` file was not provided in the submitted context, so please ensure it's added to your repository).

## 🧑‍💻 Author Info

**Ibe Precious**

- **GitHub**: [thevalidcode](https://github.com/thevalidcode)
- **LinkedIn**: [thevalidcode](https://www.linkedin.com/thevalidcode)
- **Twitter**: [thevalidcode](https://twitter.com/thevalidcode)

## 🏅 Badges

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Tauri](https://img.shields.io/badge/Tauri-24C8D7?style=for-the-badge&logo=tauri&logoColor=white)](https://tauri.app/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![ISC License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
