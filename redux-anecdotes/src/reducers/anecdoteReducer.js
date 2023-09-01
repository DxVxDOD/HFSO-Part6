import { createSlice } from "@reduxjs/toolkit"
import { getAll, createNew, update } from "../services/annecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addNewAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const changedAncedote = action.payload
      return state.map(anecdote => anecdote.id !== changedAncedote.id ? anecdote : changedAncedote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { setAnecdotes, vote, addNewAnecdote } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await createNew(content)
    dispatch(addNewAnecdote(newAnecdote))
  }
}

export const updateVotes = (id, anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const response = await update(id, updatedAnecdote)
    dispatch(vote(response))
  }
}

export default anecdoteSlice.reducer  