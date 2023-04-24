const {User_test_result, Test} = require('../models/models');
const ApiError = require('../error/ApiError');

//class нужен, чтобы группировать функции, можно обойтись и без него
class User_test_resultController {
    async create(req, res){
        const {result, testId, userId} = req.body
        const user_test_result = await User_test_result.create({result, userId, testId})
        return res.json(user_test_result)
    }
    async getAllByUserId(req, res) {
        let {userId, testId, limit, page} = req.query;
        //limit - кол-во тестов на одной странице
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit //отступ
        let user_test_results;
        if (!userId && !testId){
            //findAndCountAll - подсчитает сколько всего тестов найдено по запросу, без учета лимита
            //и выведет ответ
            user_test_results = await User_test_result.findAndCountAll({limit, offset});
        }
        if (userId && !testId){
        user_test_results = await User_test_result.findAndCountAll({where: {userId}, limit, offset});
        }
        if (!userId && testId){
            user_test_results = await User_test_result.findAndCountAll({where: {testId}, limit, offset});
        }
        if (userId && testId){
            user_test_results = await User_test_result.findAndCountAll({where: {userId, testId}, limit, offset});
            console.log(user_test_results)
        }
        return res.json(user_test_results);
    }

    async getOne(req, res) {

    }

    async delete(req, res){

    }
}

module.exports = new User_test_resultController();