class Cliente{
    constructor(nombre,apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
    }
    saludar(){
        return `Bienvenido ${this.nombre} ${this.apellido}`;
    }
}

const nombre = prompt("Ingrese su nombre");
const apellido = prompt("Ingrese su apellido");

const nuevoCliente = new Cliente(nombre,apellido);
alert(nuevoCliente.saludar());


class Producto{
    constructor(producto,precio,cantidad) {
        this.producto = producto;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

const arrayProductos = [];
let pregunta = prompt("¿Desea realizar una compra? (si/no) ");

if (pregunta.toLowerCase() == "si"){
    while (pregunta.toLowerCase() == "si") {
        let producto = prompt("Ingrese el producto que desea comprar");
        let precio = parseInt(prompt("Ingrese el precio del producto"));
        let cantidad = parseInt(prompt("Ingrese la cantidad"));
        let productoIngresado = new Producto(producto, precio, cantidad);
        arrayProductos.push(productoIngresado);
        console.log(arrayProductos);
        pregunta = prompt("¿Desea agregar otro producto? (si/no)");
    }
      
      let totalCompra = 0;
      
      for (i = 0; i < arrayProductos.length; i++) {
        console.log(arrayProductos[i]);
        totalCompra =
        totalCompra + arrayProductos[i].precio * arrayProductos[i].cantidad;
      }
      alert("Gracias por su compra! El monto a abonar es de $  " + totalCompra);
}

else if (pregunta.toLowerCase() == "no"){
    alert(`"Saludos, ojala vuelva pronto"`);
}

else{
    alert("Los datos ingresados no son validos");
}
