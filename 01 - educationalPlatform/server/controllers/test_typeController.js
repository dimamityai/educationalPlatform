const {Test_type} = require('../models/models');
const ApiError = require('../error/ApiError');

//class нужен, чтобы группировать функции, можно обойтись и без него
class Test_typeController {
    async create(req, res){
        const {name} = req.body
        const test_type = await Test_type.create({name})
        return res.json(test_type)
    }

    async getAll(req, res) {
        const tests_type = await Test_type.findAll()
        return res.json(tests_type)
    }

    async getOne(req, res) {
        
    }

    async delete(req, res){
        
    }
}

module.exports = new Test_typeController();