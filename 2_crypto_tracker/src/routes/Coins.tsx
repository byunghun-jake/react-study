import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Loading from "../components/Loading"

const Container = styled.div`
  padding: 0px 1rem;
  max-width: 768px;
  margin: 0 auto 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0px;
`

const CoinList = styled.ul`
  display: grid;
  gap: 1rem;
  width: 100%;
`

const CoinListItem = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 0.75rem;

  a {
    display: block;
    padding: 1rem;
    transition: all 0.2s ease-in;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 3rem;
  font-weight: 700;
`

interface ICoin {
  id: string
  name: string
  symbol: string
  rank: number
  is_new: boolean
  is_active: boolean
  type: string
}

function Coins() {
  const [loading, setLoading] = useState(true)
  const [coinData, setCoinData] = useState<ICoin[]>([])

  useEffect(() => {
    // useEffect에 전달하는 콜백함수는 async로 만들 수 없다.
    // 비동기로 동작하는 함수를 별도로 정의하고, 콜백함수 내부에 실행해야 한다.
    // 즉시 실행 함수를 만들어 실행해보자
    ;(async () => {
      const res = await fetch("https://api.coinpaprika.com/v1/coins")
      const data = await res.json()
      setCoinData(data.slice(0, 20))
      setLoading(false)
      console.log(data)
    })()
  }, [])

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <CoinList>
          {coinData.map((coin) => (
            <CoinListItem key={coin.id}>
              <Link to={coin.id}>{coin.name} &rarr;</Link>
            </CoinListItem>
          ))}
        </CoinList>
      )}
    </Container>
  )
}

export default Coins
