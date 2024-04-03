import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = ({ good, neutral, bad, total}) => {
  
  const good_points = 1 * good
  const bad_points = -1 * bad

  const average = (good_points + bad_points )/total
  const positive_porcentage = (good/total) * 100


  return (
    <>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {total}</div>
      <div>average {average}</div>
      <div>positive {positive_porcentage}%</div>
    </>
    )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  
  const handleClickGood = () => {
    setGood(good+1)
    setTotal(total + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral+1)
    setTotal(total + 1)
  }

  const handleClickBad = () => {
    setBad(bad+1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text={'good'}/>
      <Button handleClick={handleClickNeutral} text={'neutral'}/>
      <Button handleClick={handleClickBad} text={'bad'}/>
      <h1>statistic</h1>
      <Statistic good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App
