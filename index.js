const express = require('express');
const { response } = require('express');
var path = require('path');
var morgan = require('morgan');
const bodyParser = require('body-parser')

const bcrypt = require('bcrypt');
const jwt = require( 'jsonwebtoken');
//Permite que el servidor sirva archivos estaticos a los clientes ej: imagenes
var dir = path.join(__dirname, 'public');

//Coneccion a la base de datos
const db = require('./app/db/coneccion');

//Rutas de los request

var productoDestacado = require('./app/routes/producto_destacado');
var productoPromocion = require('./app/routes/producto_promocion');
var productoIndividual = require('./app/routes/producto_individual');
var categorias = require('./app/routes/categorias');
var categoriaProductos = require('./app/routes/categoria_productos');
var usuarioCrear = require('./app/routes/usuario_crear')
var pruebas = require('./app/routes/pruebas');
var usuarioLogin = require('./app/routes/usuario_login');
var authToken = require('./app/routes/auth_token');
var favoritoAnadir = require('./app/routes/favorito_anadir');
var auth = require('./app/routes/verificar_token');
var favoritos = require('./app/routes/favoritos');




const app = express();
app.use(morgan('dev'));
app.use(express.static(dir));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('body-parser').urlencoded({extended: true}));
app.use('/producto/destacado', productoDestacado);
app.use('/producto/promocion', productoPromocion);
app.use('/producto/individual', productoIndividual);
app.use('/categorias', categorias);
app.use('/categoria/productos', categoriaProductos);
app.use('/usuario/crear', usuarioCrear);
app.use('/usuario/login', usuarioLogin);
app.use('/pruebas', pruebas);
app.use('/auth/token', authToken);
app.use('/favorito/anadir', auth.verificarToken, favoritos.anadir);
app.use('/favoritos', auth.verificarToken, favoritos.pedirFavoritos);
app.use('/favorito/producto', favoritos.producto);
app.use('/favorito/quitar',auth.verificarToken, favoritos.quitar);



app.get('/prueba/token', (req, res)=>{
    hashpass = "$2b$08$9OLbB8ibxoPTGm0wz//Sc.sdHEKc5RET9t0Hx.LAITbJkT9PJDK3C"
    password = "169912";
    hasheada = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    var comparacion = bcrypt.compareSync(password, hashpass)
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIyLCJpYXQiOjE1OTk4ODMzNTB9.c-17dkyZVwzKRA3l9itqU4TB22oeG0dD_S2-gyAN-I8"
    jwt.verify(token, 'secretkey', (err, decoded)=>{
        if (err) {
            console.log('Invalido');    
          } 
        console.log(decoded.userId)
     });

})





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


