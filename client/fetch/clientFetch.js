const clientConfig = {
        method: "get",
        // mode:"no-cors",
        headers: {"Content-Type": "application/json; charset=utf-8;","Access-Control-Allow-Origin": "*"},
    }

function getSaludo() {
    console.log("get http://localhost:2800/");
    fetch("http://localhost:2800/", clientConfig ).then(response => {
        response.json()
            .then(response => console.log(response))
            .catch(() => {
            console.error("LA respuesta no se encuentra en formato json")
        })
    })
}

function getUsuarios() {
    console.log("get http://localhost:2800/usuarios");
    fetch("http://localhost:2800/usuarios", clientConfig ).then(response => {
        console.log(response);
        response.json()
            .then(response => console.log(response))
            .catch(() => {
            console.error("La respuesta no se encuentra en formato json")
        })
    })
}

// function getUsuarios() {
//     console.log("get http://localhost:2800/usuarios");
//     fetch("http://localhost:2800/usuarios", clientConfig)
//         .then(response =>response.text())
//         .then(response => {
//             console.log("repuesta en texto:"+response)
//             const bodyAsJson = JSON.parse(responseBodyAsText);
//             return bodyAsJson;        
//         }).then((response) => {
//             console.log("repuesta en json:"+response)
//         })
//             .catch(() => {
//             console.error("LA respuesta no se encuentra en formato json")
//         })
// }
