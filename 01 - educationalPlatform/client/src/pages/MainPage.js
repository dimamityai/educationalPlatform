//основаная страница
import React, {useContext, useEffect} from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/typeBar/TypeBar";
import TestList from "../components/testList/TestList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchTests, fetchTypes} from "../http/testAPI";
import {fetchSchools} from "../http/schoolAPI";
import Pages from "../components/pagesPagination/Pages";

const MainPage = observer(() => {
    const {test} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => test.setTypes(data))
        fetchSchools().then(data => test.setSchool(data))
        fetchTests(test.selectedType.id, null, 1, test.limit).then(data => {
            test.setTests(data.rows)
            test.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchTests(test.selectedType.id, null, test.page, test.limit).then(data => {
            test.setTests(data.rows)
            test.setTotalCount(data.count)
        })
    }, [test.page, test.selectedType, test.selectedSchool])


  return (
    <Container>
      <Form className="d-flex mt-2">
        <Col md={3}>
          <TypeBar/>
        </Col>
          <TestList/>
      </Form>
        {/*{test.schools.map(el =>*/}
        {/*    <div>*/}
        {/*        {el.name}*/}
        {/*    </div>*/}
        {/*)}*/}
    </Container>

  );
});

export default MainPage;
