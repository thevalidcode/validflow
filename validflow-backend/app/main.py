import threading
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.api.error_logs import router as error_logs_router
from app.api.rules import router as api_rules
from app.services.watcher import start_watcher
from app.core.db import Base, engine


@asynccontextmanager
async def lifespan(app: FastAPI):

    # Start the background thread for watching
    watcher_thread = threading.Thread(target=start_watcher)
    watcher_thread.daemon = True
    watcher_thread.start()
    yield


# Initialize the FastAPI app with lifespan context
app = FastAPI(title="ValidFlow Backend", lifespan=lifespan)

# Create DB tables
Base.metadata.create_all(bind=engine)

# Allow UI to talk to backend from file:// and localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include your API routes
app.include_router(error_logs_router)
app.include_router(api_rules)


# Global error handler to log unhandled exceptions
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logging.exception("Unhandled error: %s", exc)
    return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})
