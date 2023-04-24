import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode"

export const registration = async (email, password, name, surname, patronymic, country, city, gender, role, schoolId) =>{
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN', name, surname,
                                                                      patronymic, country, city, gender, schoolId})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) =>{
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () =>{
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const fetchOneUser = async (id) =>{
    const {data} = await $authHost.get('api/user/information/' + id)
    return data
}

export const createUserTestResult = async (result, userId, testId) =>{
    const {data} = await $authHost.post('api/usertestresult', {result, userId, testId})
    return data
}

export const fetchUserTestResult = async (userId, testId) =>{
    let res;
    if (userId && testId){
        const {data} = await $authHost.get('api/usertestresult?' + 'userId=' + userId +'&testId=' + testId)
        res = data
    }
    else if (userId) {
        const {data} = await $authHost.get('api/usertestresult?' + 'userId=' + userId)
        res = data
    }
    else if (testId){
        const {data} = await $authHost.get('api/usertestresult?' + 'testId=' + testId)
        res = data
    }
    return res
}