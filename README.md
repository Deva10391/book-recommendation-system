# Book Recommendation System

Content-based book recommender. Model trained in a Jupyter notebook (`.ipynb`), served via FastAPI, consumed by a React/Redux frontend.

## 1. Open-source Utilities
- **kagglehub** — pulls the Book-Crossing dataset from Kaggle
- **pandas / numpy** — data cleaning
- **scikit-learn** — `TfidfVectorizer` (author text → vectors), `StandardScaler` (year normalization), `NearestNeighbors` (cosine similarity search)
- **scipy.sparse.hstack** — merges text + numeric features
- **pickle** — saves trained model as `model.pkl`
- **React, Redux Toolkit, react-redux** — frontend UI + state
- **react-scripts (CRA)** — build/dev tooling

## 2. How They Work Together
Notebook loads data → TF-IDF encodes author, StandardScaler normalizes year → both merged via `hstack` → `NearestNeighbors` indexes the merged matrix → whole thing pickled to `model.pkl` → FastAPI loads the pickle and exposes a `/recommend` endpoint → React/Redux frontend calls it and renders results.

## 3. Problem / Solution / Speciality
- **Problem:** recommend books with no user rating history needed (avoids [cold-start problem: system fails without prior user interaction data]).
- **Solution:** content-based filtering using author + year metadata only.
- **Speciality:** fuses text (TF-IDF) and numeric (scaled year) features into one vector space instead of using a single feature type — unlike typical single-modality (title-only or ratings-only) recommenders.

## 4. Simplified Working
Every book is placed on a "map" based on its author and year. Similar books land near each other. Pick one book, and the system returns its nearest neighbors on that map.

## 5. Setup Process

**Backend**
1. `pip install kagglehub pandas numpy scipy scikit-learn fastapi uvicorn`
2. Run the training notebook (`.ipynb`) end-to-end — this downloads the dataset via `kagglehub`, trains the model, and writes `mern deployment/prediction/model.pkl`.
3. Wrap the `recommend()` function in a FastAPI route (e.g. `GET /recommend?title=...`) that loads `model.pkl` and returns results.
4. Start the API: `uvicorn main:app --reload`

**Frontend**
1. `cd my-app`
2. `npm install`
3. `npm start` — runs on `localhost:3000`, calls the FastAPI backend for recommendations.

**Production**
1. `npm run build` (frontend) → serve static build from the backend or a static host.
2. Deploy FastAPI service (e.g. Uvicorn + reverse proxy) with `model.pkl` bundled alongside it.