import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from "../services/request"
import { useNotificationDispatch } from './NotificationContexr'

const AnecdoteForm = () => {

  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    },
    onError: (error) => {
      notificationDispatch({type: "ERROR", message: error.message})
      setTimeout(() => {
      notificationDispatch({type: "NULL"})
    }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
