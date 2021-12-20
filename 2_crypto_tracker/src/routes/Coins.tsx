import { useNavigate } from "react-router-dom"

function Coins() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Coins</h1>
      <button onClick={() => navigate("/btc")}>비트코인</button>
    </div>
  )
}

export default Coins
