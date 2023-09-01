import axios from 'axios'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'

const baseUrl = 'http://localhost:3001/anecdotes'

const App = () => {

  const {data, isLoading, isError} = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get(baseUrl).then(res => res.data),
    retry: 1
  })

  if (isLoading) {
    return <div>loading data....</div>
  }

  if (isError) {
    return <div>Anecdote service not available due to server problems.</div>
  }

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
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
