import os
import pickle
import kagglehub
import numpy as np
import pandas as pd
from typing import List
from scipy.sparse import hstack
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer

path = kagglehub.dataset_download("arashnic/book-recommendation-dataset")
books = pd.read_csv(os.path.join(path, 'Books.csv'), low_memory=False)
ratings = pd.read_csv(os.path.join(path, 'Ratings.csv'))
users = pd.read_csv(os.path.join(path, 'Users.csv'))

def get_features(df: pd.DataFrame, cols: List):
    res = df[cols].copy()
    return res

def manage_na(df: pd.DataFrame, col: str):
    df[col] = pd.to_numeric(df[col], errors='coerce').copy()
    df_mean = df['Year-Of-Publication'].mean()
    df[col] = df[col].fillna(df_mean).copy()
    return df

books_df = get_features(books, ['Book-Title', 'Year-Of-Publication', 'Book-Author'])
books_df['Book-Author'] = books_df['Book-Author'].fillna('Unknown Author')
books_df = manage_na(books_df, 'Year-Of-Publication')
users_df = get_features(users, ['Location', 'Age'])
ratings_df = get_features(ratings, ['User-ID', 'Book-Rating'])

scaler = StandardScaler()
tfidf = TfidfVectorizer(stop_words='english')

author_features = tfidf.fit_transform(books_df['Book-Author'])
year_features = scaler.fit_transform(books_df[['Year-Of-Publication']])
features = hstack([author_features, year_features])
qty = 11
nn = NearestNeighbors(n_neighbors=qty, metric='cosine', algorithm='brute')
nn.fit(features)

def recommend(title: str):
    idx = books_df.index[books_df['Book-Title'] == title][0]
    _, ids = nn.kneighbors(features.tocsr()[idx], n_neighbors=qty)
    recs = books_df.iloc[ids[0][1:]]
    return recs

# title = books_df.iloc[12]['Book-Title']
title = 'Classical Mythology'
recommend(title)

artifacts = {
    "model": nn,
    "features": features,
    "books_df": books_df,
}
with open("mern deployment/prediction/model.pkl", "wb") as f:
    pickle.dump(artifacts, f)