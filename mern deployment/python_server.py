import pickle
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ['GET', 'POST'],
    allow_headers = ["*"]
)

with open('./prediction/model.pkl', 'rb') as file:
    artifacts = pickle.load(file)

qty = 11
nn = artifacts["model"]
features = artifacts["features"]
books_df = artifacts['books_df']

def load_all():
    res = books_df.head(51)
    return res.to_dict(orient='records')

def recommend(title: str):
    idx = books_df.index[books_df['Book-Title'] == title][0]
    _, ids = nn.kneighbors(features.tocsr()[idx], n_neighbors=qty)
    recs = books_df.iloc[ids[0][1:]]
    res = [r.to_dict() for _,r in recs.iterrows()]

    return res

@app.get("/load_all/")
async def root_get():
    try:
        books = load_all()
        return {"data": books}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class RecommendReq(BaseModel):
    title: str

@app.post('/recommend/')
async def root_post(req: RecommendReq):
    try:
        recs = recommend(req.title)
        return {"data": recs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# uvicorn python_server:app --reload