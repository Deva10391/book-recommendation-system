import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './Slice'

export default configureStore({
  reducer: {
    books: booksReducer,
  },
})