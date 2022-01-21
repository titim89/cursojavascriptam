//Variables
const miLocalStorage = window.localStorage;
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let sidebar = document.querySelector(".listaCarrito");
let productos = [];
//Creacion de cards

$.ajax({
  url: "../data/data.json",
  dataType: "json",
  success: (respuesta) => {
    cargarProductos(respuesta);
  },
});
const cargarProductos = (respuesta) => {
  productos = respuesta;
  productos.forEach((producto) => {
    $("#cardProductos").append(`<div class="card col pb-2">
                                    <div class="card h-100">                    
                                        <div class="card-body">
                                          <img src="${producto.imagen}" class="card-img-top" alt="...">
                                          <h5 class="card-title">${producto.nombre}</h5>
                                          <p class="infoProducto">${producto.info}</p>
                                          <p class="infoProducto">$<span>${producto.precio}</span></p>
                                          <button class="btnComprar" data-id=${producto.id}>Comprar</button>  
                                        </div>
                                    </div>
                                </div>
        `);
  });
  $(".btnComprar").on("click", function agregarProducto(e) {
    enviarAlCarrito(e.target.parentElement);
    $(".sidebar").show();
  });
};

//Lee el contenido de la card y extrae la info del producto


const enviarAlCarrito = (card) => {
  let productoAlCarrito = {
    imagen: card.querySelector("img").src,
    nombre: card.querySelector("h5").textContent,
    precioPorUnidad: Number(card.querySelector("p span").textContent),
    precioTotal: Number(card.querySelector("p span").textContent),
    id: card.querySelector("button").getAttribute("data-id"),
    cantidad: 1,
    

  };
  
  //Revisa si un elemento existe en el carrito
  let existeProducto = carrito.some(
    (element) => element.id === productoAlCarrito.id
  );
  if (existeProducto) {
    carrito = carrito.map((element) => {
      
      if (element.id === productoAlCarrito.id) {
        element.cantidad++;
        element.precioTotal = element.precioPorUnidad * element.cantidad;
        return element;
      } else {
        return element;
      }
    });
  } else {
    carrito.push(productoAlCarrito);
  }
  nuevoProductoAlCarrito();
  guardarCarritoEnLocalStorage();
};

//Recorrer el carrito y genera el HTML
const nuevoProductoAlCarrito = () => {
  sidebar.innerHTML = "";
  carrito.forEach((element) => {
    sidebar.innerHTML += `<div>
                                <img class="imagenCarrito" src="${element.imagen}" />
                                <p>${element.nombre} - $<span>${element.precioPorUnidad}</span> | Cantidad: ${element.cantidad}</p>
                                <button class="btnRestar btnCarrito" data-id=${element.id}> - </button>
                                <button class="btnSumar btnCarrito" data-id=${element.id}> + </button>
                                <button class="btnBorrar btnCarrito" data-id=${element.id}> BORRAR </button>
                                <hr>
                            </div>`;
  });
  totalDeCarrito();
};
//Restar producto
const restarProducto = (e) => {
  let idProducto = Number(e.target.getAttribute("data-id"));
  carrito = carrito.map((element) => {
    if (element.id == idProducto) {
      element.cantidad--;
      element.precioTotal = element.precioTotal - element.precioPorUnidad;
      if (element.cantidad === 0) {
        element.cantidad = 1;
        element.precioTotal = element.precioPorUnidad;
      }
      return element;
    } else {
      return element;
    }
  });
  nuevoProductoAlCarrito();
  totalDeCarrito();
};
//Sumar producto en el carrito
const sumarProducto = (e) => {
  let idProducto = Number(e.target.getAttribute("data-id"));
  carrito = carrito.map((element) => {
    if (element.id == idProducto) {
      element.cantidad++;
      element.precioTotal = element.precioTotal + element.precioPorUnidad;
      if (element.cantidad === 0) {
        element.cantidad = 1;
        element.precioTotal = element.precioPorUnidad;
      }
      return element;
    } else {
      return element;
    }
  });
  nuevoProductoAlCarrito();
  totalDeCarrito();
};
//Borrar producto del carrito
const borrarProducto = (e) => {
  let idProducto = Number(e.target.getAttribute("data-id"));
  carrito = carrito.filter((element) => element.id != idProducto);
  nuevoProductoAlCarrito();
  totalDeCarrito();
};

// Vaciar Carrito

const vaciarCarrito = () => {
  carrito = []; //Resetea el array
  sidebar.innerHTML = "";
  guardarCarritoEnLocalStorage();
  totalDeCarrito();     
}

//Evento click para restar, sumar y restar
sidebar.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnRestar")) {
    restarProducto(e);
    guardarCarritoEnLocalStorage();
  }
  if (e.target.classList.contains("btnBorrar")) {
    borrarProducto(e);
    guardarCarritoEnLocalStorage();
  }
  if (e.target.classList.contains("btnSumar")) {
    sumarProducto(e);
    guardarCarritoEnLocalStorage();
  }
});
//Funciones
//Guardar al local storage
function guardarCarritoEnLocalStorage() {
  miLocalStorage.setItem("carrito", JSON.stringify(carrito));
}
//Carga productos desde el local storage
function cargarCarritoDeLocalStorage() {
  if (miLocalStorage.getItem("carrito") !== null) {
    carrito = JSON.parse(miLocalStorage.getItem("carrito"));
  }
}
//Calcular total de productos
function totalDeCarrito() {
  let total = carrito.reduce((a, i) => a + i.precioTotal, 0);
  $("#mostrarTotal span").html(`$${total}`);
}


//Inicializacion
document.addEventListener("DOMContentLoaded", () => {
  $(".sidebar").hide();
  $(".btnIconoCarrito").click(function () {
    $(".sidebar").slideToggle("fast");
  });
  $(".cerrarCarrito").click(function () {
    $(".sidebar").hide();
  });
  cargarCarritoDeLocalStorage();
  nuevoProductoAlCarrito();
  totalDeCarrito();
});
