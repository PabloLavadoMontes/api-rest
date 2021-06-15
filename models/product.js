const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductoSchema = Schema({
    nombre: String,
    imagen: String,
    precio: Number,
    categoria: { type: String, enum: ["ordenadores", "moviles", "accesorios"]},
    descripcion: String
});


const UsuarioSchema = Schema({
    nombreUsuario: String,
    contraseña: String,
    edad: Number,
    email: String
})

module.exports = mongoose.model("Producto", ProductoSchema);
// module.exports = mongoose.model("Usuario", UsuarioSchema);