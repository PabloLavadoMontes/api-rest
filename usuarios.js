const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { default: fetch } = require("node-fetch");
const connectionString = "mongodb://localhost:27017/users";
const app = express();
const port = process.env.PORT || 2800;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


//* Creando el servidor en el puerto 2800
app.listen(port, ()=> {
    console.log(`API REST ejecutándose en http://localhost:${port}`);
})

// Conectando con la base de datos
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(()=> {
    console.log("Cooooonectado con MONGODB!!");
})
.catch((error)=> {
    console.log("Existe el siguiente ERROR: " + error);
})

// Creando el schema de usuario
const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    age: Number,
});

// Creando el modelo de usuario
const UserModel = mongoose.model("Users", userSchema);


// Enviando un h1 al body de la respuesta
app.get("/", (peticion, respuesta) => {
    respuesta.status(200).send("<h1>Jaloudaaaa</h1>");
});

//* Creando un usuario
app.post("/usuarios", (peticion, respuesta)=> {
    const user = new UserModel({
        name: peticion.body.name,
        password: peticion.body.password,
        email: peticion.body.email,
        age: peticion.body.age,
    })
    user.save()
    .then(()=> respuesta.status(200).send(user));
});

//* Editando un usuario
app.put("/usuarios/:id", (peticion, respuesta)=> {
    const id = peticion.params.id;
    const newDates = peticion.body;
    UserModel.findByIdAndUpdate(id, newDates, (error) => {
    if (error) {
        respuesta.status(500).send({mensaje: "Ha ocurrido un error realizando la ACTUALIZACIÓN del producto con id: " + id});;
    }
    respuesta.status(200).send({mensaje: "usuario con id: " + id + " , ACTUALIZADO"});    
    })
    .then((resultado)=>console.log(resultado));
});

//* Eliminando un usuario
app.delete("/usuarios/:id", (peticion, respuesta)=> {
    const id = peticion.params.id;
    UserModel.findByIdAndDelete({_id: id}, (error) => {
        if (error) {
            respuesta.status(500).send({mensaje: "Ha ocurrido un error realizando la ELIMINACIÓN del usuario con id: " + id});;
        }
        respuesta.status(200).send({mensaje: "usuario con id: " + id + " , ELIMINADO"});
    })
    .then((resultado)=>console.log(resultado));
});

/* //* Mostrando los usuarios 
app.get("/usuarios", (peticion, respuesta)=> {
    UserModel.find({}, (error, usuarios)=> {
        if (error) {
            respuesta.status(500).send({mensaje: "Ha ocurrido un error MOSTRANDO los usuarios"});
        }
        respuesta.status(200).send({usuarios})
    })
    .then((resultado)=>console.log(resultado));
}); */


//* FETCH
fetch("http://localhost:2800/")
.then(respuesta => respuesta.text())
.then(data => console.log("Los datos de esta web son: " + data))
.catch(error => console.warn("Existe en siguiente error: " + error))
