import React, { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`

function App() {
  const [userName, setUserName] = useState("")

  // React FormEvent
  // https://reactjs.org/docs/events.html
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event
    setUserName(value)
    // TODO: currentTarget과 target의 차이는?
  }

  // React FormEvent
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(userName)
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <input
          value={userName}
          onChange={onChange}
          type="text"
          placeholder="이름"
        />
        <button>로그인</button>
      </form>
    </Container>
  )
}

export default App
