import { useQuery } from "react-query"
import { useOutletContext } from "react-router-dom"
import ApexChart from "react-apexcharts"
import { fetchCoinHistory } from "../api"
import Loading from "../components/Loading"
import styled from "styled-components"

interface IContext {
  coinId: string
}

interface IHistorical {
  close: number
  high: number
  low: number
  market_cap: number
  open: number
  time_open: string
  time_close: string
  volume: number
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const CHART_OPTIONS = {
  theme: {
    mode: "dark",
  },
  chart: {
    width: 500,
    height: 500,
  },
}

function Chart() {
  const context = useOutletContext<IContext>()
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", context.coinId],
    () => fetchCoinHistory(context.coinId)
  )
  console.log(data)
  return (
    <Container>
      <h1>Chart</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "시가",
              data: data?.map((h) => ({
                x: new Date(h.time_open).getTime(),
                y: h.open,
              })),
            },
            {
              name: "종가",
              data: data?.map((h) => ({
                x: new Date(h.time_open).getTime(),
                y: h.close,
              })),
            },
          ]}
          options={{
            chart: {
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            theme: {
              mode: "dark",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </Container>
  )
}

export default Chart
