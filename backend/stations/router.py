from fastapi import APIRouter, Depends
from auth import authenticate
import requests, os
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()

@router.get("/{line_code}", dependencies=[Depends(authenticate)])
def get_stations_by_line(line_code: str):
    url = f"https://api.wmata.com/Rail.svc/json/jStations?LineCode={line_code}"
    headers = {"api_key": os.getenv("WMATA_API_KEY")}
    response = requests.get(url, headers=headers)
    return response.json()
