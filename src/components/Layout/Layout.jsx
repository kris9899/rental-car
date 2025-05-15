import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { Outlet } from "react-router-dom";
import Container from "../../ui/Container/Container";

const Layout = () => {
  return (
    <>
      <header>
        <Container>
          <Header />
          <Navigation />
        </Container>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
