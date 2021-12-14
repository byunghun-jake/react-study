import styled, { keyframes } from "styled-components"

const Father = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.backgroundColor};
`

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform: rotate(360deg);
    border-radius: 50%;
  }
  100% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
`

const Emoji = styled.span`
  font-size: 3rem;
`

const Box = styled.div`
  background-color: tomato;
  width: 200px;
  height: 200px;
  animation: ${rotationAnimation} 3s linear infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  ${Emoji} {
    &:hover {
      font-size: 4rem;
    }

    &:active {
      opacity: 0;
    }
  }
`

const Text = styled.span`
  size: 2rem;
  color: ${(props) => props.theme.textColor};
  font-weight: 900;
`

const Circle = styled(Box)`
  border-radius: 999px;
`

const Input = styled.input.attrs({ required: true })`
  background-color: tomato;
`

function App() {
  return (
    <>
      <Father as="header">
        <Box>
          <Emoji as="p">😊</Emoji>
        </Box>
        <Emoji as="p">😊</Emoji>
      </Father>
      <Father>
        <Text>Hello</Text>
      </Father>
    </>
  )
}

export default App
