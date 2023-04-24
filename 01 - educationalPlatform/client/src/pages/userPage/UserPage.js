import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import {check, fetchOneUser, getOne} from "../../http/userAPI";
import {Context} from "../../index";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "./UserPage.module.css"
import Form from "react-bootstrap/Form";
import * as PropTypes from "prop-types";
import MyInput from "../../UI/input/MyInput";
import DivForUserInformation from "../../UI/div/DivForUserInformation/DivForUserInformation";
import {observer} from "mobx-react-lite";


const UserPage = observer(() => {
    const {user} = useContext(Context)
    const logOut = () =>{
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    useEffect(() => {
        check().then(res => fetchOneUser(res.id)
                            .then(res => {
                                console.log(res)
                                user.setUser(res)
        }))}, [])

    return (
        <Container className="d-flex flex-row">
            <ListGroup className={styles.user__list}>
                <ListGroup.Item
                    action
                >
                    О себе
                </ListGroup.Item>
                <ListGroup.Item
                    action
                    onClick={() => {
                        // logOut()
                    }}
                >
                    Результаты
                </ListGroup.Item>
                <ListGroup.Item
                    action
                    onClick={() => {
                        logOut()
                    }}
                >
                    Выйти
                </ListGroup.Item>
            </ListGroup>
            <div className={styles.user__infromation}>
                <DivForUserInformation title = {"Имя"} value = {user.user.name}/>
                <DivForUserInformation title = {"Фамилия"} value = {user.user.surname}/>
                <DivForUserInformation title = {"Отчевство"} value = {user.user.patronymic}/>
                <DivForUserInformation title = {"Почта"} value = {user.user.email}/>
                <DivForUserInformation title = {"Пол"} value = {user.user.gender}/>
                <DivForUserInformation title = {"Страна"} value = {user.user.country}/>
                <DivForUserInformation title = {"Город"} value = {user.user.city}/>
                <DivForUserInformation title = {"Школа"} value = {user.user.email}/>
                <DivForUserInformation title = {"Роль"} value = {user.user.role}/>
                <DivForUserInformation style = {{marginBottom: 6}} title = {"id"} value = {user.user.id}/>
            </div>
        </Container>
    );
});

export default UserPage;