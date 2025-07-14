# ValidFlow: Intelligent File Organization for Desktop

ValidFlow is a robust desktop application designed to streamline your digital workspace. 📁 It intelligently organizes files, folders, and documents, bringing order and efficiency to your daily workflow. Say goodbye to clutter and hello to a perfectly structured digital environment!

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: [LTS version recommended](https://nodejs.org/en)
- **npm**: Comes bundled with Node.js.
- **Python**: Version 3.12 (as specified in the `Pipfile`).
- **Pipenv**: Python package installer and dependency manager. Install it globally using `pip install pipenv`.
- **Rust**: For Tauri development. Install via [rustup](https://rustup.rs/).

### Installation

Follow these steps to set up ValidFlow on your local machine:

1.  **Clone the Repository**
    Start by cloning the project repository to your local machine:

    ```bash
    git clone https://github.com/your-username/validflow.git # Replace with your actual repository URL
    cd validflow
    ```

2.  **Install Root Dependencies**
    This project uses `concurrently` to efficiently manage both the frontend and backend development servers. Install these root-level dependencies:

    ```bash
    npm install
    ```

3.  **Set Up the Frontend**
    Navigate into the `validflow-frontend` directory and install its specific Node.js dependencies:

    ```bash
    cd validflow-frontend
    npm install
    ```

4.  **Set Up the Backend**
    Move into the `validflow-backend` directory and install Python dependencies using Pipenv:
    ```bash
    cd ../validflow-backend
    pipenv install
    ```
    _(A note on the backend build: The `build-backend.py` script uses PyInstaller to compile the `start.py` script into a standalone binary. This binary is then placed in the Tauri `src-tauri/bin` directory as a sidecar. This process is generally handled automatically by Tauri's build command, so you typically won't need to run `build-backend.py` manually during development unless you're specifically updating the sidecar binary.)_

## 🏃‍♀️ Usage

To launch ValidFlow locally in development mode, which activates both the frontend and backend services:

1.  **Start the Application**
    From the root directory of your project (`validflow`), execute the main development script:
    ```bash
    npm run dev
    ```
    This command will concurrently spin up the React frontend (powered by Vite) and the FastAPI backend (served by Uvicorn). Once both are running, the Tauri desktop application will automatically launch and establish a connection to these local services.

Currently, the application presents a foundational React interface and includes a basic `/health` endpoint on the backend to confirm successful service integration. Comprehensive file organization features are planned for future development cycles.

_(Note: Screenshots showcasing the application's functionality are currently in progress and will be added as the user interface matures.)_

## ✨ Features

ValidFlow is being developed with a focus on delivering a powerful and seamless file management experience through key features:

- **Cross-Platform Desktop Experience**: Built using Tauri, ensuring native performance, a compact application size, and broad compatibility across Windows, macOS, and Linux.
- **Automated File Organization**: Designed to intelligently categorize and move files based on customizable, user-defined rules, significantly reducing digital clutter. (This core functionality is actively under development.)
- **Intuitive User Interface**: A modern and highly responsive frontend, meticulously crafted with React and TypeScript, to provide an effortless and engaging user experience.
- **Robust Backend Service**: A reliable backend, developed with Python's FastAPI, handles all core logic and complex operations, guaranteeing efficient and scalable performance.
- **Optimized Development Workflow**: Leverages cutting-edge tools like Vite for incredibly fast frontend development feedback loops and ESLint for maintaining strict code quality and consistency.

## 🛠️ Technologies Used

| Category          | Technology                                                         | Description                                                                                                              |
| :---------------- | :----------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| **Frontend**      | [React](https://react.dev/)                                        | A declarative, component-based JavaScript library for building user interfaces.                                          |
|                   | [TypeScript](https://www.typescriptlang.org/)                      | A strongly typed superset of JavaScript that enhances code quality and maintainability.                                  |
|                   | [Vite](https://vitejs.dev/)                                        | A blazing-fast build tool that provides an exceptional development experience for web projects.                          |
|                   | [ESLint](https://eslint.org/)                                      | A powerful static code analysis tool that helps maintain code quality and consistency.                                   |
| **Backend**       | [Python 3.12](https://www.python.org/)                             | The robust and versatile programming language serving as the backbone for the backend services.                          |
|                   | [FastAPI](https://fastapi.tiangolo.com/)                           | A modern, high-performance web framework for building APIs with Python, known for its speed and ease of use.             |
|                   | [Uvicorn](https://www.uvicorn.org/)                                | An Asynchronous Server Gateway Interface (ASGI) web server, used to serve the FastAPI application.                       |
|                   | [Pipenv](https://pipenv.pypa.io/en/latest/)                        | A dependable Python development workflow tool that manages dependencies efficiently via `Pipfile`.                       |
|                   | [PyInstaller](https://pyinstaller.org/)                            | A utility to package Python applications into standalone executables, simplifying distribution.                          |
| **Desktop Shell** | [Tauri](https://tauri.app/)                                        | A groundbreaking framework for building highly optimized, cross-platform desktop applications using web technologies.    |
|                   | [Rust](https://www.rust-lang.org/)                                 | The foundational language powering Tauri's core, offering unparalleled performance, safety, and concurrency.             |
| **Dev Tools**     | [Concurrently](https://www.npmjs.com/package/concurrently)         | A command-line tool that allows running multiple scripts or commands simultaneously, perfect for full-stack development. |
|                   | [Standard Version](https://www.conventionalcommits.org/en/v1.0.0/) | A tool that automates versioning and changelog generation, adhering to the Conventional Commits specification.           |

## 🤝 Contributing

Your contributions are highly valued and can significantly enhance ValidFlow! If you're eager to contribute, please review these guidelines:

- ✨ **Fork the Repository**: Begin by forking the `validflow` repository to your personal GitHub account.
- 🌿 **Create a New Branch**: For any new features, enhancements, or bug fixes, please create a new branch from `main`. Use a clear and descriptive naming convention (e.g., `feat/implement-rule-engine` or `fix/file-dialog-issue`).
- 💡 **Implement Your Changes**: Write clean, well-structured, and well-commented code. Ensure that your modifications align with the project's existing architectural patterns and coding style.
- 🧪 **Test Thoroughly**: If your changes introduce new functionality or alter existing behavior, please add new tests or update relevant tests to ensure everything works as expected.
- 📚 **Update Documentation**: Should your contributions affect the application's functionality, installation, or usage, remember to update the corresponding sections of this README or any other relevant documentation.
- ⬆️ **Commit and Push**: Commit your changes with concise and informative commit messages. We encourage following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification (e.g., `feat: add drag-and-drop support for folders`).
- 🔄 **Open a Pull Request**: Finally, submit a pull request to the `main` branch of the original repository. Provide a comprehensive description of your changes and reference any related issues.

Thank you for your valuable contributions to ValidFlow!

## 📄 License

This project is licensed under the ISC License, as indicated in the `package.json` file.

## 🧑‍💻 Author

**Ibe Precious**

Connect with me!

- **GitHub**: [thevalidcode](https://github.com/thevalidcode)
- **LinkedIn**: [thevalidcode](https://www.linkedin.com/thevalidcode)
- **Twitter**: [thevalidcode](https://twitter.com/thevalidcode)

---

## Badges

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Tauri](https://img.shields.io/badge/Tauri-24C783?style=for-the-badge&logo=tauri&logoColor=white)](https://tauri.app/)
[![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![GitHub Workflow Status](https://img.shields.io/badge/Build%20Status-Coming%20Soon-orange?style=for-the-badge)](https://github.com/your-username/validflow/actions)
