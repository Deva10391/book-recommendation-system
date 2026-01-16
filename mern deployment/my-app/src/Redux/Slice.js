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

export const { reload_books, set_loading } = bookSlice.actions

export default bookSlice.reducer