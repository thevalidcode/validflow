from fastapi import FastAPI
from app.api.routes import router as api_router
from app.services.watcher import start_watching
import threading
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    thread = threading.Thread(target=start_watching, daemon=True)
    thread.start()
    yield

app = FastAPI(title="ValidFlow Backend", lifespan=lifespan)

app.include_router(api_router)
