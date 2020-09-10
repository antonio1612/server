const express = require('express');
const router = express.Router();
express().use(express.json({limit: '1mb'}));

const db = require('../db/coneccion')
var query = 
    `
    select categoria.categoria_id as "0",
    categoria.categoria_tipo as "1" from categoria;
    `
router.get('/', (request, res) =>{
    consulta = {}
    console.log('Request de categorias')
    db.many(query).then((data)=>{
        console.log(JSON.parse(JSON.stringify(data)));
        //console.log("Tipo de variable:", data);
        var c = 0;
        data.forEach(element => {
            consulta[c] = JSON.parse(JSON.stringify(element));
            c++;
        });
        
        res.status(200).json(consulta);

        
    })
});

module.exports =router;