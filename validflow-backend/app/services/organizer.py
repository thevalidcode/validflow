import shutil
import time
import logging
from pathlib import Path
from app.utils.file_rules import classify
from app.core.config import settings
from app.models.file_log import log_file

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


def smart_move(file_path: Path, retries: int = 5, delay: float = 1.0) -> None:
    try:
        if not file_path.exists() or not file_path.is_file():
            logger.warning(
                "[SKIP] File does not exist or is not a file: %s", file_path)
            return

        category = classify(file_path)
        target_dir = settings.dest_dir / category
        target_dir.mkdir(parents=True, exist_ok=True)
        target_path = target_dir / file_path.name

        if target_path.exists():
            logger.info(
                "[SKIP] Target already exists, skipping move: %s", target_path)
            return

        for attempt in range(1, retries + 1):
            try:
                shutil.move(str(file_path), str(target_path))
                log_file(file_path.name, category)
                logger.info("[MOVED] %s -> %s", file_path, target_path)
                return
            except PermissionError:
                logger.warning("[RETRY %d/%d] File in use: %s. Retrying in %.1fs...",
                               attempt, retries, file_path, delay)
                time.sleep(delay)
            except Exception as e:
                logger.error("[FAIL] Unexpected error on move attempt %d: %s",
                             attempt, e, exc_info=True)
                # Continue retrying unless it's the last attempt
                if attempt == retries:
                    raise

        logger.error(
            "[GIVE UP] Failed to move file after %d attempts: %s", retries, file_path)

    except Exception as fatal:
        logger.critical(
            "[CRITICAL] smart_move failed entirely: %s", fatal, exc_info=True)
