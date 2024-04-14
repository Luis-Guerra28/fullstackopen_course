const Notification = ({ text, isError }) => {
  let style = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10 
  }
  if (isError) {
    style.color = 'red'
  } else {
    style.color = 'green'
  }

  if (text === null) {
    return null
  }

  return (
    <div style={style}>
      {text}
    </div>
  )
}

export default Notification