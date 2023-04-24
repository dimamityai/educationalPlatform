import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {check, fetchOneUser, fetchUserTestResult} from "../../http/userAPI";
import {Context} from "../../index";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "./UserPage.module.css"
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import UserInformationList from "../../components/userInformationList/UserInformationList";
import UserResultList from "../../components/userResultList/UserResultList";


const UserPage = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    const [userChoose, setUserChoose] = useState('info');
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    useEffect(() => {
        check().then(res => fetchOneUser(res.id)
            .then(res => {
                console.log(res)
                user.setUser(res)
                fetchUserTestResult(user.user.id)
                    .then(res => {
                        console.log(res)
                        user.setTestResults(res)
                    })
            }))
    }, [])

    return (
        <Container className="d-flex flex-row">
            <ListGroup className={styles.user__list}>
                <ListGroup.Item
                    action
                    onClick={() => {
                        setUserChoose('info')
                    }}
                >
                    О себе
                </ListGroup.Item>
                <ListGroup.Item
                    action
                    onClick={() => {
                        setUserChoose('result')
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
                {(userChoose === 'info') &&
                    <UserInformationList user={user}/>}
                {(userChoose === 'result') &&
                    <UserResultList user={user}/>}
            </div>
        </Container>
    );
});

export default UserPage;