//файл для подключения к базе данных
//импортируем sequelize и достаем от туда класс Sequelize (делаем деструктуризацию)
const {Sequelize} = require('sequelize');

//экспортируем объект, который мы создаем из этого класса
//в конструктуре будем указывать конфигурацию
module.exports = new Sequelize(
    process.env.DB_NAME, //Название БД
    process.env.DB_USER, //Пользователь
    process.env.DB_PASSWORD, // ПАРОЛЬ
    {
        dialect: 'postgres', //Диалект постгрэс(или mysql)
        host: process.env.DB_HOST, //хост
        port: process.env.DB_PORT //порт
    }
)