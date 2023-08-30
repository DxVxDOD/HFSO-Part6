import { useDispatch, useSelector } from "react-redux"
import { ok, bad, good, reset } from "./reducers/reducers"

const App = () => {

    const disaptch = useDispatch()
    const state = useSelector(state => state)
  
    return (
      <div>
        <button onClick={() => disaptch(good())}>good</button> 
        <button onClick={() => disaptch(ok())} >ok</button> 
        <button onClick={() => disaptch(bad())} >bad</button>
        <button onClick={() => disaptch(reset())} >reset stats</button>
        <div>good {state.good}</div>
        <div>ok{state.ok}</div>
        <div>bad{state.bad}</div>
      </div>
    )
}

export default App