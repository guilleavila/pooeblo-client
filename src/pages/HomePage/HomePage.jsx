import { Container, Button, Row } from "react-bootstrap"
import VillagesFilter from "../../components/VillagesFilter/VillagesFilter"
import bgImage from "../../public/consuegra.png"
import VillageCard from "../../components/VillageCard/VillageCard"
import './HomePage.css'
import { useEffect, useState } from "react"
import villagesService from "../../services/villages.service"
import MyFollowedVillages from "../../components/MyFollowedVillages/MyFollowedVillages"


const HomePage = () => {

    const [villages, setVillages] = useState([])

    useEffect(() => {
        getVillages()
    }, [])

    const getVillages = () => {
        villagesService
            .getAllVillages()
            .then(({ data }) => {
                setVillages(data.splice(0, 3))
            })
            .catch(err => console.log(err))
    }

    console.log(villages)

    return (
        <section>
            <Container >
                <div className="hero">
                    <img className="bgImg" src={bgImage}></img>
                </div>
                <div className="center">
                    <VillagesFilter />
                </div>
                <section className="firstSection">
                    <Container className="firstSectionFlex">

                        <h2 className="h2Weight">¿Eres un pueblo?</h2>
                        <h3 className="h3Weight">Regístrate ahora para darte a conocer y llena tu pueblo de vida.</h3>


                        <Button className="big-btn" >Regístrate</Button>
                        {/* onClick={openSignUpModal} */}
                    </Container>
                </section>
                <section className="secondSection">
                    <Container className="secondSectionFlex">
                        <h2 className="h2Weight">Descubre pueblos</h2>
                        <h3 className="h3Weight">con todo lo que necesitas</h3>
                        <div class="villagesSubSection">
                            <Row>
                                <MyFollowedVillages followedVillages={villages} size={4} />
                            </Row>
                        </div>
                    </Container>
                </section>
            </Container >

        </section >
    )
}

export default HomePage