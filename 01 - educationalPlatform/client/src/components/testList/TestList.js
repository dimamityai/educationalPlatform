import { observer } from "mobx-react-lite";
import React, { useContext } from 'react'
import { Context } from '../../index';
import {Form} from 'react-bootstrap'
import TestItem from "../testItem/TestItem";
import Pages from "../pagesPagination/Pages";

const TestList = observer(() => {
  const {test} = useContext(Context);
  return (
    <Form 
        style={{marginLeft:100}}
        className="d-flex flex-column" 
    >
        {test.tests.map((test) => 
            <TestItem key = {test.id} test={test}/>
        )}
        <Pages/>
    </Form>
  )
})

export default TestList