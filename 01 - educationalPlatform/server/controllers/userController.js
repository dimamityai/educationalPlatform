const {User, Favorites, Test, Test_info} = require('../models/models');
const ApiError = require('../error/ApiError');
//модуль для хэширования паролей, чтобы не хранить их в БД в открытом виде
const bcrypt = require('bcrypt');

//модуль для работы с jwt токеном
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role, schoolId) =>{
    //первый параметр - данные которые будут вшиваться в центруалбнуую часть jst токена (payload)
    //второй параметр - секркетный ключ
    //третий параметр - опций (важная опция - это сколько будет жить токен)
    return jwt.sign(
                    {id, email, role, schoolId},
                    process.env.SECRET_KEY,
                    {expiresIn: '24h'}
                    )
}

//class нужен, чтобы группировать функции, можно обойтись и без него
class UserController {
    async registration(req, res, next){
        const {email, password, name, surname, patronymic, country, city, gender, role, schoolId} = req.body;
        if (!email || !password){
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        //проверяем существует ли email в системе
        const candidate = await User.findOne({where : {email}})
        if (candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        //если пользовватель новый, то хэшируем его пароль
        //второй параметр сколько раз пароль хэшируется
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, name, surname, patronymic,country, city, gender, role, schoolId})
        //создаем для пользователя вкладку избранное
        const favorites = await Favorites.create({userId: user.id});
        //генерируем jason web token
        const token = generateJwt(user.id, user.email, user.role, user.schoolId)
        return res.json({token})
    }

    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}});
        if (!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        //bcrypt.compareSync сравнивает не захэшированный пароль с хэшированным
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role, user.schoolId)
        return res.json({token})
    }

    async check_auth(req, res, next){
        //при каждой проверки авторизации будем перезаписывать token, чтобы если jwt token украдут или узнают его, записать новый
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.schoolId);
        return res.json({token});
    }

    async getOne(req, res) {
        const {id} = req.params
        const user = await User.findOne(
            {
                where: {id},
            }
        )

        return res.json(user);
    }

    async delete(req, res){
        
    }
}

//результатам импортирования будет объект класса UserController
module.exports = new UserController();