const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3500;


// Conexión con el servidor
app.listen(port, () => {
    console.log("Este servidor está en el puerto " + port);
})

// Mandando un JSON al servidor para que lo muestre en el body de la respuesta
app.get("/", (peticion, respuesta) => {
    respuesta.send("Si buscas bien, verás unos cuantos gatos A continuación, verás unos cuantos gatitos");
})

// Conexión con la base de datos mongoDB
mongoose.connect("mongodb://localhost:27017/gatitos", 
    {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    }
);

// Comprobando si hay un error al conectarse con mongoDB
mongoose.connection.on("error", console.error.bind(console, "connection error:"));
mongoose.connection.once("open", () => {
    console.log("Estamos conectadossss");
});

// Creando un Schema de un gato
const gatitoSchema = new mongoose.Schema ({
    nombre: String,
    patitas: Number,
    dueños: Boolean,
    sexo: String
});

// Creando el modelo de "gatitoSchema"
const Gatito = mongoose.model("Gatito", gatitoSchema);

// Creando gatitos a partir del modelo "Gatito"
const Ámbar = new Gatito({
    nombre: "Ámbar",
    patitas: 4,
    dueños: true,
    sexo: "hembra"
});
const Simba = new Gatito({
    nombre: "Simba",
    patitas: 4,
    dueños: true,
    sexo: "macho"
});
const Mía = new Gatito({
    nombre: "Mía",
    patitas: 4,
    dueños: true,
    sexo: "hembra"
});
const Tito = new Gatito({
    nombre: "Tito",
    patitas: 4,
    dueños: true,
    sexo: "macho"
})


// Guardando todos los gatitos en la base de datos
Ámbar.save((error, Ámbar) => {
    if (error) {
        console.log(error);
    }
})
Simba.save((error, Simba) => {
    if (error) {
        console.log(error);
    }
})
Mía.save((error, Mía) => {
    if (error) {
        console.log(error);
    }
})

// Borrando todos los documentos repetidos del modelo Gatito que cumplen la condición
Gatito.deleteMany({patitas: 4}, () => {});

// Obteniendo todos los gatitos guardados en la base de datos
app.get("/gatitos", (peticion, respuesta) => {
        Gatito.find({}, (error, gatitos) => {
            if (error) {
                return respuesta.status(500).send({mensaje: `Error al realizar la peticion ${error}`})
            }
            if (!gatitos) {
                return respuesta.status(404).send({mensaje: "No existen productos"})
            }
            respuesta.status(200).send({gatitos})
        })
})



