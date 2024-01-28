const State = require('../models/State');
const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');
const { validationResult, matchedData } = require('express-validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
module.exports = {
    getStates: async (req, res) => {
        try {
            let states = await State.find({});
            console.log("States found:", states);
            res.json({ states });
        } catch (error) {
            console.error("Error fetching states:", error);
            res.status(500).send("Ocorreu um erro ao buscar os estados.");
        }
    },


    info: async (req, res) => {
        let token = req.query.token;

        const user = await User.findOne({ token });
        const state = await State.findById(user.state);
        const ads = await Ad.find({ idUser: user._id.toString() });
        let adsList = [];
        for (let i in ads) {
            const cat = await Category.findById(ads[i].category);
            adsList.push({ ...ads[i], category: cat.slug });
        }
        res.json({
            name: user.name,
            email: user.email,
            state: state.name,
            ads: adsList
        });

    },
    editAction: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.json({error: errors.mapped()});
            return;
        }
        const data = matchedData(req);
        const user = await User.findOne({token: data.token});

        let updatedFields = {};
        if(data.name){
            updatedFields.name = data.name;
        }
        if(data.email){
            const emailCheck = await User.findOne({ email: data.email });
            if(emailCheck){
                res.json({error: 'E-mail já existe'});
                return;
            }
            updatedFields.email = data.email;
        }

        if(data.state){
            if(mongoose.Types.ObjectId.isValid(data.state)){

            const stateCheck = await State.findById(data.state);
            if(!stateCheck){
                res.json({error: 'Estado não existe'});
                return;
            }
            updatedFields.state = data.state;
        } else {
            res.json({error: 'Código de estado inválido'});
            return;
        }
        }

        if(data.password){
            updatedFields.passwordHash = await bcrypt.hash(data.password, 10);
        }

        await User.findOneAndUpdate({ token: data.token }, {
           $set: updatedFields
        });
        res.json({ token: req.query.token, name: req.body.name, email: req.body.email, state: req.body.state });
    },

};