// Definición de la clase cuenta y contacto
class Cuenta {
  constructor(nTarjeta, nip, saldo, id) {
    this.nTarjeta = nTarjeta;
    this.nip = nip;
    this.saldo = saldo;
    this.id = id;
  }
}
class Contacto {
  constructor(nombre, cuenta, id) {
    this.nombre = nombre;
    this.cuenta = cuenta;
    this.id = id;
  }
}

// Creación del arreglo de cuentas y de contactos
const cuentas = [
  new Cuenta("1234567890",3234, 90000,1),
  new Cuenta("8476398596",5387, 15500,2),
  new Cuenta("6239453274",3125, 45000,3),
  new Cuenta("9086428371",2151, 3200,4),
  new Cuenta("1927452913",6087, 16478,5),
];
const contactos = new Array();

//Recupera el id de la persona
const idUsuario = localStorage.getItem('personaId');
// Recuperar la cadena JSON del localStorage
const personasJSON = localStorage.getItem('personas');
// Convertir la cadena JSON a un arreglo de objetos
const personas = JSON.parse(personasJSON);



//Mostrar y Ocultar la tarjeta
const botonMostrarTarjeta = document.getElementById('mostrarTarjeta');
const tarjeta = document.getElementById('tarjeta');
let tarjetaVisible = false;

botonMostrarTarjeta.addEventListener('click', function() {
  if (tarjetaVisible) {
    tarjeta.classList.add('oculta');
    tarjetaVisible = false;
  } else {
    tarjeta.classList.remove('oculta');
    tarjetaVisible = true;
  }
  
});

// Crear Nuevo Contacto
const nuevoContacto = document.getElementById('nuevoContacto');
nuevoContacto.addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe
  
  const numeroCuenta = document.getElementById('CnCuenta').value;
  const nombre = document.getElementById('Cnombre').value;
  const contacto = {
    nombre: nombre,
    numeroCuenta: numeroCuenta
  };
  contactos.push(contacto);
  // Restablecer el formulario
  nuevoContacto.reset();

  console.log(contactos[contactos.length - 1]);
});