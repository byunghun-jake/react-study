import { useEffect, useState } from "react"
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom"
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
  gap: 1rem;
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

const OverView = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  align-items: center;
  justify-content: space-between;
`

const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  span:first-child {
    font-size: 0.75rem;
    font-weight: 400;
    text-transform: uppercase;
  }
`

const Description = styled.p`
  padding: 2rem 1rem;
`

const Tabs = styled.nav`
  width: 100%;
  display: flex;
  gap: 1rem;
`

const Tab = styled.div<{ isActive: boolean }>`
  flex: 1;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 1rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    transition: all 0.3s ease-out;
    color: ${(props) => (props.isActive ? props.theme.accentColor : "white")};
    font-weight: ${(props) => (props.isActive ? 700 : 500)};

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
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
  const [info, setInfo] = useState<IInfo>()
  const [price, setPrice] = useState<IPrice>()
  const [loading, setLoading] = useState(true)
  const priceMatch = useMatch({ path: "/:coinId/price" })
  const chartMatch = useMatch({ path: "/:coinId/chart" })
  console.log(priceMatch)

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
      setLoading(false)
    })()
  }, [coinId])

  return (
    <Container>
      <Header>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
        <Title>코인 : {locationState?.name || (!loading && info?.name)}</Title>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <>
          <OverView>
            <OverViewItem>
              <span>랭킹: </span>
              <span>{info?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>로고: </span>
              <span>{info?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>오픈소스: </span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverViewItem>
          </OverView>
          <Description>{info?.description}</Description>
          <OverView>
            <OverViewItem>
              <span>전체 공급량:</span>
              <span>{price?.total_supply}</span>
            </OverViewItem>
            <OverViewItem>
              <span>최대 공급량:</span>
              <span>{price?.max_supply}</span>
            </OverViewItem>
          </OverView>
        </>
      )}
      <Tabs>
        <Tab isActive={priceMatch !== null}>
          <Link to="price">가격</Link>
        </Tab>

        <Tab isActive={!!chartMatch}>
          <Link to="chart">차트</Link>
        </Tab>
      </Tabs>
      <Outlet />
    </Container>
  )
}

export default Coin
