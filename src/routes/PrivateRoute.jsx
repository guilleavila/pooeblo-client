import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"


const PrivateRoute = () => {

    const { isLoggedIn, isLoading } = useContext(AuthContext)

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!isLoggedIn) {
        return <Navigate to='/' />
    }

    return <Outlet />
}

export default PrivateRoute