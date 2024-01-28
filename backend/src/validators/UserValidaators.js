const { checkSchema } = require('express-validator');
const { signup, signin } = require('../controllers/AuthController');
module.exports ={
    editAction: checkSchema({
        token:{
            notEmpty: true
        },
        name:{
            optional: true,
            trim: true,
            isLength: {
                options: { min: 2}
            },
            errorMessage: 'Nome precisa ter pelo menos 2 caracteres'
        },
        email:{
            optional: true,

            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'E-mail inválido'
        },
        password:{
            optional: true,

            isLength:{
                options: { min: 6 }
            },
            errorMessage: 'Senha precisa ter no mínimo 6 caracteres'
        },
        state:{
            optional: true,

            notEmpty: true,
            errorMessage: 'Estado não preenchido'
        }
    }),


}