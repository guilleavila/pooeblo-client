import { Container, Button } from "react-bootstrap"
import VillagesFilter from "../../components/VillagesFilter/VillagesFilter"
import bgImage from "../../public/consuegra.png"
import './HomePage.css'


const HomePage = () => {

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
            </Container>

        </section >
    )
}

export default HomePage