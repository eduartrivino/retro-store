/* const nombreTienda = "Retro Arcade Kingdoom";
let saldoEnCaja = 500.0;

console.log("=== Bienvenido A:",nombreTienda, "===");
console.log("Caja inicial: $" + saldoEnCaja);

const inventario = [
    { id: 1, titulo: "Super mario Bros 3", consola: "NES", precio: 45.0, stock: 5},
    { id: 2, titulo: "The Lengend of Zelda", consola: "NES", precio: 60.0, stock: 2},
    { id: 3, titulo: "Chrono Trigger", consola: "SNES", precio: 120.0, stock: 1},
    { id: 4, titulo: "Sonic The Hedgehog", consola: "Sega Genesis", precio: 30.0, stock: 8}
    
];

console.log("Total de titulos registrados",inventario.length);

function mostrarCatalogo(){
    console.log("*********************************");
    console.log("--- CATALOGO DE VIDEOJUEGOS----");
    
    for(let i=0; i<inventario.length; i++){
        console.log(
            inventario[i].id + " ." +
            inventario[i].titulo +
            inventario[i].consola + "- $" +
            inventario[i].precio +
            "| Sctock:" + inventario[i].stock

        );
    }
}

mostrarCatalogo();

function VenderJuego (idBusqueda){
    for(let i =0; i<inventario.length; i++){

        if(inventario[i].id == idBusqueda){
            inventario[i].stock--;
            saldoEnCaja += inventario[i].precio;
            console.log("*** ¡Venta Existosa!***" + inventario[i].titulo + "!"); 
        }else{
            console.log("AGOTADO, no hay sctok del juego" + inventario[i].titulo);
        }
    }

}

VenderJuego(3);
console.log("Nievo saldo en caja es: $" + saldoEnCaja); */


//Datos iniciales con imagenes
const inventario =[
    {
        id: 1,
        titulo: "Super Mario Bross 3",
        consola: "NES",
        precio: 45.0,
        stock: 5,
        imagen: "https://upload.wikimedia.org/wikipedia/en/a/a5/Super_Mario_Bros._3_coverart.png"
    },
    {
        id: 2,
        titulo: "The Legend Zelda",
        consola: "NES",
        precio: 60.0,
        stock: 2,
        imagen: "https://thumb.wikimedia.org/wikipedia/en/thumb/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg/250px-The_Legend_of_Zelda_Breath_of_the_Wild.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"
    },
    {
        id: 3,
        titulo: "Chrono Trigger",
        consola: "SNES",
        precio: 120.0,
        stock: 1,
        imagen: "https://upload.wikimedia.org/wikipedia/en/a/a7/Chrono_Trigger_SNES_US_cover.png"
    },
    {
        id: 4,
        titulo: "Sonic the hedgehog",
        consola: "Sega Genesis",
        precio: 30.0,
        stock: 8,
        imagen: "https://upload.wikimedia.org/wikipedia/en/b/ba/Sonic_the_Hedgehog_1_Genesis_box_art.jpg"
    }
];

let saldoEnCaja=500.0;

const contenedor = document.getElementById("contenedor-juegos");
const inputBuscar = document.getElementById("input-buscar");
const textoCaja = document.getElementById("texto-caja");


//Dibujarcatalogo
function renderizarCatalogo(lista) {
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = `<p class="text-center text-muted fs-5">No se encontraron videojuegos en la búsqueda.</p>`;
        return;
    }

    for (let i = 0; i < lista.length; i++) {
        const juego = lista[i];

        contenedor.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="card bg-secondary text-white h-100 shadow border-0">
                    <!-- Portada del videojuego -->
                    <img src="${juego.imagen}" class="card-img-top p-2 bg-dark" alt="${juego.titulo}" style="height: 220px; object-fit: contain;">
                    
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${juego.titulo}</h5>
                        <span class="badge bg-info text-dark mb-2 w-auto align-self-start">${juego.consola}</span>
                        <p class="card-text mb-1 fs-5">Precio: <strong>$${juego.precio.toFixed(2)}</strong></p>
                        <p class="card-text text-light">Stock: <strong>${juego.stock}</strong> unidades</p>
                        
                        <button class="btn btn-primary mt-auto fw-bold" onclick="comprarJuego(${juego.id})">
                            🛒 Comprar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}



function comprarJuego(idJuego) {
    for (let i = 0; i < inventario.length; i++) {
        if (inventario[i].id === idJuego) {
            if (inventario[i].stock > 0) {
                inventario[i].stock--; 
                saldoEnCaja += inventario[i].precio; 
                textoCaja.textContent = `Caja: $${saldoEnCaja.toFixed(2)}`;
                
                renderizarCatalogo(inventario);
            } else {
                alert("¡Agotado! No quedan unidades disponibles de " + inventario[i].titulo);
            }
        }
    }
}


//Buscador en tiempo  real
inputBuscar.addEventListener("input", function() {
    const textoIngresado = inputBuscar.value.toLowerCase();
    
    const resultados = inventario.filter(function(juego) {
        return juego.titulo.toLowerCase().includes(textoIngresado);
    });

    renderizarCatalogo(resultados);
});

//Consumo de apis externas

async function cargarEdicionesPokemon() {
    console.log("Conectando con la PokéAPI...");

    try {
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=4");
        

        const datos = await respuesta.json();
        for (let i = 0; i < datos.results.length; i++) {
            const pokemon = datos.results[i];
            const idPokemon = i + 1;
            const nombreFormateado = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

            const nuevoJuego = {
                id: inventario.length + 1,
                titulo: "Pokémon Edición " + nombreFormateado,
                consola: "Figurita de pokemon",
                precio: 55.0,
                stock: 3,
                imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png`
            };

            inventario.push(nuevoJuego);
        }


        renderizarCatalogo(inventario);
        alert("Se importaron 4 juegos de Pokémon desde la PokéAPI externa");

    } catch (error) {
        console.error("Error al conectar con la API:", error);
        alert("Hubo un error al intentar consumir la API externa.");
    }
}

renderizarCatalogo(inventario);