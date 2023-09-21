const mongoose=require('mongoose')

const ProduitsShema= new mongoose.Schema({
    
    nom: {
        type:String
    },
    description: {
        type:String
    },
    quantite: {
        type:Number
    },
    categorie: {
        type:String
    },
    quantitePanier:{
        type:Number,
        default: 0
    },
    prix:{
        type:Number
    }
})

module.exports= Produits = mongoose.model('Produits',ProduitsShema,"Produits");