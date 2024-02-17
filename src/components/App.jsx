import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import AppRouter from "../routes/AppRouter"

export default function App() {
  const { loading } = useContext(AuthContext)
  
  if (loading) {
    return (
      <p className="text-xl text-primary">Loading...</p>
    )
  }
  return (
      <div className="h-[100vh] bg-white">
        <AppRouter />
      </div>
  )
}