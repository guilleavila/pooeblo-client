import { AuthContext } from "../../context/auth.context"
import { useContext } from "react"

const PruebaUser = () => {

    const { user } = useContext(AuthContext)

    console.log(user)

    return (
        <>
            {
                !user ? <h1>Logeate </h1> :


                    user.isVillage
                        ?
                        <h1>Bienvenido {user.name}</h1>
                        :
                        <>
                            <h1>Bienvenid@ {user.firstName} {user.lastName}</h1>
                            <p>{user._id}</p>
                        </>

            }

        </>
    )
}

export default PruebaUser