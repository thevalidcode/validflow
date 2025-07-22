# ValidFlow

**ValidFlow** is a professional desktop automation tool that helps users intelligently organize and manage local files using customizable rules. It offers a modern UI, smart file classification, and a silent background experience.

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

---

## 🚀 For End Users (Download & Run)

Visit the [Releases](https://github.com/thevalidcode/validflow/releases) section and download the latest release for your OS.

### ⚠️ Windows/macOS Warning

Both Windows Defender and macOS Gatekeeper may block the app with security warnings because it’s not code-signed.

#### ✅ How to run it anyway:

**Windows:**

1. Right-click the `.exe` file.
2. Click **Properties**.
3. If you see a checkbox that says **"Unblock"**, check it.
4. Click **OK**.
5. Now double-click the file to run it.

**macOS:**

1. Control + Click (or Right-click) the `.app` file.
2. Choose **Open**.
3. In the dialog, click **Open** again.
4. From then on, the app should open without further prompts.

> This is expected behavior for unsigned apps. The app is safe to run if downloaded from the official release.

---

## 🛠 For Contributors (Clone & Build)

### 📁 Folder Structure

```
validflow/
├── validflow-frontend/       # React + Tauri frontend
│   └── src-tauri/            # Tauri-specific Rust code
├── validflow-backend/        # FastAPI backend
└── shared/                   # Shared assets, constants
```

### 🔧 Setup Instructions

#### 1. Prerequisites

- Node.js >= 18
- Rust & Cargo (for Tauri)
- Python >= 3.9
- Poetry (Python dependency manager)
- Tauri CLI

#### 2. Install Frontend Dependencies

```bash
cd validflow-frontend
npm install
```

#### 3. Install Backend Dependencies

```bash
cd ../validflow-backend
poetry install
```

#### 4. Run the App Locally

- Terminal 1 (Frontend + Tauri):

  ```bash
  cd validflow-frontend
  npm run tauri dev
  ```

- Terminal 2 (Backend API):

  ```bash
  cd validflow-backend
  poetry run uvicorn app.main:app --reload
  ```

---

## 🧪 Development Notes

- Do not attempt to change app icons manually. Platform-specific icons are already included and managed.
- This project does **not** use signed binaries; do not raise issues related to notarization or signing.

---

## 📏 Commit Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org):

Examples:

- `feat: add smart rule engine`
- `fix: correct file watcher path`
- `chore: update dependencies`

Use meaningful commit messages to improve clarity and automate release versioning.

---

## 🤝 Contributing

1. Fork this repo
2. Create a new branch: `git checkout -b feat/your-feature`
3. Commit using Conventional Commits
4. Push to your fork: `git push origin feat/your-feature`
5. Submit a pull request

---

## 📜 License

This project is licensed under the ISC License. Please refer to the `LICENSE` file in the root of the repository for the full license text. (Note: A separate `LICENSE` file was not provided in the submitted context, so please ensure it's added to your repository).

---

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

## ✅ Final Note

Once the app is launched, it works silently in the background to manage and automate your local files. No further input is required from the user.

Enjoy using **ValidFlow**!
