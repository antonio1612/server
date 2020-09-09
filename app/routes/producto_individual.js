const express = require('express');
const router = express.Router();
express().use(express.json({limit: '1mb'}));

const db = require('../db/coneccion')
/*var comprobarPromocion = `SELECT CASE 
WHEN EXISTS (
    SELECT producto_promocion_estado 
    FROM producto_promocion 
    where now() >= producto_promocion_fecha_inicio 
    and  now() < producto_promocion_fecha_final
    and producto_promocion.producto_id = '2'
      LIMIT 1) 
      THEN true
ELSE false
END`*/

router.post('/', (request, res) =>{
    var consulta = {};
    var estado;
    var entradaString = JSON.stringify(request.body);
    var entrada = JSON.parse(entradaString);
    var id = entrada["0"];
    console.log('Request de producto individual');

    db.many(`SELECT CASE 
    WHEN EXISTS (
        SELECT producto_promocion_estado 
        FROM producto_promocion 
        where producto_promocion.producto_promocion_estado = true
        and producto_promocion.producto_id = '${id}'
          LIMIT 1) 
          THEN true
    ELSE false
    END AS "0" 
    FROM producto_promocion limit 1`).then((data)=>{
        //console.log("Tipo de variable:", data);
        var c = 0;
        data.forEach(element => {
            consulta[c] = JSON.parse(JSON.stringify(element));
            c++;
        });
        estado  = consulta['0']['0'];
        if (estado) {
            console.log('producto promocion');
            db.one(`select 
            producto.producto_id as "0", 
            producto.producto_nombre as "1",
            producto.producto_descripcion as "2",
            producto.producto_precio as "3",
            producto.producto_imagen_src as "4",
            producto_promocion.producto_promocion_porcentaje_descuento as "5",
            producto_promocion.producto_promocion_fecha_final as "6"
            from producto
            INNER join producto_promocion on producto_promocion.producto_id = producto.producto_id
            where producto.producto_id = '${id}' and  now() >= producto_promocion_fecha_inicio 
            and  now() < producto_promocion_fecha_final;`).then((datos)=>{
                consulta['1'] =  JSON.parse(JSON.stringify(datos));
                res.status(200).json(consulta);
            
            })

            
        }else{
            console.log('producto es normal')
            db.one(`select 
            producto.producto_id as "0", 
            producto.producto_nombre as "1",
            producto.producto_descripcion as "2",
            producto.producto_precio as "3",
            producto.producto_imagen_src as "4"
            from producto
            where producto.producto_id = '${id}';`).then((datos)=>{
                consulta['1'] =  JSON.parse(JSON.stringify(datos));
                res.status(200).json(consulta);
            
            })

        };

        //res.status(200).json(consulta);
        
    })
});

module.exports =router;



/**select
producto.producto_promocion_estado
from
producto
where producto.producto_id= 1*/