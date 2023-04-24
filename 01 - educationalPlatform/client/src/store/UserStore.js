//глобальное хранилише для user
//имопртируем mobx
import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor(){
        //_ означает что переменная изменяться не может
        this._isAuth = false;
        this._user = {};
        this._isLoading = false;
        this._testResults = [];
        //mobx будет следить за изменениями объектов this, если они изменяются то компоненты будут перендероваться
        makeAutoObservable(this);
    }

    setIsLoading(bool){
        this._isLoading = bool;
    }

    //Action - функции для изменения состояния
    setIsAuth(bool){
        this._isAuth = bool;
    }

    setTestResults(testResults){
        this._testResults = testResults;
    }

    setUser(user){
        this._user = user;
    }
    //Геттеры - получать какие-то переменные из состояния
    //компьютет функции - к ним будет обращаться когдла какая-то переменная была изменена
    get isAuth(){
        return this._isAuth;
    }

    get isLoading(){
        return this._isLoading;
    }

    get user(){
        return this._user;
    }

    get testResults(){
        return this._testResults;
    }
}