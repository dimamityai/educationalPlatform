//App.js оснвной компонент приложения
import React, {useContext, useEffect, useState} from 'react';
//чтобы навигация работала импортируем BrowserRouter
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/navBar/NavBar';
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(()=> setLoading(false))
    }, [])

    if (loading){
        return <Spinner animation={"grow"}/>
    }
  return (
    //чтобы навигация по странице работала
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
