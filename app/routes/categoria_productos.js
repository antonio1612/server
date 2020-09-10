const express = require('express');
const router = express.Router();
express().use(express.json({limit: '1mb'}));

const db = require('../db/coneccion')
var query = 
    `
    select categoria.categoria_id as "0",
    categoria.categoria_tipo as "1" from categoria;
    `
router.post('/', (request, res) =>{
    consulta = {}
    var entradaString = JSON.stringify(request.body);
    var entrada = JSON.parse(entradaString);
    idCategoria = entrada["0"];
    console.log('Request de productos de una categoria')
    db.many(`select
    categoria.categoria_tipo as "0" 
    from categoria 
    where categoria.categoria_id = '${idCategoria}';`).then((data)=>{
        
        //console.log("Tipo de variable:", data);
        var c = 0;
        data.forEach(element => {
            consulta[c] = JSON.parse(JSON.stringify(element));
            c++;
        });
        
        
        db.many(`select 
        producto.producto_id as "0", 
        producto.producto_nombre as "1" 
        from producto 
        where producto.categoria_id  = '${idCategoria}';`).then((productos)=>{
            consulta[c] = JSON.parse(JSON.stringify(productos));
            res.status(200).json(consulta);
        })

        //res.status(200).json(consulta);
        
    })
});

module.exports =router;