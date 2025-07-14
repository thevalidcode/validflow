import subprocess

subprocess.run(["uvicorn", "app.main:app", "--host",
               "127.0.0.1", "--port", "4327"], check=True)
