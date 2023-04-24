//страница конкретнго теста
import React, {useContext, useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import styles from './TestPage.module.css'
import MyInput from "../../UI/input/MyInput";
import MyButton from '../../UI/button/MyButton';
import {useNavigate, useParams} from "react-router-dom";
import {fetchOneTest} from "../../http/testAPI";
import {Context} from "../../index";
import {
    check,
    createUserTestResult,
    fetchCreateUserTestResult,
    fetchOneUser,
    fetchUserTestResult
} from "../../http/userAPI";
import {MAIN_ROUTE} from "../../utils/const";

const TestPage = () =>{
    const {user} = useContext(Context)
    const navigate = useNavigate();
    const [readyTask, setReadyTask] = useState(0);
    const [testResult, setTestResult] = useState({})
    const [test, setTest] = useState({info : []});
    const {id} = useParams()

    useEffect(() => {
        check().then(res => fetchOneUser(res.id)
            .then(res => {
                user.setUser(res)
                fetchUserTestResult(user.user.id, id).then(res => {
                        console.log(res)
                        setTestResult(res)
                        setReadyTask(res.rows[0].result)
                    }
                )
            }))
        fetchOneTest(id).then(data => {
            return setTest(data)
        })
    }, [])



    const readyTaskArr = {};
    const checkFormToAnswer = (event, id) =>{
        if (!readyTaskArr[id]){
                if (event.target.value.length === 1){
                    setReadyTask((prev) => prev + 1)
                }
                readyTaskArr[id] = 1;
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
                {!testResult.count &&
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
                </div>}
                <div

                    style={testResult.count ?
                        {width: '100%', marginLeft: -2}
                        : {}}
                    className={styles.task__form__asnwer}
                >
                    <div className={styles.task__form__asnwer__item}>
                        Выполнено заданий: {readyTask} из {test.info.length}
                    </div>
                    <Button
                        variant={"outline-success"}
                        style={{borderRadius: 5, marginLeft: 30, width: 200}}
                        onClick={()=> {
                            if (testResult.count){
                                navigate(MAIN_ROUTE)
                            }
                            else if (user.user.id){
                                createUserTestResult(readyTask, user.user.id, id)
                                navigate(MAIN_ROUTE)
                            } else {
                                alert('Не авторизован')
                            }
                        }}
                    >
                        Завершить
                    </Button>
                </div>
            </div>
        </Container>
    );
}

export default TestPage;