import Loading from "./Loading"
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { authenticateUser } from "../redux/user/user"

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, token, role } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  if (isLoggedIn === null) {
    dispatch(authenticateUser({ token, role }))
    return <Loading message="Checking authentication..." />
  }
  if (!isLoggedIn) {
    return <Navigate to={'/user-login'} />
  }
  return <>{children}</>
}

export default ProtectedRoute