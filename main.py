# ~/.local/bin/uvicorn main:app --reload
import os

from dotenv import load_dotenv

from fastapi import FastAPI, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware

import secrets

from lcc_ldap import change_pass

password_length = 13

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/reset_password")
async def create_command(request: Request, response: Response):
    obj = await request.json()
    email, host = obj['email'].split('@')
    if host not in ['ccc.ufcg.edu.br', 'computacao.ufcg.edu.br']:
        response.status_code = status.HTTP_403_FORBIDDEN
        return str({"status": "forb"})
    if host == 'computacao.ufcg.edu.br':
        email += '.ufcg'
    password = secrets.token_urlsafe(password_length)
    change_pass(email, password)
    return str({"status": "ok", "password": password})
