
import Header from '../compontnts/Header/Header'
import Footer from '../compontnts/Footer/Footer'
import Routers from '../routes/Routers'

const Layout = () => {
  return (
    <>
        <Header />
        <main>
            <Routers />
        </main>
        <Footer />
    </>
  )
}

export default Layout