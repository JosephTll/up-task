const nodemailer = require('nodemailer');
const juice = require('juice');
const pug = require('pug');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

let transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user, // generated ethereal user
      pass: emailConfig.pass, // generated ethereal password
    },
  });

//Generar html
const generarHtml = (archivo, opciones={})=>{
    const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`, opciones);
    return juice(html);
}

exports.enviar = async(opciones)=>{

    const html = generarHtml(opciones.archivo, opciones);

    let opcionesEmail = {
        from: 'Upstak <no-reply@upstak.com>', // sender address
        to: opciones.usuario.email, // list of receivers
        subject: opciones.subject, // Subject line
        text: 'Hola',
        html // html body
    };

    const enviarEmail = util.promisify(transporter.sendMail, transporter);
    return enviarEmail.call(transporter, opcionesEmail);
}