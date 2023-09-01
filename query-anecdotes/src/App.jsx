import { useReducer } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, update } from './services/request'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

const App = () => {

  const notificationReducer = (state, action) => {
    switch(action.type) {
      case "VOTE":
        return action.message
      case "NULL":
        return state === null
      default: return state
    }
  }

  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })

  const {data, isLoading, isError} = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1
  })

  if (isLoading) {
    return <div>loading data....</div>
  }

  if (isError) {
    return <div>Anecdote service not available due to server problems.</div>
  }

  const anecdotes = data

  const handleVote = (anecdote) => {
    newAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({type: "VOTE", message: anecdote.content})
    setTimeout(() => {
      notificationDispatch({type: "NULL"})
    }, 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification notification={notification} />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
