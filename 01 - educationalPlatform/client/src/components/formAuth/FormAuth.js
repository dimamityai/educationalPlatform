import React from 'react';
import Form from "react-bootstrap/Form";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/const";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import RegistrationList from "../registrationList/RegistrationList";

const FormAuth = ({info, setInfo, requiredFields, patronymic,
                  setPatronymic, setRequiredFields, click, isLogin, ...props}) => {
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
            {...props}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email"
                        value={info.email}
                        onChange={e => setInfo({...info, email: e.target.value})}
                        style={{background: requiredFields.email ? "red" : ""}}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль"
                        value={info.password}
                        onChange={e => setInfo({...info, password: e.target.value})}
                        type="password"
                        style={{background: requiredFields.password ? "red" : ""}}
                    />
                    {isLogin
                        ? <div> </div>
                        : <div>
                            <RegistrationList
                                info={info}
                                requiredFields={requiredFields}
                                setInfo={setInfo}
                                patronymic={patronymic}
                                setPatronymic={setPatronymic}
                            />
                        </div>
                    }
                    <Form
                        {...props}
                        className="d-flex justify-content-between mt-3 pl-3 pr-3"
                    >
                        {isLogin ? (
                            <div>
                                Нет аккаунта?{" "}
                                <NavLink to={REGISTRATION_ROUTE}>Зарегиструйся</NavLink>
                            </div>
                        ) : (
                            <div>
                                Есть аккаунт?{" "}
                                <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        )}
                        <Button
                            className="align-self-end"
                            variant={"outline-success"}
                            onClick={() => {
                                let check = true;
                                Object.keys(info).forEach(el => {
                                    if (!info[el]) {
                                        console.log(1)
                                        check = false;
                                        setRequiredFields(prev => {return {...prev, [el] : true}})
                                    } else {
                                        setRequiredFields(prev => {return {...prev, [el] : false}})
                                    }
                                })
                                if (check) return click();
                            }}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Form>
                </Form>
            </Card>
        </Container>
    );
};

export default FormAuth;