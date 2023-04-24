import React from 'react';
import styles from "../../pages/userPage/UserPage.module.css";
import DivForUserInformation from "../../UI/div/DivForUserInformation/DivForUserInformation";
import {observer} from "mobx-react-lite";

const UserInformationList = observer(({user}) => {
    return (
        <div>
            <DivForUserInformation title={"Имя"} value={user.user.name}/>
            <DivForUserInformation title={"Фамилия"} value={user.user.surname}/>
            <DivForUserInformation title={"Отчевство"} value={user.user.patronymic}/>
            <DivForUserInformation title={"Почта"} value={user.user.email}/>
            <DivForUserInformation title={"Пол"} value={user.user.gender}/>
            <DivForUserInformation title={"Страна"} value={user.user.country}/>
            <DivForUserInformation title={"Город"} value={user.user.city}/>
            <DivForUserInformation title={"Школа"} value={user.user.email}/>
            <DivForUserInformation title={"Роль"} value={user.user.role}/>
            <DivForUserInformation style={{marginBottom: 6}} title={"id"} value={user.user.id}/>
        </div>
    );
});

export default UserInformationList;