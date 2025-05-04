from fastapi import FastAPI
from lines.router import router as lines_router
from stations.router import router as stations_router
from info.router import router as info_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(lines_router, prefix="/lines")
app.include_router(stations_router, prefix="/stations")
app.include_router(info_router, prefix="/station")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # front-end address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
