const expres = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookie = require('cookie-parser');
const app = expres()

app.use(expres.urlencoded({extends:false}))
app.use(expres.json())

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));

dotenv.config({path: './.env'})

app.use(cookie())

app.use('/', require('./routes/auth'))

app.listen(5000, (req, res)=>{
    console.log('Servidor corriendo en el puerto 5000')
})