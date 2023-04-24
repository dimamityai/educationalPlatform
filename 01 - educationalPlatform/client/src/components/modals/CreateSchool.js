import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form  from "react-bootstrap/Form";
import {createType} from "../../http/testAPI";
import {createSchool} from "../../http/schoolAPI";

const CreateSchool = ({show, onHide}) => {
    const [value, setValue] = useState('');
    const addSchool = () => {
        createSchool({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новую школу
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder={"Введите название типа"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addSchool}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateSchool;
