import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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

  return (
    <>
    {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
    )}
    </>
  )
}

export default AnecdoteList