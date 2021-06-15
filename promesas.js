const mongoose = require("mongoose");

const connectionString = "mongodb://localhost:27017/promesas";

mongoose.connect(connectionString, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
})
.then(()=> console.log("CONECTADO A MONGODB"))
.catch((error)=> console.log("El error de conexión es: " + error))


const personaSchema = mongoose.Schema({
    nombre: String,
    edad: Number,
    estadoCivil: String,
    hijos: Boolean
}, {versionKey: false});

// Creando el Modelo Persona
const PersonaModel = mongoose.model("personas", personaSchema);


//Mostrar documentos
const mostrar = async ()=> {
    const personas = await PersonaModel.find()
    console.log(personas);
}
mostrar();


// Creando documentos
const crear = async ()=> {
    const persona = new PersonaModel({
        nombre: "Mario de la E",
        edad: 23,
        estadoCivil: "Casi Soltero",
        hijos: false
    })
    const resultado = await persona.save();
    console.log(resultado);
}
// crear();


// Editando documentos
const actualizar = async (id)=> {
    const persona = await PersonaModel.updateOne({_id: id},
    {
        $set: {
            nombre: "Mario ya no te casas"
        }
    })
}
actualizar("60b606f1d77ee733e038e0b5");

// Eliminando documentos
const eliminar = async (id)=> {
    const persona = await PersonaModel.deleteOne({_id: id})
    console.log(persona);
}
eliminar("60b606f1d77ee733e038e0b5");