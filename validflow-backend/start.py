import logging
import uvicorn
from app.main import app

# Configure logging
logging.basicConfig(
    filename="validflow.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logging.info("Starting ValidFlow backend...")

try:
    uvicorn.run(app, host="127.0.0.1", port=4427, log_level="info")
except Exception as e:
    logging.exception(f"Backend crashed with exception: {e}")

logging.info("ValidFlow backend started successfully.")
