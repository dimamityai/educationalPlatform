//импортируем конфиг dotenv
require('dotenv').config();

//импортируем объект из файла db
const sequelize = require('./db');

//с помощью require можно импортировать модули в файл
//импортируем express
const express = require('express');

//импортируем моедли БД из models.js
const models = require('./models/models')

//импортируем cors
const cors = require('cors');

//импортируем пакет для работы с файлами
const filedUpload = require('express-fileupload');

//импориируем основной роутер
const router = require('./routes/index')

//регистриурем middleware
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

//PORT, на котором работает приложение
//Получаем его из переменного окружения env
const PORT = process.env.PORT || 5000

//запуск приложения
const app = express();

//передаем cors, чтобы отправялть запросы к бд из бразуера
app.use(cors());
//передаем express.json, чтобы сайт мог парсить json фармат
app.use(express.json());
//для работы с файлами(картинками)
app.use(filedUpload({}));
//передаем router
//первый параметр url, по которому router будет работать | второй параметр сам роутер
app.use('/api', router);
//Обработка ошибок, последний Middleware
app.use(errorHandler);



// //создаем get метод | первым параметром передам url, по которому будет отрабатывать get запрос | вторым параметром - callback
// //req - запрос, res - ответ
// app.get('/', (req, res) =>{
//     //если запрос произошел без ошибок, клиенту возвращаем 200
//     res.status(200).json({message: 'WORKING!!!!'})
// })


//функция для подлкючения к бд
//все операции с бд являются асинхронными из-за этого добавим async
const start = async () =>{
    try {
        //подкление к бд
        await sequelize.authenticate();
        await sequelize.sync(); //функция будет сравнивать состояние базы данных со схемой данных
        //listen прослушивает порт на котором работает наш сервер
        app.listen(PORT, () => console.log(`Server stared on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start();
