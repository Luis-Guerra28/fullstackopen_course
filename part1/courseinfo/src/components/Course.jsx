import SecondaryHeader from "./SecondaryHeader";
import Total from "./Total";
import Content from "./Content";

const Course = ({ course }) => {
  return (
    <div>
      <SecondaryHeader course={course.name}/>
      <Content parts={course.parts}/>
      <Total sum={course.parts.reduce((acc, part) => acc + part.exercises, 0)}/>
    </div>
  )
}

export default Course