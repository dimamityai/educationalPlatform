import React from 'react';
import MyInput from "../../input/MyInput";
import styles from "./DivForUserInformation.module.css"

const DivForUserInformation = ({title, value, ...props}) => {
    return (
        <div {...props} className={styles.user__infromation__item}>
            <div className={styles.user__infromation__data}>
                {title}
            </div>
            <MyInput
                className={styles.user__infromation__input}
                value = {value}
            />
        </div>
    );
};

export default DivForUserInformation;