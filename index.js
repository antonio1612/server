const express = require('express');
const { response } = require('express');
var path = require('path');
var morgan = require('morgan')
//Permite que el servidor sirva archivos estaticos a los clientes ej: imagenes
var dir = path.join(__dirname, 'public');

//Coneccion a la base de datos
const db = require('./app/db/coneccion');

//Rutas de los request

var productoDestacado = require('./app/routes/producto_destacado');
var productoPromocion = require('./app/routes/producto_promocion');
var productoIndividual = require('./app/routes/producto_individual');


const app = express();
app.use(morgan('dev'));
app.use(express.static(dir));
app.use(require('body-parser').urlencoded({extended: true}));
app.use('/producto/destacado', productoDestacado);
app.use('/producto/promocion', productoPromocion);
app.use('/producto/individual', productoIndividual);
app.listen(3000,'127.0.0.1', ()=>console.log('Escuchando en el puerto 3000'));
app.use(express.json({limit: '1mb'}));




/*app.post('/api', (request, response)=>{
    console.log('Request entrante');
    console.log('Cuerpo del request');
    console.log('body: ' + request.body['0']);
    response.json({
        status : 'ok',
        datos : {"0":"hoola"}

    })

});*/










/*
db.any("SELECT * FROM PRODUCTO")
    .then(function (data) {
        consulta = {} ;
        //console.log("Tipo de variable:", data);
        var c = 0;
        data.forEach(element => {
            c++;
            consulta[c] = JSON.parse(JSON.stringify(element));
        });
        console.log(consulta);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });
*/


/*
app.post('/api', (request, response)=>{
    console.log('Request entrante');
    console.log(request.body);


    
    /*var entradaString = JSON.stringify(request.body);
    var entrada = JSON.parse(entradaString);
    var consulta = {}
    db.any("SELECT * FROM "+entrada['tabla'])
        .then(function (data) {
            //console.log("Tipo de variable:", data);
            var c = 0;
            data.forEach(element => {
                c++;
                consulta[c] = JSON.parse(JSON.stringify(element));
            });
            var respuesta = JSON.stringify(consulta)
            response.end(respuesta);
        })
        .catch(function (error) {
            console.log("ERROR:", error);
        });
    console.log('Resultado de la consulta luego del foreach '+consulta)

});
*/


