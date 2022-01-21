
//Creacion clase cliente y su constructor
class Cliente{
  constructor (nombre,mail,telefono,domicilio){
      this.nombre = nombre;
      this.mail = mail;
      this.telefono = telefono;
      this.domicilio = domicilio;
  }   
}

//Validacion para enviar formulario y guardar datos de cliente

let validarFormulario = () => {
  let nombre = document.getElementById("nombre").value;
  let mail = document.getElementById("mail").value
  let telefono = document.getElementById("telefono").value;
  let domicilio = document.getElementById("domicilio").value;
  let cliente = new Cliente(nombre, mail, telefono, domicilio);
  
    if (nombre === "") {
      Swal.fire({
        title: 'Error',
        text: 'Por favor ingrese su nombre y apellido',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      //nombre.focus();
      return false;
    }
    else if (mail === "") {
      Swal.fire({
        title: 'Error',
        text: 'Por favor ingrese un email valido',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      //mail.focus();
      return false;
    }
    else if (!emailVálido(mail)) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor ingrese un email valido',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      //mail.focus();
      return false;
    }
    else if (telefono === "" || isNaN(telefono)) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor ingrese un telefono valido',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      //telefono.focus();
      return false;
    }
    else if (domicilio === ""){
      Swal.fire({
        title: 'Error',
        text: 'Por favor ingrese su domicilio',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      //direccion.focus();
      return false;
    }
  
    else{
      mostrarMensaje(cliente)
      return true;
    }
    
  }
  
  const emailVálido = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
    
    
   

//Funcion para cargar html de formulario

function finalizarCompra () {
  sidebar.innerHTML="";
  sidebar.innerHTML += `<h3> DATOS PARA EL ENVÍO </h3>
  <div class="seccionContacto">
    <div class="row">
      <div class="seccionContactoItems">
        <label>Nombre</label>
        <input type="text" id="nombre" placeholder="Nombre y Apellido" />
      </div>
      <div class="seccionContactoItems">
        <label>E-mail</label>
        <input type="text" id="mail" placeholder="name@example.com" />
      </div>
      <div class="seccionContactoItems">
        <label>Telefono</label>
        <input type="text" id="telefono" placeholder="Telefono" />
      </div>
      <div class="seccionContactoItems">
        <label>Domicilio</label>
        <input type="text" id="domicilio" placeholder="Domicilio" />
      </div>
      <div class="contactButton">
        <button type="button" class="btn btnEnviar envio" onClick="validarFormulario()" >Confirmar</button>
      </div>
    </div>
  </div>`;
}
  
  
//Funcion para saludar al cliente una vez que ingreso sus datos

const mostrarMensaje = (cliente) => {
  sidebar.innerHTML = "";
  let mensaje = `<div class="mensajeFinal">Gracias ${cliente.nombre} por su compra! en 72 horas recibira su paquete en ${cliente.domicilio} </div>
                <button type="button" class="btn contactButton btnCerrar" onClick="vaciarCarrito()" >Volver</button>
                `;
  sidebar.innerHTML = mensaje;

};
  
//Validacion para finalizar compra

const seguirFormulario = () => {
    
    if ($.isEmptyObject(carrito)) {
      Swal.fire(
        'Carrito vacio',
        'Por favor ingrese productos al carrito',
        'question'
      );
    } else {
        finalizarCompra();
    }
}





  
