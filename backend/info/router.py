from fastapi import APIRouter, Depends
from auth import authenticate
import requests, os
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()

@router.get("/{station_code}", dependencies=[Depends(authenticate)])
def get_station_info(station_code: str):
    url = f"https://api.wmata.com/Rail.svc/json/jStationInfo?StationCode={station_code}"
    headers = {"api_key": os.getenv("WMATA_API_KEY")}
    response = requests.get(url, headers=headers)
    return response.json()

@router.get("/{station_code}/timings", dependencies=[Depends(authenticate)])
def get_station_timings(station_code: str):
    url = f"https://api.wmata.com/Rail.svc/json/jStationTimes?StationCode={station_code}"
    headers = {"api_key": os.getenv("WMATA_API_KEY")}
    response = requests.get(url, headers=headers)
    return response.json()
