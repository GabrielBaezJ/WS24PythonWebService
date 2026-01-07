import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from app.routes import router
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="API MongoDB Simple")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes first
app.include_router(router)

# Static files for CSS, JS, etc.
app.mount("/static", StaticFiles(directory="frontend"), name="static")

# Root route serves the frontend HTML - AFTER router to avoid conflicts
@app.get("/", include_in_schema=False)
async def serve_frontend():
    return FileResponse("frontend/index.html")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
