require('dotenv').config()
const express = require('express');
let cors=require('cors')

//routes 
const Produits=require('./routes/api/produits')
const Users=require('./routes/api/users')
const Auth=require('./routes/api/authentification')

const app= express()

//connexion BDD
const connectDB=require('./db/conn')

app.use(express.json())
app.use(cors())

//Connect Database 
connectDB();


app.use('/api/produits',Produits)
app.use('/api/users',Users)
app.use('/api/auth',Auth)


app.listen(3001,()=>{
    console.log("Serveur à l'écoute")
})