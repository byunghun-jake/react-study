import { useQuery } from "react-query"
import { useOutletContext } from "react-router-dom"
import ApexChart from "react-apexcharts"
import ko from "apexcharts/dist/locales/ko.json"
import { fetchCoinHistory } from "../api"
import Loading from "../components/Loading"
import styled from "styled-components"
import { useRecoilValue } from "recoil"
import { isDarkAtom } from "../atoms"

interface IContext {
  coinId: string
  isDarkMode: boolean
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

interface IApexChartProps {
  data: IHistorical[]
}

function LineChart({ data }: IApexChartProps) {
  const isDarkMode = useRecoilValue(isDarkAtom)
  return (
    <ApexChart
      type="line"
      series={[
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
          locales: [ko],
          defaultLocale: "ko",
        },
        stroke: {
          curve: "smooth",
          width: 3,
        },
        theme: {
          mode: isDarkMode ? "dark" : "light",
        },
        xaxis: {
          type: "datetime",
          labels: {
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM",
              day: "MMM dd일",
              hour: "HH:mm",
            },
          },
        },
        yaxis: {
          show: false,
        },
        fill: {
          type: "gradient",
          gradient: {
            gradientToColors: ["#0be881"],
            stops: [0, 100],
          },
        },
        colors: ["#0fbcf9"],
        tooltip: {
          y: {
            formatter(value) {
              return `${value.toFixed(2)}`
            },
          },
          x: {
            format: "MMM dd일",
          },
        },
      }}
    />
  )
}

function CandlestickChart({ data }: IApexChartProps) {
  const isDarkMode = useRecoilValue(isDarkAtom)
  return (
    <ApexChart
      type="candlestick"
      series={[
        {
          data: data?.map((h) => ({
            x: new Date(h.time_open).getTime(),
            y: [h.open, h.high, h.low, h.close],
          })),
        },
      ]}
      options={{
        chart: {
          id: "candles",
          toolbar: {
            autoSelected: "pan",
            show: false,
          },
          background: "transparent",
          locales: [ko],
          defaultLocale: "ko",
        },
        stroke: {
          curve: "smooth",
          width: 3,
        },
        theme: {
          mode: isDarkMode ? "dark" : "light",
        },
        xaxis: {
          type: "datetime",
          labels: {
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM",
              day: "MMM dd일",
              hour: "HH:mm",
            },
          },
        },
        yaxis: {
          show: false,
        },
        tooltip: {
          y: {
            formatter(value) {
              return `${value.toFixed(2)}`
            },
          },
          x: {
            format: "MMM dd일",
          },
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#3C90EB",
              downward: "#EF403C",
            },
          },
        },
      }}
    />
  )
}

function Chart() {
  const context = useOutletContext<IContext>()
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", context.coinId],
    () => fetchCoinHistory(context.coinId)
  )

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        data && (
          <>
            <div>
              <h2>LineChart</h2>
              <LineChart data={data} />
            </div>
            <div>
              <h2>CandlestickChart</h2>
              <CandlestickChart data={data} />
            </div>
          </>
        )
      )}
    </Container>
  )
}

export default Chart
