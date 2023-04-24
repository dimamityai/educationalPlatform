//index.js связывает все роутеры


//импортируем роуте из эспресс
const Router = require('express');
//создаем объект роутера
const router = new Router(); 

//импортимруем все модули
const schoolRouters =  require('./schoolRouters');
const testRouters = require('./testRouters');
const userRouters = require('./userRouters');
const test_typeRouter = require('./test_typeRouter');

//другие файлы будут подроутреами
//router.use - сопоставляет маршруты с роутерами
//первый параметр url, по которому будет роутер отрабатывать
//второй парамтер, сам роутер
router.use('/user', userRouters)
router.use('/school', schoolRouters)
router.use('/test', testRouters)
router.use('/testtype', test_typeRouter)



//экспорипруем роутер
module.exports = router;