const ApiError = require('../error/ApiError');

//функция которая имортируется => middleware
//err - ошибка
//req - запрос
//res - результат
//next - функция для передачи управления следующему middleware
//!!! Это замыкающий middleware => функцию next не нужно вызывать, и при регистрации данный middleware ОБЯЗАТЕЛЬНО нужно указывать в конце
//так как на нем цепочка middleware замыкается и клиенту возвращается ответ
module.exports = function(err, req, res, next){
    //если класс ошибки ApiError
    if (err instanceof ApiError){
        //возвращаем клиенту статус, который получим из ошибки,
        //и с сообщением, которым содержится в err
        return res.status(err.status).json({message: err.message});
    }
    //если ошибка была не из класса ApiError
    return res.status(500).json({message: "Непредвиденная ошибка!"})
}