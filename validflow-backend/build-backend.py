import PyInstaller.__main__

PyInstaller.__main__.run([
    "--onefile",
    "--distpath", "../validflow-frontend/src-tauri/bin",
    "--name", "start",
    "start.py"
])
