import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
const PubicRoute = ({ children }) => {
    const { isLoggedIn } = useSelector((state) => state.user)
    if (isLoggedIn) {
        return (<Navigate to={'/dashboard'} replace />)
    }
    return (
        children
    )
}

export default PubicRoute