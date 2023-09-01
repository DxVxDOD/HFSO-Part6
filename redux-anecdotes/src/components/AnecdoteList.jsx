import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import { setNotifiactions } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
        if (state.filter === 'ALL') {
            return state.anecdote
        }else {
            const filteredAnecdotes = state.anecdote
                .filter(annecdote => annecdote.content
                .toLowerCase().includes(state.filter.toLowerCase()))
            return filteredAnecdotes
        }
    })
    const dispatch = useDispatch()

    const votingAnecdotes = (id, anecdote) => {
      const anecdoteUpdated = `you voted "${anecdote.content}"`
      dispatch(updateVotes(id, anecdote))
      dispatch(setNotifiactions(anecdoteUpdated, 5000))
  }

  return (
    <>
    {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => votingAnecdotes(anecdote.id, anecdote)}>vote</button>
          </div>
        </div>
    )}
    </>
  )
}

export default AnecdoteList