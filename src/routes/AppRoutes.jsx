import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import VillageSignupPage from '../pages/VillageSignupPage/VillageSignupPage'
import UserSignupPage from '../pages/UserSignupPage/UserSignupPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import VillagesResultsByProvinceListPage from '../pages/VillagesResultsByProvinceListPage/VillagesResultsByProvinceListPage'
import VillageDetailsPage from '../pages/VillageDetailsPage/VillageDetailsPage'
import NewHousePage from '../pages/NewHousePage/NewHousePage'
import UserProfilePage from '../pages/UserProfilePage/UserProfilePage'
import VillageProfilePage from '../pages/VillageProfilePage/VillageProfilePage'
import VillageFeaturesForm from '../components/VillageFeaturesForm/VillageFeaturesForm'
import VillagesResultsByCoastListPage from '../pages/VillagesResultsByCoastListPage/VillagesResultsByCoastListPage'
import VillagesResultsByMountainListPage from '../pages/VillagesResultsByMountainListPage/VillagesResultsByMountainListPage'
import HouseDetailsPage from '../pages/HouseDetailsPage/HouseDetailsPage'
import VillagesAllResultsListPage from '../pages/VillagesAllResultsListPage/VillagesAllResultsListPage'
import PaymentPage from '../pages/PaymentPage/PaymentPage'
import PrivateRoute from './PrivateRoute'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import VillageHousePage from '../pages/VillageHousePage/VillageHousePage'


const AppRoutes = () => {

    const { user } = useContext(AuthContext)

    return (
        <Routes>

            <Route path='/' element={<HomePage />} />
            {/* <Route path='/registro' element={<UserSignupPage />} />
            <Route path='/registro-pueblo' element={<VillageSignupPage />} /> */}
            {/* <Route path='/caracteristicas/:village_id' element={<VillageFeaturesForm />} /> */}
            {/* <Route path='/iniciar-sesion' element={<LoginPage />} /> */}
            <Route path='/pueblos/resultados' element={<VillagesAllResultsListPage />} />
            <Route path='/pueblos/resultados/:province' element={<VillagesResultsByProvinceListPage />} />
            <Route path='/pueblos/resultados/pueblos-de-sierra' element={<VillagesResultsByMountainListPage />} />
            <Route path='/pueblos/resultados/pueblos-de-costa' element={<VillagesResultsByCoastListPage />} />

            <Route path="/pueblos/:village_id" element={<PrivateRoute />}>
                <Route path="" element={<VillageDetailsPage />} />
            </Route>

            <Route path="/perfil" element={<PrivateRoute />}>
                {user?.firstName && <Route path="" element={<UserProfilePage />} />}
                {user?.name && <Route path="" element={<VillageProfilePage />} />}
            </Route>

            <Route path="/perfil" element={<PrivateRoute />}>
                <Route path="" element={<UserProfilePage />} />
            </Route>
            <Route path="/pueblos/:village_id/casas" element={<VillageHousePage />} />
            {/* <Route path='/nueva-casa' element={<NewHousePage />} /> */}
            <Route path='/casa/:house_id' element={<HouseDetailsPage />} />
            {/* <Route path='/casa/:house_id/editar' element={<HouseEditPage />} /> */}
            <Route path='/pagar' element={<PaymentPage />} />

        </Routes>
    )
}

export default AppRoutes