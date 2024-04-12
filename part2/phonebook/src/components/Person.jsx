const Person = ({ person, handleDeleteButton }) => {
  return (
    <div key={person.name}>
      {person.name} {person.number} <button onClick={handleDeleteButton}>delete</button>
    </div>
  )
}

export default Person