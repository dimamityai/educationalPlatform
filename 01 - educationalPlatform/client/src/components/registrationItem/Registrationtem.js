import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import {observer} from "mobx-react-lite";

const Registrationtem = observer(({placeholder, value, type, showRed, ...props}) => {
    return (
        <Form.Control
            {...props}
            className="mt-3"
            placeholder={placeholder}
            value={value}
            type={type}
            style={{background: showRed ? "red" : ""}}
        />
    );
});

export default Registrationtem;