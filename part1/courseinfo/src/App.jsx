const Header = ({ header }) => <h1>{header}</h1>

const SecondaryHeader = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <strong>Total of exercises {sum}</strong>

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part part={part} key={part.id}/>)}
    </>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <SecondaryHeader course={course.name}/>
      <Content parts={course.parts}/>
      <Total sum={course.parts.reduce((acc, part) => acc + part.exercises, 0)}/>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    <div>
      <Header header='Web development curriculum' />
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}

export default App