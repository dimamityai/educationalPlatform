//страница конкретнго теста
import React, {useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import styles from './TestPage.module.css'
import MyInput from "../../UI/input/MyInput";
import MyButton from '../../UI/button/MyButton';
import {useParams} from "react-router-dom";
import {fetchOneTest} from "../../http/testAPI";

const TestPage = () =>{
    const [test, setTest] = useState({info : []});
    const {id} = useParams()

    useEffect(() => {

        fetchOneTest(id).then(data => {
            return setTest(data)
        })
    }, [])



    const [readyTask, setReadyTask] = useState(0);
    const readyRaskArr = {};
    const checkFormToAnswer = (event, id) =>{
        if (!readyRaskArr[id]){
                if (event.target.value.length === 1){
                    setReadyTask((prev) => prev + 1)
                }
                readyRaskArr[id] = 1;
                return
            }
        if (event.target.value.length === 0){
            setReadyTask((prev) => {
                if (prev === 0) return prev
                return prev - 1
            })
        }
    }


    return (
        <Container>
            <div className={styles.test__form}>
                <h1 className={styles.test__header}>
                    {test.name}
                </h1>
                <div className={styles.test__item}>
                    {test.contents}
                </div>
            </div>
            <div className={styles.task__layout}>
                <div className={styles.task__content}>
                    {test.info.map(task =>
                        <div 
                            key = {task.id}
                            className={styles.task__form}
                        >
                            <h2 className={styles.task__header}>
                                {task.title}
                            </h2>
                            <div className={styles.task__item}>
                                {task.description}
                            </div>
                            <MyInput placeholder = 'Ответ' onChange = {(event) => checkFormToAnswer(event, task.id)}/>
                        </div>    
                    )}
                </div>
                <div 
                    className={styles.task__form__asnwer}
                >
                    <div className={styles.task__form__asnwer__item}>
                        Выполнено заданий: {readyTask} из {test.info.length}
                    </div>
                    <MyButton style={{borderRadius: 5, marginLeft: 30, width: 200}}>Завершить</MyButton>
                </div>
            </div>
        </Container>
    );
}

export default TestPage;