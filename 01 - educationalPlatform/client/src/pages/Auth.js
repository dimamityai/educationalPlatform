//страница авторизации
import React, {useContext, useEffect, useState} from "react";
import {useLocation, useNavigate } from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/const";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import FormAuth from "../components/formAuth/FormAuth";

const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [patronymic, setPatronymic] = useState('')
  const [info, setInfo] = useState(
    isLogin
      ? {
        email: '',
        password: '',
      }
      : {
        email: '',
        password: '',
        name: '',
        surname: '',
        gender: '',
        country: '',
        city: '',
      }
  )
  const [requiredFields, setRequiredFields] = useState(
      isLogin
          ? {

              email: false,
              password: false,
            }
          : {
              email: false,
              password: false,
              name: false,
              surname: false,
              gender: false,
              country: false,
              city: false,
            }
  )

  useEffect( () => {
    setInfo(
        isLogin
            ? {
              email: '',
              password: '',
            }
            : {
              email: '',
              password: '',
              name: '',
              surname: '',
              gender: '',
              country: '',
              city: '',
            }
    )
    setRequiredFields(
    isLogin
        ? {
          email: false,
          password: false,
        }
        : {
          email: false,
          password: false,
          name: false,
          surname: false,
          gender: false,
          country: false,
          city: false,
        }
    )
  }, [isLogin])

  const click = async () =>{
    try {
      let data;
      if (isLogin){
          data = await login(info.email, info.password);
      } else{
        data = await registration(info.email, info.password, info.name, info.surname, patronymic,
                                  info.country, info.city, info.gender);
      }
      user.setUser(data)
      user.setIsAuth(true)
      navigate(MAIN_ROUTE);
    } catch (e){
        alert(e.response.data.message)
    }
  }

  return (
          <FormAuth info={info}
                    setInfo={setInfo}
                    requiredFields={requiredFields}
                    patronymic={patronymic}
                    setPatronymic={setPatronymic}
                    click={click}
                    setRequiredFields={setRequiredFields}
                    isLogin={isLogin}
          />
  );
});

export default Auth;
