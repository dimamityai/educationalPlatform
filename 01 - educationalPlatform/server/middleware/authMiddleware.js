const jwt = require('jsonwebtoken');

//проверка на валидность jst Токена | авторизован пользователь или нет
module.exports = function (req, res, next){
    if (req.method === "OPTIONS"){
        next()
    }
    try{
        //достаем из headers информацию
        //split нужен чтобы достать сам токен, потому что обычно сначал пишется тип токена а затем сам токен
        //В нашем случае токен выглядеть будет например так Bearer asdadasdas
        const token = req.headers.authorization.split(' ')[1];
        if (!token){
            return res.status(401).json({message: "Не авторизован"})
        }
        //Если токен есть то нужно его раскодировать
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded
        next();
    }catch (e){
        res.status(401).json({message: "Не авторизован"})
    }
} 