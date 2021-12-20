import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  padding: 0px 1rem;
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
`

const coinData = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "bnb-binance-coin",
    name: "Binance Coin",
    symbol: "BNB",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "usdt-tether",
    name: "Tether",
    symbol: "USDT",
    rank: 4,
    is_new: false,
    is_active: true,
    type: "token",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 5,
    is_new: false,
    is_active: true,
    type: "token",
  },
  {
    id: "sol-solana",
    name: "Solana",
    symbol: "SOL",
    rank: 6,
    is_new: false,
    is_active: true,
    type: "token",
  },
]

function Coins() {
  const navigate = useNavigate()
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
        <button onClick={() => navigate("/btc")}>비트코인</button>
      </Header>
      <CoinList>
        {coinData.map((coin) => (
          <CoinListItem key={coin.id}>
            <Link to={coin.id}>{coin.name} &rarr;</Link>
          </CoinListItem>
        ))}
      </CoinList>
    </Container>
  )
}

export default Coins
