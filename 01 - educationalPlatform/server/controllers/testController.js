const {Test, Test_info} = require('../models/models');
const ApiError = require('../error/ApiError');
//class нужен, чтобы группировать функции, можно обойтись и без него
class TestController {
    async create(req, res, next){
        try{
        let {name, contents, userId, schoolId, testTypeId, info} = req.body
        const test = await Test.create({name, contents, userId, schoolId, testTypeId})
        if (info){
            //на фронте в будущем переводим info в строку, а здесь обратно в json
            info = JSON.parse(info);
            //await не нужен, чтобы не блокировать весь поток
            info.forEach(i => {
                Test_info.create({
                    title: i.title,
                    description: i.description,
                    testId: test.id
                })
            });
        }
        
        return res.json(test)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {userId, schoolId, testTypeId, limit, page} = req.query;
        //limit - кол-во тестов на одной странице
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit //отступ
        let tests;
        //если нет ни одного ищем по всем
        if (!userId && !schoolId && !testTypeId){
            //findAndCountAll - подсчитает сколько всего тестов найдено по запросу, без учета лимита
            //и выведет ответ
            tests = await Test.findAndCountAll({limit, offset});
        }
        //если есть userid ищем по нему
        if (userId && !schoolId && !testTypeId){
            //where - поля в которых необходимо искать
            tests = await Test.findAndCountAll({where: {userId}, limit, offset});

        }
        //если есть schoolid ищем по нему
        if (!userId && schoolId && !testTypeId){
            tests = await Test.findAndCountAll({where: {schoolId}, limit, offset});
        }
        //если есть typeid ищем по нему
        if (!userId && !schoolId && testTypeId){
            tests = await Test.findAndCountAll({where: {testTypeId}, limit, offset});
        }
        //если есть userid и schoolid ищем по ним
        if (userId && schoolId && !testTypeId){
            tests = await Test.findAndCountAll({where: {userId, schoolId}, limit, offset});
        }
        //если есть userid и typeid ищем по ним
        if (userId && !schoolId && testTypeId){
            tests = await Test.findAndCountAll({where: {userId, testTypeId}, limit, offset});
        }
        //если есть schoolid и typeid ищем по ним
        if (!userId && schoolId && testTypeId){
            tests = await Test.findAndCountAll({where: {schoolId, testTypeId}, limit, offset});
        }
        //если есть все ищем по ним
        if (userId && schoolId && testTypeId){
            tests = await Test.findAndCountAll({where: {userId, schoolId, testTypeId}, limit, offset});
        }
        return res.json(tests);
    }

    async getOne(req, res) {
        const {id} = req.params
        const test = await Test.findOne(
            {
                where: {id},
                //так же подгружаем сразу содержимое теста
                //первый параметр model, 
                //второй паратер поле
                include: [
                    {
                        model: Test_info, as: 'info'
                    }
                ]
            },
            
        )
        return res.json(test);
    }

    async delete(req, res){
        
    }
}

module.exports = new TestController();