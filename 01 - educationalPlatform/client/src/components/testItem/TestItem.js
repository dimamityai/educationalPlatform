import React from 'react'
import styles from './TestItem.module.css'
import { useNavigate } from 'react-router-dom';
import MyButton from '../../UI/button/MyButton';
import WarningOnLoadTest from '../modals/WarningOnLoadTest';


const TestItem = ({test}) => {
  const navigate = useNavigate()
  return (
    <div className={styles.post}>
    <div className={styles.post__content}>
        <strong>{test.id}. {test.name}</strong>
        <div>
            {test.contents}
        </div>
    </div>
    <div className="post__btns">
        <MyButton 
            style={{borderRadius: 5}}
            onClick = {() => {
                // return <WarningOnLoadTest/>
                navigate('/test/' + test.id)
            }}
        >
            Пройти
        </MyButton>
    </div>
</div>
  )
}

export default TestItem