import { useEffect, useState } from "react"
import styled from "styled-components"

interface ContainerProps {
  bgColor: string
  borderColor: string
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 999px;
  border: 1px solid ${(props) => props.borderColor};
`

interface CircleProps {
  bgColor: string
  borderColor?: string
}

function Circle({ bgColor, borderColor }: CircleProps) {
  const [counter, setCounter] = useState<number | string>(1)
  useEffect(() => {
    setCounter("asdf")
  }, [])
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {counter}
    </Container>
  )
}

export default Circle

interface PlayerShape {
  name: string
  age: number
}

const sayHello = (playerObj: PlayerShape) =>
  `Hello ${playerObj.name} you are ${playerObj.age} years old`

sayHello({ name: "김병훈", age: 10 })
