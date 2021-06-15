const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/usuarios";

// Conectando con la base de datos
/* mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=> {
    console.log("Cooooonectado con MONGODB!!");
})
.catch((error)=> {
    console.log("Existe un ERROR:" + error);
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

// Crear usuario
try {
    const createUser = async()=> {
        const user = new UserModel({
            name: "Pepe",
            password: "KontraseñaImposibleDeHackiar12345",
            email: "soypepeelpepe@hotpepe.com",
            age: 31,
        })  
        const result = await user.save();
        console.log(result);
    }
    // createUser();
} catch (error) {
    console.log("CREANDO un usuario existe el siguiente error:" + error);
}

// Editar un documento
try {
    const updateUser = async(id)=> {
        await UserModel.updateOne({_id: id},
        {
            $set: {
                name: "Pepiiito",
                age: 69
            }
        })
    }
    // updateUser("60ba5559cf729c2da0d1aea9");
} catch (error) {
    console.log("EDITANDO un documento existe el siguiente error:" + error);
}

// Eliminar 1 documento
try {
    const deleteUser = async(id)=> {
        const result = await UserModel.deleteOne({_id: id})
        console.log(result);
        console.log("Usuario con id:" + id + " ELIMINADO");
    }
    // deleteUser("");
}
catch (error) {
    console.log("ELIMINANDO un documento existe el siguiente error:" + error);
}

// Eliminar varios documentos
try {
    const deleteUsers = async()=> {
        const result = await UserModel.deleteMany({
            name: "Pepe"
        }, ()=> {})
        console.log(result);
        console.log("Usuarios con la propiedad: name: 'Pepe' ELIMINADOS");
    }
    // deleteUsers();
}
catch (error) {
    console.log("ELIMINANDO un documento existe el siguiente error:" + error);
} */
/* const mostrar = async()=> {
    return resultado = await UserModel.find({});
}
mostrar()
.then((value)=> console.log(value))
 */
// Mostrar los documentos de la base de datos
/* try {
    const showUsers = async()=> {
        return await UserModel.find()
    }
    showUsers()
    .then((result)=> console.log(result));
} catch (error) {
    console.log("MOSTRANDO un documento existe el siguiente error:" + error);
}
 */
