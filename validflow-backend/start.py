import logging
from pathlib import Path
import uvicorn
from app.main import app

# Get user's Documents path
documents_path = Path.home() / "Documents" / "ValidFlow" / "logs"
documents_path.mkdir(parents=True, exist_ok=True)

log_file_path = documents_path / "validflow.log"

# Configure logging
logging.basicConfig(
    filename=str(log_file_path),
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logging.info("Starting ValidFlow backend...")

try:
    uvicorn.run(app, host="127.0.0.1", port=4427, log_level="info")
except Exception as e:
    logging.exception("Backend crashed with exception: %s", {e})

logging.info("ValidFlow backend started successfully.")
