import React, { useState } from "react"

function App() {
  const [userName, setUserName] = useState("")

  // React FormEvent
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
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={userName}
          onChange={onChange}
          type="text"
          placeholder="이름"
        />
        <button>로그인</button>
      </form>
    </div>
  )
}

export default App
