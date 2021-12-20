import { Link, Outlet, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Coin() {
  const navigate = useNavigate()
  const { coinId } = useParams()
  return (
    <div>
      <h1>Coin: {coinId}</h1>
      <Link to="manage">관리</Link>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      <Outlet />
    </div>
  )
}

export default Coin
