import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { displayNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => {
      console.log(state)
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

    const votingAnecdotes = (content, id) => {
        const anecdoteUpdated = `you voted ${content}`
        dispatch(vote(id))
        dispatch(displayNotification(anecdoteUpdated))
        setTimeout(() => dispatch(removeNotification()), 5000)
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
            <button onClick={() => votingAnecdotes(anecdote.content, anecdote.id)}>vote</button>
          </div>
        </div>
    )}
    </>
  )
}

export default AnecdoteList