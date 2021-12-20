import { BrowserRouter, Route, Routes } from "react-router-dom"
import Coin from "./routes/Coin"
import CoinManage from "./routes/CoinManage"
import Coins from "./routes/Coins"

// react-router-dom v6로 업데이트되며 변경된 사항이 많다.
//
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId/*" element={<Coin />}>
          <Route path="manage" element={<CoinManage />} />
        </Route>
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
