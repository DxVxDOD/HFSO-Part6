import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeAnecdote } from './reducers/anecdoteReducer'

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
          dispatch(initializeAnecdote())
    }, [dispatch])

    return (
        <>
        <Notification/>
        <h2>Anecdotes</h2>
        <Filter/>
        <AnecdoteList/>
        <AnecdoteForm/>
        </>
    )
}

export default App