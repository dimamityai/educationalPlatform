//класс ApiError наследует Error
class ApiError extends Error{
    constructor(status, message){
        super(); //вызываем роджителскький коструктор
        this.status = status;
        this.message = message;
    }

    //статические функции можно вызывать без создания объекта
    static badRequest(message){
        return new ApiError(404, message)
    }

    static internal(message){
        return new ApiError(500, message)
    }

    //доступа нет
    static forbidden(message){
        return new ApiError(403, message)
    }
}

module.exports = ApiError;