import React, {useEffect, useState} from 'react';
import {fetchOneTest} from "../../http/testAPI";
import {observer} from "mobx-react-lite";
import styles from "./UserResultList.module.css"
const UserResultList = observer(({user}) => {
    const [test, setTest] = useState({})
    // useEffect(() => {
    //     fetchOneTest(user.testResults.rows[0].testId).then(data =>{
    //         setTest(data)
    //     })
    // }, [])
    return (
        <div className="d-flex">
            {/*<div style={{marginTop: 5}}>*/}
            {/*    {test.name}*/}
            {/*</div>*/}
            {/*<div*/}
            {/*    className={styles.test}*/}
            {/*>*/}
                {user.testResults.rows.map(testResult =>
                    <div>
                        {testResult.testId}
                    </div>
                )}
                {/*{user.testResults.rows[0].result}*/}
            {/*</div>*/}
        </div>
    );
});

export default UserResultList;