const Notification = ({ text }) => {
  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10 
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