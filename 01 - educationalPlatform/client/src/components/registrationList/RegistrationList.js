import React from 'react';
import Registrationtem from "../registrationItem/Registrationtem";

const RegistrationList = ({info, setInfo, requiredFields, patronymic, setPatronymic }) => {
    return (
        <div>
            <Registrationtem
                placeholder={"Введите ваше имя"}
                value={info.name}
                type={"name"}
                showRed={requiredFields.name}
                onChange={e => setInfo({...info, name: e.target.value})}
            />
            <Registrationtem
                placeholder={"Введите вашу фамилию"}
                value={info.surname}
                type={"surname"}
                showRed={requiredFields.surname}
                onChange={e => setInfo({...info, surname: e.target.value})}
            />
            <Registrationtem
                placeholder={"Введите вашe отчевство"}
                value={patronymic}
                type={"patronymic"}
                showRed={false}
                onChange={e => setPatronymic(e.target.value)}
            />
            <Registrationtem
                placeholder={"Введите вашу страну"}
                value={info.country}
                type={"patronymic"}
                showRed={requiredFields.country}
                onChange={e => setInfo({...info, country: e.target.value})}
            />
            <Registrationtem
                placeholder={"Введите ваш город"}
                value={info.city}
                type={"city"}
                showRed={requiredFields.city}
                onChange={e => setInfo({...info, city: e.target.value})}
            />
            <Registrationtem
                placeholder={"Введите ваш пол"}
                value={info.gender}
                type={"gender"}
                showRed={requiredFields.gender}
                onChange={e => setInfo({...info, gender: e.target.value})}
            />
        </div>
    );
};

export default RegistrationList;