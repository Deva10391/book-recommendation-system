import { configureStore } from '@reduxjs/toolkit'
import { booksReducer, apiReducer } from './Slice'

export default configureStore({
  reducer: {
    books: booksReducer,
    api: apiReducer,
  },
})