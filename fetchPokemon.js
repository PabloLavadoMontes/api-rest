// DOM cargado
window.addEventListener("load", principal);

/**
 * Ejecuta las funciones del archivo una vez haya cargado el DOM
 */
function principal () {
    mostrarPokemon();
    document.getElementById("boton").addEventListener("click", obtenerValorLabel);
    getProducto();
}

/**
 * Obtiene el valor del label y lo añade a un párrafo
 */
function obtenerValorLabel () {
    const user = document.getElementById("user").value;
    document.getElementsByTagName("p")[0].textContent += user;
}

/**
 * Hace un llamado a la web "pokeapi" y obtiene el nombre de un pokemon mediante fetch
 */
function mostrarPokemon () {
    fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then(respuesta => respuesta.json())
    .then(respuesta => document.getElementsByTagName("p")[0].textContent += (respuesta.name.toUpperCase() + " y " + "su entrenador es "))
    .catch(error => console.warn(error))
}

/**
 * Hace un llamado a la web "pokeapi" y obtiene el nombre de un pokemon mediante fetch
 */
 function getProducto () {
    fetch("http://localhost:3000/api/product/", {
        method: "get",
        mode:"no-cors",
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=utf-8", "Access-Control-Allow-Origin": true},
    })
    .then(response => response.json())
    .then(response => console.log(response))
}