import React, {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form  from "react-bootstrap/Form";
import { Context } from "../..";
import { Col, Dropdown, Row } from "react-bootstrap";
import {createTest, fetchTypes} from "../../http/testAPI";
import {fetchSchools} from "../../http/schoolAPI";
import {observer} from "mobx-react-lite";
import {check, fetchOneUser} from "../../http/userAPI";

const CreateTest = observer(({show, onHide}) => {
  const {test} = useContext(Context)
  const {user} = useContext(Context)
  useEffect(() => {
      fetchTypes().then(data => test.setTypes(data))
      fetchSchools().then(data => test.setSchool(data))
      check().then(res => fetchOneUser(res.id)
        .then(res => {
          user.setUser(res)
        }))
  }, [])

  const [testName, setTestName] = useState('')
  const [info, setInfo] = useState([])
  const addInfo = () =>{
    setInfo([...info, {title: '', description: '', number:Date.now()}]);
  }

  const removeInfo = (number) =>{
    setInfo(info.filter(i => i.number !== number));
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const addTest = () =>{
    const formData = new FormData()
    formData.append('name', testName)
    formData.append('contents', '')
    formData.append('userId', user.user.id)
    formData.append('schoolId', test.selectedSchool.id)
    formData.append('testTypeId', test.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createTest(formData).then(data => onHide())
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Добавить новый тест
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{test.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
            <Dropdown.Menu>
                {test.types.map(type =>
                    <Dropdown.Item
                        onClick={() => test.setSelectedType(type)}
                        key={type.id}
                    >
                      {type.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{test.selectedSchool.name || "Выберите школу"}</Dropdown.Toggle>
            <Dropdown.Menu>
                {test.schools.map(school =>
                    <Dropdown.Item
                        onClick={() => test.setSelectedSchool(school)}
                        key={school.id}
                    >
                      {school.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
        <Form.Control
            value={testName}
            className="mt-3"
            placeholder={"Введите название теста"}
            onChange={e => setTestName(e.target.value)}
        />
        <Button 
            variant="outline-dark"
            className="mt-3"
            onClick={addInfo}
        >
            Добавить новое задание
        </Button>
        {info.map(i=>
                <Row className="mt-4" key = {i.number}>
                    <Col md={4}>
                        <Form.Control
                            value = {i.title}
                            onChange={(e) => changeInfo('title', e.target.value, i.number)}
                            placeholder="Введите название задания"
                        />
                    </Col>
                    <Col md={4}>
                        <Form.Control
                            value = {i.description}
                            onChange={(e) => changeInfo('description', e.target.value, i.number)}
                            placeholder="Введите содержание теста"
                        />
                    </Col>
                    <Col md={4}>
                        <Button 
                            variant="outline-danger" 
                            onClick={() => removeInfo(i.number)}
                        >
                            Удалить
                        </Button>
                    </Col>
                </Row>
            )}
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-danger" onClick={onHide}>
        Закрыть
      </Button>
      <Button variant="outline-success" onClick={addTest}>
        Добавить
      </Button>
    </Modal.Footer>
  </Modal>
  )
})

export default CreateTest