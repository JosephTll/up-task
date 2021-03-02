const passport = require('passport');
const LocalStrategy = require('passport-local');

//Referencia al modelo donde vamos a autenticar
const Usuarios = require('../models/Usuarios');

//localStrategy - login con credenciales propias ( usuario y password)
passport.use(
    new LocalStrategy(
        //Por default passport espera un usuario y un password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: {
                        email,
                        activo: 1
                    }    
                })
                //El usuario existe, password incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null, false, {
                        message: 'Password incorrecto'
                    })
                }

                return done(null, usuario);
            } catch (error) {
                return done(null, false, {
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
)

//Serializar el usuario
passport.serializeUser((usuario, callback)=>{
    callback(null, usuario);
})

//deserializar el usuario
passport.deserializeUser((usuario, callback)=>{
    callback(null, usuario);
})

module.exports = passport;