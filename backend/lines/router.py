from fastapi import APIRouter, Depends
from auth import authenticate
import requests, os
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()

@router.get("/", dependencies=[Depends(authenticate)])
def get_lines():
    url = "https://api.wmata.com/Rail.svc/json/jLines"
    headers = {"api_key": os.getenv("WMATA_API_KEY")}
    response = requests.get(url, headers=headers)
    return response.json()
