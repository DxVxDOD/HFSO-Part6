import { createSlice } from "@reduxjs/toolkit"

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
  }
})

export const { createAnecdote, vote, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer  