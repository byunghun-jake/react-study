import { useEffect, useState } from "react"
import { Link, Outlet, useLocation, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Loading from "../components/Loading"
import { IInfo, IPrice } from "../types"

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

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 3rem;
  font-weight: 700;
`

interface IRouteState {
  name: string
}

function Coin() {
  const navigate = useNavigate()
  // 코인 상세 페이지로 바로 접근하면 location에 state를 받아올 수 없기 때문에 에러가 발생한다.
  // Link를 통해 접근하는 방식과 직접 접근하는 방식 둘을 나누어 에러 핸들링을 해주어야 한다.
  const location = useLocation()
  const locationState = location.state as IRouteState
  const { coinId } = useParams()
  const [info, setInfo] = useState<IInfo | {}>({})
  const [price, setPrice] = useState<IPrice | {}>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const coinRes = await fetch(
        `https://api.coinpaprika.com/v1/coins/${coinId}`
      )
      const priceRes = await fetch(
        `https://api.coinpaprika.com/v1/tickers/${coinId}`
      )
      const coinData = await coinRes.json()
      const priceData = await priceRes.json()
      console.log(coinData)
      console.log(priceData)
      setInfo(coinData)
      setPrice(priceData)
    })()
  }, [])

  return (
    <Container>
      <Header>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        <Title>코인 : {locationState?.name || "Loading"}</Title>
      </Header>
      {loading ? <Loading /> : null}
      {/* <Link to="manage">관리</Link>
      <Outlet /> */}
    </Container>
  )
}

export default Coin
