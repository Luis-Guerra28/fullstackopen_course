import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const Display = ({ good, neutral, bad}) => {
  return (
    <>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </>
    )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleClickGood = () => {
    setGood(good+1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral+1)
  }

  const handleClickBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text={'good'}/>
      <Button handleClick={handleClickNeutral} text={'neutral'}/>
      <Button handleClick={handleClickBad} text={'bad'}/>
      <h1>statistic</h1>
      <Display good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
