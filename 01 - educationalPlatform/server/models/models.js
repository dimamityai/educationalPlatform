//в данном файле будут описаны модели данных базы данных

//импортируем файл sequelize, который создан в db.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    patronymic: {type: DataTypes.STRING},
    gender: {type: DataTypes.STRING},
    country: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

//Модель - информация о тесте(его содержимое)
const User_test_result = sequelize.define('user_test_result', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    result: {type: DataTypes.INTEGER, allowNull: false},
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
//Один user может иметь много пройденных тестов
User.hasMany(User_test_result,{as: 'user_test_info'});
User_test_result.belongsTo(User);

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
//Один test может содержать как пройденный у множество пользователей
Test.hasMany(User_test_result);
User_test_result.belongsTo(Test);
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
    Test_type,
    User_test_result,
}