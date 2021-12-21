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
    display: flex;
    padding: 1rem;
    transition: all 0.2s ease-in;
    align-items: center;
    gap: 0.5rem;

    img {
      width: 2rem;
      height: 2rem;
      object-fit: contain;
    }
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
      background-color: ${(props) => props.theme.bgColor};
    }
  }
`

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 3rem;
  font-weight: 700;
`

export interface ICoin {
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
              {/* state를 쓰는 이유:
                우리는 이미 코인 리스트를 위한 데이터를 시간을 들여 받아온 상태,
                상세 페이지에 구성할 데이터는 물론 다시 받아오겠지만,
                이미 가지고 있는 데이터로 페이지의 일부를 구성할 수 있다.
                이 데이터를 사용하지 않고, 전부 새로 받아온 데이터로 꾸미는 건 편하지만
                사용자 경험 측면에서는 좋지 않을 수 있다.
              */}
              <Link to={coin.id} state={{ name: coin.name }}>
                <img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={`${coin.name} 이미지`}
                />
                <span>{coin.name} &rarr;</span>
              </Link>
            </CoinListItem>
          ))}
        </CoinList>
      )}
    </Container>
  )
}

export default Coins
