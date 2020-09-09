const express = require('express');
const router = express.Router();
express().use(express.json({limit: '1mb'}));

const db = require('../db/coneccion')
var query = 
    `
    SELECT PRODUCTO.PRODUCTO_NOMBRE AS "0",
    PRODUCTO.PRODUCTO_IMAGEN_SRC AS "1",
    PRODUCTO.PRODUCTO_ID AS "2" 
    FROM PRODUCTO WHERE PRODUCTO.PRODUCTO_DESTACADO = TRUE;
    `
router.get('/', (request, res) =>{
    consulta = {}
    console.log('Request de productos destacados')
    db.many(query).then((data)=>{
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