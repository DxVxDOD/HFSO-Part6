import { createSlice } from "@reduxjs/toolkit"
import { getAll, createNew } from "../services/annecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const changedAncedote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAncedote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const vote = (content, id) => {
  return async dispatch => [
    
  ]
}

export default anecdoteSlice.reducer  