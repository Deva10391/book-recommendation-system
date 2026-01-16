import sys
import json
import pickle

def recommend(title: str):
    idx = books_df.index[books_df['Book-Title'] == title][0]
    _, ids = nn.kneighbors(features.tocsr()[idx], n_neighbors=qty)
    recs = books_df.iloc[ids[0][1:]]

    return recs

with open('./prediction/model.pkl', 'rb') as file:
    artifacts = pickle.load(file)

qty = 11
nn = artifacts["model"]
features = artifacts["features"]
books_df = artifacts['books_df']

if '__main__':
    recs = recommend(sys.argv[1])
    print(json.dumps(recs.to_dict(orient="records")))
