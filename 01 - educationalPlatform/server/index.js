require('dotenv').config();

const sequelize = require('./db');

const express = require('express');

const models = require('./models/models')

const cors = require('cors');

const filedUpload = require('express-fileupload');

const router = require('./routes/index')

const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

//запуск приложения
const app = express();

app.use(cors());

app.use(express.json());

app.use(filedUpload({}));

app.use('/api', router);

app.use(errorHandler);

const start = async () =>{
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server stared on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start();
