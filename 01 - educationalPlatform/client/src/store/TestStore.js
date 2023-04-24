//глобальное хранилише для test
//имопртируем mobx
import {makeAutoObservable} from "mobx";

export default class TestStore {
    constructor(){
        this._types = []
        this._schools = []
        this._users = [
            {id: 1, email: 'd@mail.ru'},
            {id: 2, email: 'a@mail.ru'}
        ]
        this._tests = []
        this._selectedType = {};
        this._selectedSchool = {};
        this._page = 1;
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this);
    }

    setTests(tests){
        this._tests = tests;
    }

    setTypes(types){
        this._types = types;
    }
    
    setSchool(schools){
        this._schools = schools;
    }

    setUser(users){
        this._users = users;
    }
    
    setSelectedType(type){
        this._selectedType = type;
    }
    setSelectedSchool(school){
        this._selectedSchool = school;
    }

    setPage(page){
        this._page = page;
    }

    setTotalCount(totalCount){
        this._totalCount = totalCount;
    }

    setLimit(limit){
        this._limit = limit;
    }

    get types(){
        return this._types;
    }

    get schools(){
        return this._schools;
    }

    get users(){
        return this._users;
    }

    get tests(){
        return this._tests;
    }

    get selectedType(){
        return this._selectedType;
    }

    get selectedSchool(){
        return this._selectedSchool;
    }

    get page(){
        return this._page;
    }
    get limit(){
        return this._limit;
    }

    get totalCount(){
        return this._totalCount;
    }
}