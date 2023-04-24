//в данном файле будут описаны модели данных базы данных

//импортируем файл sequelize, который создан в db.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
//из самого пакета sequelize имопортируем DataTypes, с ее помощью будут описаны соответствующие типы того или иного проля стринг и тд


/////////////////////описание моделей//////////////////////////

//Модель - пользователь
//sequelize.define | первый параметр - название модели | второй параметр - объект с полями модели
const User = sequelize.define('user', {
    //id пользователя
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //email пользователя - уникальный
    email: {type: DataTypes.STRING, unique: true},
    //пароль 
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    patronymic: {type: DataTypes.STRING},
    gender: {type: DataTypes.STRING},
    country: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    //роль (USER, ADMIN)
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

//Модель - Избранное
const Favorites = sequelize.define('favorites', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

//Модель - Школа
const School = sequelize.define('school', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})

//Модель - Связь между избранным и школой
const Favorites_school = sequelize.define('favorites_school', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

//Модель - Тест
const Test = sequelize.define('test', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    contents: {type: DataTypes.STRING, defaultValue: "", allowNull: false},
})

//Модель - информация о тесте(его содержимое)
const Test_info = sequelize.define('test_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, defaultValue: "", allowNull: false},
    description: {type: DataTypes.STRING, defaultValue: "", allowNull: false},
})

//Модель - информация о тесте(его содержимое)
const Test_type = sequelize.define('test_type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false},
})

/////////////////связи между моделями////////////////////////
//указываем модель и с кем она имеет свзязь(sequelize автомматически расставит внешние ключи)


/////////////////////////USER////////////////////////////////////////
//Один user один favorites
User.hasOne(Favorites);
Favorites.belongsTo(User); //Favorites принадлежит User
//Один user может иметь много тестов
User.hasMany(Test);
Test.belongsTo(User);

/////////////////////////Favorites////////////////////////////////////////
//В favorites может быть много Favorites_school
Favorites.hasMany(Favorites_school);
Favorites_school.belongsTo(Favorites);

/////////////////////////School////////////////////////////////////////
//В favorites_school - одна школа
School.hasOne(Favorites_school);
Favorites_school.belongsTo(School);
School.hasMany(Test);
Test.belongsTo(School);
School.hasMany(User);
User.belongsTo(School);

/////////////////////////Test////////////////////////////////////////
//В favorites_school - одна школа
Test.hasMany(Test_info, {as: 'info'});
Test_info.belongsTo(Test);

/////////////////////////Test_type////////////////////////////////////////
Test_type.hasMany(Test);
Test.belongsTo(Test_type);

//экспортируем модели, чтобы можно было изспользовать их в других файлах
module.exports = {
    User,
    Favorites,
    School,
    Favorites_school,
    Test,
    Test_info,
    Test_type
}