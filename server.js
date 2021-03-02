const express = require('express');
const routes = require('./routes/routes');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
require('dotenv').config({path: 'variables.env'});

//helpers
const {vardump} = require('./helpers/vardump');

//Crear la conexion a la base de datos
const db = require('./config/db');

//Importar el modelo 
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
.then(()=>console.log('Conectado al servidor'))
.catch(err=>console.log(err))

//Crear una app de express
const app = express();

//Habilitar body-parser para leer los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }))

//Donde cargar los archivos estaticos 
app.use(express.static('public'));

//Habilitar template engine
app.set('view engine', 'pug');

//Añadir la carpeta de las vistas
app.set('views', path.resolve(__dirname, './views'));

//Agregar flash messages
app.use(flash());

app.use(cookieParser());

//Sessiones nos permite navegar entre diferentes paginas sin volvernos a autenticar
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//Pasar el vardump a la aplicacion
app.use((req, res, next)=>{
    res.locals.vardump = vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
})


//Rutas para el home
app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, ()=>{
    console.log('Conectado al servidor');
})

require('./handlers/email');