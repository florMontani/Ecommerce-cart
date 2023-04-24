//variables
const lista = document.querySelector('.row');
const contenedorCarrito = document.querySelector('.table-responsive tbody');
const carritoEntero = document.querySelector('table');
console.log(carritoEntero);
let articulos = [];

//functiones 
listeners();


function listeners(){
//funcion para agregar carrito
lista.addEventListener('click', agregarArticulo);
//elimina articulos del carrito
carritoEntero.addEventListener('click',eliminarProducto);


}

//funcion agregar producto al carrito
function agregarArticulo(e){
e.preventDefault();
if(e.target.classList.contains('add-to-cart')){
 const divconeendor = e.target.parentElement;
 console.log(divconeendor);
 LeerProductos(divconeendor);
}
}

//lee los articulos
function LeerProductos(art){
    //creo el obj que levanta los datosdel div contenedor de articulos
    let articulosObjeto = {
        producto: art.querySelector('H3').textContent,
        descripcion: art.querySelector('.descript').textContent,
        precio: art.querySelector('.descript').nextElementSibling.textContent,
        id: art.querySelector('[data-id]').textContent,
        cantidad: 1
    }

    //revisa si ya existe
    if(articulos.some(articulo => articulo.id === articulosObjeto.id)){
       const articulosDupli =  articulos.map(art =>{
        if(art.id === articulosObjeto.id){
            art.cantidad++;
            return art;
        }else{
            return art;
        }
    })
    articulos = [...articulosDupli]

        }else{
            articulos = [...articulos, articulosObjeto ]

        }
        console.log(articulos);
        MuestraArtHTML();
    }

    //elimina articulos del carrito
    // function eliminarProducto(e){
    //      e.preventDefault();
    //      console.log(e.target.classList);
    //     if(e.target.classList.contains('borrar')){
    //     //   const prodid =  e.target.getAttribute('data-id');
    //     //   //elimina del arreglo
    //     //   articulos = articulos.filter(articulo => articulo.id !== prodid);
    //     //   console.log(articulos);

    //     //   MuestraArtHTML();
    //     }

        
       
    //  }
    function eliminarProducto(e){
        e.preventDefault();
        console.log(e.target.classList);
        if(e.target.classList.contains('borrar')){
          const prodid =  e.target.getAttribute('data-id');
          // busca el índice del primer elemento con el mismo id
          const index = articulos.findIndex(articulo => articulo.id === prodid);
          console.log("index", index);
          if (index !== -1) {
            if (articulos[index].cantidad > 1) {
              // si la cantidad es mayor a 1, reducir en 1 la cantidad
              console.log("articulos[index].cantidad: ", articulos[index].cantidad);
              console.log("articulos[index]: ", articulos[index]);
              articulos[index].cantidad--;
            } else {
              // si la cantidad es menor o igual a 1, eliminar el producto del array

              articulos.splice(index, 1);
            }
            console.log(articulos);
            MuestraArtHTML();
          }
        }
      }


  



    //agrega elementos a articulos



//muestra el carrito de compras en el html
function MuestraArtHTML(){
    limpiaHTML();
articulos.forEach(art => {
    const tbody = document.createElement('tr');
        tbody.innerHTML = `
        <td>"${art.producto}"</td>
        <td>"${art.precio}"</td>
        <td>"${art.cantidad}"</td>
        <td><a href="#" class="borrar" data-id="${art.id}">X</a></td>
    `;
    contenedorCarrito.appendChild(tbody);

});
}

//limpiar el html porque si yo apreto el curso 1 se pushea y si apreto el 2 luego, se va a pushear 1 y 2 y el resultado sería 1,1,2 
function limpiaHTML(){

    // contenedorCarrito.innerHTML=" " 
    while(contenedorCarrito.firstChild){
//si tiene al menos un elemento
contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}