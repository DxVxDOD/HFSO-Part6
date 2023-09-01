import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { getAll } from './services/annecdotes'
import { appendAnecdote } from './reducers/anecdoteReducer'

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        getAll().then(annecdotes => {
            console.log(annecdotes, 'before foreEach')
            annecdotes.forEach(annecdote => {
                console.log(annecdote, 'while forEach')
                dispatch(appendAnecdote(annecdote))
            })
          })
          
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