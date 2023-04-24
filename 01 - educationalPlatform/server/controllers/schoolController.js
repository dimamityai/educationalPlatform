//импортируем модель школы из бд
const {School} = require('../models/models');
const ApiError = require('../error/ApiError');
//class нужен, чтобы группировать функции, можно обойтись и без него
class SchoolController {
    async create(req, res){
        //вытаскиваем тело из POST запроса
        const {name} = req.body
        const school = await School.create({name})
        return res.json(school)
    }

    async getAll(req, res){
        const schools = await School.findAll()
        return res.json(schools)
    }

    async getOne(req, res){
        const {id} = req.params
        const school = await School.findOne({where: {id}})
        return res.json(school);
    }

    async delete(req, res){
        
    }
}

module.exports = new SchoolController();