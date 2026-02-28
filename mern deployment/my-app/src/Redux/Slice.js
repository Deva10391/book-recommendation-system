import { createSlice } from '@reduxjs/toolkit'

export const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: true,
  },
  reducers: {
    reload_books: (state, action) => {
      state.books = action.payload
    },
    set_loading: (state, action) => {
      state.loading = action.payload
    }
  },
})

export const apiSlice = createSlice({
  name: 'apis',
  initialState: {
    // port: 'http://localhost:3001',
    port: 'http://127.0.0.1:8000', // python
  }
})

export const { reload_books, set_loading } = bookSlice.actions

export const booksReducer = bookSlice.reducer
export const apiReducer = apiSlice.reducer