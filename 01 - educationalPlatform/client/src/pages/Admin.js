//Admin панель
import React, {useContext, useEffect, useState} from "react";
import { Button, Container } from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateSchool from "../components/modals/CreateSchool";
import CreateTest from "../components/modals/CreateTest";


const Admin = () =>{
    const [testVisible, setTestVisible] = useState(false)
    const [schoolVisible, setSchoolVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)


    return (
        <Container className="d-flex flex-column">
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2" 
                onClick={() => setTypeVisible(true)}
            >
                Добавить тип
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2" 
                onClick={() => setSchoolVisible(true)}
            >
                Добавить школу
            </Button>
            <Button 
                variant={"outline-dark"} 
                className="mt-4 p-2"
                onClick={() => setTestVisible(true)}
            >
                Добавить тест
            </Button>
            <CreateSchool show={schoolVisible} onHide={() => setSchoolVisible(false)}/>
            <CreateTest show={testVisible} onHide={() => setTestVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
        </Container>
    );
}

export default Admin;