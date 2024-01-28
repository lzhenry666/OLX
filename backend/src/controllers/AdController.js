const Category = require('../models/Category');
const User = require('../models/User');
const Ad = require('../models/Ad');
const State = require('../models/State');
const uuid = require('uuid');
const jimp = require('jimp');
const addImage = async (buffer) => {
    let newName = `${uuid.v4()}.jpg`;
    let tmpImg = await jimp.read(buffer);
    tmpImg.cover(500, 500).quality(80).write(`./public/assets/images/${newName}`);
    return newName;
}
module.exports = {
    getCategories: async (req, res) => {
        let cats = await Category.find();
        let categories = [];

        for (let i in cats) {
            categories.push({
                ...cats[i]._doc,
                img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
            });
        }

        res.json({ categories });
    },
    addAction: async (req, res) => {
        let { title, price, priceneg, desc, cat, token } = req.body;
        const user =  await User.findOne({token}).exec();
        if(!title || !cat){
            res.json({error: 'Título e/ou categoria não preenchidos'});
            return;
        }
        const newAd = new Ad();
        newAd.status = true;
        newAd.idUser = user._id;
        newAd.state = user.state;
        newAd.dateCreated = new Date();
        newAd.title = title;
        newAd.category = cat;
        newAd.views = 0;
        newAd.priceNegotiable = (priceneg == 'true') ? true : false;
        newAd.description = desc;
        if(req.files && req.files.img){
            if(req.files.img.length == undefined){
                if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img.mimetype)){
            let url = await addImage(req.files.img.data);
            newAd.images.push({
                url,
                default: false
            });
        }
        }else{
            for(let i=0; i<req.files.img.length; i++){
                if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img[i].mimetype)){

                let url = await addImage(req.files.img[i].data);
                newAd.images.push({
                    url,
                    default: false
                });
            }
            }
        }
        }
        if(newAd.images.length > 0){
            newAd.images[0].default = true;
        }

        if(price){
            price = price.replace('.', '').replace(',', '.').replace('R$', '');
            price = parseFloat(price);
            newAd.price = price;
        }
        if(priceneg){
            newAd.priceNegotiable = true;
        }else{
            newAd.priceNegotiable = false;
        }
        /* if(desc){
            newAd.description = desc;
        }
        if(cat){
            const category = await Category.findOne({name: cat}).exec();
            newAd.category = category._id;
        }else
        {
            res.json({error: 'Categoria não existe'});
        } */

        await newAd.save();
        res.json({id: newAd._id});

    },
    getList: async (req, res) => {
        let { sort = 'asc', offset = 0, limit = 8, q, cat, state } = req.query;
        let filters = {status: true};
        if(q){
            filters.title = {$regex: q, $options: 'i'};
        }
        if(cat){
            const c = await Category.findOne({slug: cat}).exec();
            if(c){
                filters.category = c._id.toString();
            }
        }
        if(state){
            const s = await State.findOne({name: state.toUpperCase()}).exec();

            if(s){
            filters.state = s._id.toString();
            }
        }
        const adsTotal = await Ad.find(filters).exec();
        const total = adsTotal.length;
        const adsData = await  Ad.find(filters)
        .sort({dateCreated: (sort == 'desc' ? -1 : 1)})
        .skip(parseInt(offset))
        .limit(parseInt(limit))
        .exec();
        let ads  =[]

        for(let i in adsData){
            let image;
            let defaultImg = adsData[i].images.find(e=>e.default);
            if(defaultImg){
                image = `${process.env.BASE}/assets/images/${defaultImg.url}`;
            }
            else{
                image = `${process.env.BASE}/assets/images/default.jpg`;
            }

            ads.push({
                id: adsData[i]._id,
                title: adsData[i].title,
                price: adsData[i].price,
                priceNegotiable: adsData[i].priceNegotiable,
                image
            });
        }
        res.json({ads,total});
    },
    getItem: async (req, res) => {
        let { id, other = null } = req.params; // Mudança aqui

        if(!id){
            return res.json({error: 'Sem produto'});
        }

        if(id.length < 12){ // Essa verificação pode não ser necessária dependendo do formato do ID
            return res.json({error: 'Produto inválido'});
        }

        const ad = await Ad.findById(id);
        if(!ad){
            return res.json({error: 'Produto não existe'});
        }

        ad.views++;
        await ad.save();

        let images = ad.images.map(image => `${process.env.BASE}/assets/images/${image.url}`);

        let category = await Category.findById(ad.category).exec();
        let userInfo = await User.findById(ad.idUser).exec();
        let stateInfo = await State.findById(ad.state).exec();
        let others = [];

          const otherData = await Ad.find({status: "true", idUser: ad.idUser}).exec();

          for (const item of otherData) {
            if (item._id.toString() !== ad._id.toString()) {

              let image = `${process.env.BASE}/assets/images/default.jpg`;

              let defaultImg = item.images.find(e => e.default);

              if (defaultImg) {
                image = `${process.env.BASE}/assets/images/${defaultImg.url}`;
              }

              others.push({
                id: item._id,
                title: item.title,
                price: item.price,
                priceNegotiable: item.priceNegotiable,
                image
              })
            }
          }



        res.json({
            id: ad._id,
            title: ad.title,
            price: ad.price,
            priceNegotiable: ad.priceNegotiable,
            description: ad.description,
            dateCreated: ad.dateCreated,
            views: ad.views,
            images,
            category,
            userInfo: {
                name: userInfo.name,
                email: userInfo.email
            },
            stateName: stateInfo.name,
            others

        });
    },
       editAction: async (req, res) => {
        let { id } = req.params;
        let { title, status, price, priceneg, desc, cat, token, images } = req.body;
        if(!id){
            return res.json({error: 'Sem produto'});
        }

        const ad = await Ad.findById(id).exec();
        if(!ad){
            return res.json({error: 'Produto não existe'});
        }

        const user = await User.findOne({token}).exec();
        if(user._id.toString() !== ad.idUser){
            return res.json({error: 'Você não tem permissão para editar este anúncio'});
        }

        let updates = {};
        if(title){
            updates.title = title;
        }
        if(status){
            updates.status = status;
        }
        if(price){
            price = price.replace('.', '').replace(',', '.').replace('R$', '');
            price = parseFloat(price);
            updates.price = price;
        }
        if(priceneg){
            updates.priceNegotiable = priceneg;
        }
        if(desc){
            updates.description = desc;
        }
        if(cat){
            const category = await Category.findOne({slug: cat}).exec();
            if(category){
                updates.category = category._id.toString();
            }
        }
        if(images){
            updates.images = images;

        }
        await Ad.findByIdAndUpdate(id, {$set: updates});

        if(req.files && req.files.img) {
            const adI = await Ad.findById(id);

            if(req.files.img.length == undefined) {
                if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img.mimetype)) {
                    let url = await addImage(req.files.img.data);
                    adI.images.push({
                        url,
                        default: false
                    });
                }
            } else {
                for(let i=0; i < req.files.img.length; i++) {
                    if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img[i].mimetype)) {
                        let url = await addImage(req.files.img[i].data);
                        adI.images.push({
                            url,
                            default: false
                        });
                    }
                }
            }

            adI.images = [...adI.images];
            await adI.save();
        }



        res.json({status: 'Registro alterado com sucesso'});

    },
};