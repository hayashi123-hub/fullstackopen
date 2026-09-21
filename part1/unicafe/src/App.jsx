import { useState } from 'react'

const StatisticLine = ({text, data})=>{
  return(
    <><tr><td>{text}</td><td>{data}</td></tr></>
  )
}

const Button = ({text, onClick})=>{
  return(
    <><button onClick={onClick}>{text}</button></>
  )
}

const Statics = ({good,neutral,bad,total}) => {
  if (total == 0) return <p>No Feedback given</p>
  return (
    <>
      <h1>statics</h1>
      <table>
        <StatisticLine text="good" data={good}/>
      <StatisticLine text="neutral" data={neutral}/>
      <StatisticLine text="bad" data={bad}/>
      <StatisticLine text="all" data={total}/>
      <StatisticLine text="average" data={total == 0 ? 0 :(good - bad)/total}/>
      <StatisticLine text="positive" data={total == 0 ? 0 : 100 * good /total + "%"}/>
      </table>

    </>
      
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good +1 
    setGood(good+1)
    setTotal(updatedGood+neutral+bad)
  } 
  const handleNeutralClick = () => {
    const updatedNeutral = neutral +1 
    setNeutral(neutral+1)
    setTotal(updatedNeutral+good+bad)
  } 
  const handleBadClick = () => {
    const updatedBad = bad +1 
    setBad(bad+1)
    setTotal(updatedBad+neutral+good)
  } 
  return (
    <div>
      <h1> Give your feedback </h1>
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />
      <Statics good={good} neutral={neutral} bad={bad} total={total}/>    
    </div>
  )
}

export default App