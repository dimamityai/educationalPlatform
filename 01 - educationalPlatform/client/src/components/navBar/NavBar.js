import React, { useContext } from "react";
import { Context } from "../../index";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, USER_INFORMATION_ROUTE} from "../../utils/const";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import userICO from "../../assets/userICO.png";
import {Image} from "react-bootstrap";

const NavBar = observer(() => {
  const navigate = useNavigate();
  const { user } = useContext(Context);


  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: "white", textDecoration: "none" }} to={MAIN_ROUTE}>
          Образовательная платформа
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(ADMIN_ROUTE)}
            >
              Админ панель
            </Button>
              <Image
                  style={{marginLeft: 6, cursor: 'pointer'}}
                  src={userICO}
                  onClick={() => {
                      navigate(USER_INFORMATION_ROUTE)
                  }}
              />
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => {
                navigate(LOGIN_ROUTE)
              }}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
