const { checkSchema } = require('express-validator');
const { signup, signin } = require('../controllers/AuthController');
module.exports ={
    signin: checkSchema({

        email:{
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password:{
            isLength:{
                options: { min: 6 }
            },
            errorMessage: 'Senha precisa ter no mínimo 6 caracteres'
        }
    }),
    signup: checkSchema({
        name: {
            trim: true,
            isLength: {
                options: { min: 2}
            },
            errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
           },
           email:{
               isEmail: true,
               normalizeEmail: true,
               errorMessage: 'E-mail inválido'
           },
           password:{
               isLength:{
                   options: { min: 6 }
               },
               errorMessage: 'Senha precisa ter no mínimo 6 caracteres'
           },
           state:{
               notEmpty: true,
               errorMessage: 'Estado não preenchido'
           }
       }),

}