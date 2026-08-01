import { useState } from "react"
import Loading from "./Loading"

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  if (isAuthenticated === null) {
    return <Loading status="Checking authentication..." />
  }
  return <>{children}</>
}

export default ProtectedRoute