# Book Recommendation System
 
## Problem
 
Suggest books similar to one a reader already likes.
 
## Solution
 
Books from the Kaggle Book-Crossing dataset are represented by TF-IDF of the author name plus the standardized publication year. A cosine nearest-neighbour model returns the 10 closest books to a chosen title. The model is pickled and served by FastAPI (`GET /load_all/`, `POST /recommend/`) to a React/Redux frontend.
 
## Speciality
 
Pure content-based similarity on author and year. Ratings and users data are loaded but not used by the model.
 
## Simplified Working
 
Each book gets coordinates from its author and year; the books nearest to your pick are recommended.
 
## Utilities
 
- scikit-learn — TF-IDF, StandardScaler, NearestNeighbors
- pandas, scipy — data and sparse features
- kagglehub — dataset download
- FastAPI + Uvicorn + Pydantic + CORS — serving
- React, Redux Toolkit — frontend
## Setup Process
 
1. Install the required Python libraries:
```bash
pip install torch --index-url https://download.pytorch.org/whl/cpu && pip install fastapi uvicorn pydantic kagglehub pandas numpy sentence-transformers faiss-cpu
npm run install:all
```
2. Then, please run:
```
python3 "book recomm. system.py"
```
3. Start the web-app:
```bash
npm run dev
```
 
**Production**
 
1. `npm run build` (frontend) → serve static build from the backend or a static host.
2. Deploy FastAPI service (e.g. Uvicorn + reverse proxy) with `model.pkl` bundled alongside it.