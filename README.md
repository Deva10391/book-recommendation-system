# Book Recommendation System

Content-based book recommender. Model trained in a Jupyter notebook (`.ipynb`), served via FastAPI, consumed by a React/Redux frontend.

## 1. Open-source Utilities

* **FastAPI** — serves the recommendation model through an API
* **Uvicorn** — runs the FastAPI application
* **Pydantic** — validates API request data
* **kagglehub** — pulls the Book-Crossing dataset from Kaggle
* **pandas** — data loading and data manipulation
* **numpy** — numerical operations
* **scikit-learn**

  * `TfidfVectorizer` — converts author text into vectors
  * `StandardScaler` — normalizes publication year
  * `NearestNeighbors` — finds similar books using cosine similarity
* **scipy** — `hstack` combines text and numerical feature matrices
* **pickle** — saves and loads the trained model as `model.pkl`
* **json** — JSON data handling
* **os** — file and path handling
* **sys** — Python system utilities
* **React, Redux Toolkit, react-redux** — frontend UI and state management
* **react-scripts (CRA)** — frontend development and build tooling

## 2. How They Work Together

Notebook loads data → TF-IDF encodes author, StandardScaler normalizes year → both merged via `hstack` → `NearestNeighbors` indexes the merged matrix → whole thing pickled to `model.pkl` → FastAPI loads the pickle and exposes a `/recommend` endpoint → React/Redux frontend calls it and renders results.

## 3. Problem / Solution / Speciality

* **Problem:** recommend books with no user rating history needed (avoids [cold-start problem: system fails without prior user interaction data]).
* **Solution:** content-based filtering using author + year metadata only.
* **Speciality:** fuses text (TF-IDF) and numeric (scaled year) features into one vector space instead of using a single feature type — unlike typical single-modality (title-only or ratings-only) recommenders.

## 4. Simplified Working

Every book is placed on a "map" based on its author and year. Similar books land near each other. Pick one book, and the system returns its nearest neighbors on that map.

## 5. Setup Process

**Backend**

1. Install the required Python libraries:

   ```bash
   pip install fastapi uvicorn pydantic kagglehub pandas numpy scipy scikit-learn
   ```

2. Run the training notebook (`.ipynb`) end-to-end — this downloads the dataset via `kagglehub`, trains the model, and writes `mern deployment/prediction/model.pkl`.

3. The trained model is served through `python_server.py` using FastAPI.

4. Start the API:

   ```bash
   uvicorn python_server:app --reload
   ```

   The FastAPI backend runs on `http://127.0.0.1:8000`.

**Frontend**

1. `cd my-app`
2. `npm install`
3. `npm start` — runs on `localhost:3000`, calls the FastAPI backend for recommendations.
4. In `my-app/src/Redux/Slice.js`, comment out the Node backend port and uncomment/use the Python FastAPI port (`8000`).

**Production**

1. `npm run build` (frontend) → serve static build from the backend or a static host.
2. Deploy FastAPI service (e.g. Uvicorn + reverse proxy) with `model.pkl` bundled alongside it.
