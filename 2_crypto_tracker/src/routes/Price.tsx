import { useQuery } from "react-query"
import { useOutletContext } from "react-router-dom"
import styled from "styled-components"
import { fetchCoinPrice } from "../api"
import Loading from "../components/Loading"
import { IPrice } from "../types"

interface IContext {
  coinId: string
}

const PriceList = styled.ul`
  display: grid;
  gap: 1rem;
  width: 100%;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: whitesmoke;
    padding: 1.5rem 1rem;
    color: ${(props) => props.theme.bgColor};
    border-radius: 0.5rem;

    @media (min-width: 480px) {
      flex-direction: row;
      justify-content: space-between;
    }

    .key {
      font-weight: bold;
      font-size: 1.125rem;
    }

    .value {
    }
  }
`

function Price() {
  const context = useOutletContext<IContext>()
  const { isLoading: priceLoading, data: price } = useQuery<IPrice>(
    ["price", context.coinId],
    () => fetchCoinPrice(context.coinId as string)
  )
  return (
    <>
      {priceLoading ? (
        <Loading />
      ) : (
        <>
          <PriceList>
            {price &&
              Object.keys(price.quotes.USD).map((key) => (
                <li key={key}>
                  <p className="key">{key}</p>
                  <p className="value">{price.quotes.USD[key]}</p>
                </li>
              ))}
          </PriceList>
        </>
      )}
    </>
  )
}

export default Price
