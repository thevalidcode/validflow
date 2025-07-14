import PyInstaller.__main__

PyInstaller.__main__.run([
    "start.py",
    "--onefile",
    "--distpath", "../validflow-frontend/src-tauri/bin",
    "--name", "start"
])
