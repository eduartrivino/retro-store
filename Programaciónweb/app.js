const nombreTienda = "Retro Arcade Kingdoom";
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
console.log("Nievo saldo en caja es: $" + saldoEnCaja);