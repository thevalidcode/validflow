import threading
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.api.routes import router as api_router
from app.services.watcher import start_watching


@asynccontextmanager
async def lifespan(app: FastAPI):
    
    # Start the background thread for watching
    watcher_thread = threading.Thread(target=start_watching)
    watcher_thread.daemon = True
    watcher_thread.start()
    yield


# Initialize the FastAPI app with lifespan context
app = FastAPI(title="ValidFlow Backend", lifespan=lifespan)

# Include your API routes
app.include_router(api_router)


# Global error handler to log unhandled exceptions
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logging.exception("Unhandled error: %s", exc)
    return JSONResponse(status_code=500, content={"detail": "Internal Server Error"})
