import { BrowserRouter, Route, Routes } from "react-router-dom"
import Chart from "./routes/Chart"
import Coin from "./routes/Coin"
import Coins from "./routes/Coins"
import Price from "./routes/Price"

interface IRouterProps {
  isDarkMode: boolean
  toggleMode: () => void
}

// react-router-dom v6로 업데이트되며 변경된 사항이 많다.
//
function Router(props: IRouterProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:coinId/*"
          element={<Coin isDarkMode={props.isDarkMode} />}
        >
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Chart />} />
        </Route>
        <Route path="/" element={<Coins {...props} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
