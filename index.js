const express = require("express");
const bodyParser = require("body-parser");
const mongoose  = require("mongoose");

const Product = require("./models/product.js");
const Usuario = require("./models/product.js");

const app = express();
const port = process.env.PORT || 3000;
const connectionString = "mongodb://localhost:27017/shop";

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get("/minombrees/:name", (peticion, respuesta) => {
    respuesta.send({message: `Hola ${peticion.params.name}`});
});


app.get("/api/product", (peticion, respuesta) => {
    Product.find({}, (error, productos) => {
        if (error) {
            return respuesta.status(500).send({mensaje: `Error al realizar la peticion ${error}`})
        }
        if (!productos) {
            return respuesta.status(404).send({mensaje: "No existen productos"})
        }
        respuesta.status(200).send({productos})
    })
    
});

app.get("/api/product/:productId", (peticion, respuesta) => {
    let productId = peticion.params.productId

    Product.findById(productId, (error, producto) => {
        if (error) {
            return respuesta.status(500).send({mensaje: `Error al realizar la peticion ${error}`})
        }
        if (!producto) {
            return respuesta.status(404).send({mensaje: `El producto no existe`})
        }
        respuesta.status(200).send({producto: producto})
    })
});

//Creando datos del ProductSchema
app.post("/api/product", (peticion, respuesta) => {
    console.log("POST /api/product")
    console.log(peticion.body)

    let product = new Product()
    product.nombre = peticion.body.name
    product.imagen = peticion.body.imagen
    product.precio = peticion.body.precio
    product.categoria = peticion.body.categoria
    product.descripcion = peticion.body.descripcion
   
    product.save((error, productStored) => {
        if (error) {
            respuesta.status(500).send({mensaje: `Error al guardar en la base de datos" ${error}`})
        }
        respuesta.status(200).send({producto: productStored})
    })
});

/* Usuario.find({})
    .then(resultado => {
        console.log(resultado);
        // mongoose.connection.close();
    })

//Creando datos de UsuarioSchema
const usuario = new Usuario ({
    nombreUsuario: "Pepito",
    contraseña: "eldelospalotesen69",
    edad: 31,
    email: "pepemolamasquepepe@hothotmail.org"
})


usuario.save()
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    }) */


app.put("/api/product/:productId", (peticion, respuesta) => {
    let productId = peticion.params.productId
    let update = peticion.body
    Product.updateOne({
        _id: productId
    }, {nombre: update.nombre})
    .then(()=> {
        respuesta.status(200).send({message: "El producto ha sido ACTUALIZADO correctamente"})
    })
/*      Product.updateOne(productId, update, async (error, productUpdated) => {
        if (error) {
            respuesta.status(500).send({message: "Error al actualizar el producto"})
        }
        await respuesta.status(200).send({product: productUpdated})
    })  */
});

app.delete("/api/product/:productId", (peticion, respuesta) => {
    let productId = peticion.params.productId

    Product.findById(productId, (error) => {
        if (error) {
            respuesta.status(500).send({message: "Error al eliminar el producto"})
        }
        Product.deleteOne({_id: productId}, (error) => {
            if(error) {
                respuesta.status(500).send({message: "Error al eliminar el producto"})
            }
            respuesta.status(200).send({message: "El producto ha sido eliminado correctamente"})
        })
    })
});


// Conexión a mongoDB
mongoose.connect(connectionString, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
}, (error, respuesta) => {
    if (error) { 
        console.log(`error al conectar a la base de datos ${error}`)
    }
    console.log("Conexión establecida con la base de datos");
    app.listen(port, () => {
        console.log(`API REST ejecutándose en http://localhost:${port}`);
    });
})


