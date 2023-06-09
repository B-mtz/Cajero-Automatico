// Definición de la clase cuenta y contacto
class Cuenta {
  constructor(nTarjeta, nip, saldo, vencimiento, cvv, id) {
    this.nTarjeta = nTarjeta;
    this.nip = nip;
    this.saldo = saldo;
    this.vencimiento = vencimiento;
    this.cvv = cvv;
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
  new Cuenta("1234 5678 9074 8596", 3234, 90000, "05/26", 234, 1),
  new Cuenta("8476 3985 9625 3645", 5387, 15500, "07/28", 745, 2),
  new Cuenta("6239 4532 7426 7354", 3125, 45000, "01/26", 123, 3),
  new Cuenta("9086 4283 7110 9847", 2151, 3200, "03/30", 534, 4),
  new Cuenta("1927 4529 1395 8473", 6087, 16478, "05/30", 765, 5)
];
const contactos = new Array();

//Recupera el id de la persona
const idUsuario = localStorage.getItem('personaId');
// Recuperar la cadena JSON del localStorage
const personasJSON = localStorage.getItem('personas');
// Convertir la cadena JSON a un arreglo de objetos
const personas = JSON.parse(personasJSON);

//Variables que verifican depositios y retiros por dia
let depositoxdia = 0;
let retiroxdia = 0;

//Buscar la cuenta por medio del id
const cuentaEncontrada = cuentas[idUsuario - 1];
const persona = personas[idUsuario - 1]

//Inicializar Valores
const cantidadCuenta = document.getElementById('cantidadCuenta');
const nombreUsuario = document.getElementById('nomUsuario');
const terjetaUsuario = document.getElementById('mostrarTarjeta');
const terjetaNum = document.getElementById('nTarjeta');
const tarjetaTitular = document.getElementById('titular');
const tarjetavencimiento = document.getElementById('venci');
const tarjetaCvv = document.getElementById('cv');
const depositoCuenta = document.getElementById('DnCuenta');
const retiroCuenta = document.getElementById('RnCuenta');
const seleccionarContacto = document.getElementById("tContacto");

nombreUsuario.textContent = "Bienvenido " + persona.nombre;
cantidadCuenta.textContent = "$ " + cuentaEncontrada.saldo;
const ultimosCuatroCaracteres = cuentaEncontrada.nTarjeta.substring(cuentaEncontrada.nTarjeta.length - 4);
terjetaUsuario.textContent = "************" + ultimosCuatroCaracteres + " Ver mi tarjeta";
terjetaNum.textContent = cuentaEncontrada.nTarjeta;
tarjetaTitular.textContent = persona.nombre;
tarjetavencimiento.textContent = "Vencimiento: " + cuentaEncontrada.vencimiento;
tarjetaCvv.textContent = "CVV: " + cuentaEncontrada.cvv;
depositoCuenta.value = persona.cuenta;
retiroCuenta.value = persona.cuenta;


//Mostrar y Ocultar la tarjeta
const botonMostrarTarjeta = document.getElementById('mostrarTarjeta');
const tarjeta = document.getElementById('tarjeta');
let tarjetaVisible = false;

botonMostrarTarjeta.addEventListener('click', function () {
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
nuevoContacto.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar que el formulario se envíe

  const numeroCuenta = document.getElementById('CnCuenta').value;
  const nombre = document.getElementById('Cnombre').value;
  const contacto = {
    nombre: nombre,
    numeroCuenta: numeroCuenta
  };
  contactos.push(contacto);

  //Agregar contacto al select
  var nuevaOpcion = document.createElement('option');
  nuevaOpcion.textContent = contacto.nombre;
  nuevaOpcion.value = contacto.id;
  seleccionarContacto.appendChild(nuevaOpcion);

  // Restablecer el formulario
  nuevoContacto.reset();
});

// Crear Nuevo Deposito
const nuevoDeposito = document.getElementById('deposito');
nuevoDeposito.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar que el formulario se envíe

  const dCuenta = document.getElementById('DnCuenta').value;
  const dCantidad = document.getElementById('Dcantidad').value;
  const dmotivo = document.getElementById('Dmotivo').value;
  depositoxdia += parseInt(dCantidad);

  if (depositoxdia >= 50000) {
    mensajeError.textContent = 'Limite maximo de deposito por dia: $50,000';
  } else {
    if (dCantidad > 20) {
      if (dCantidad < 50000) {
        cuentaEncontrada.saldo += parseInt(dCantidad);
        cantidadCuenta.textContent = "$ " + cuentaEncontrada.saldo;
        nuevoDeposito.reset();
        mensajeError.textContent = '';
        depositoCuenta.value = persona.cuenta;
      } else {
        mensajeError.textContent = 'Los depósitos deben ser menores a $50,000';
      }
    } else {
      mensajeError.textContent = 'Los depósitos deben ser mayores a $20';
    }
  }
});


// Crear Nuevo Retiro
const nuevoRetiro = document.getElementById('retiro');
nuevoRetiro.addEventListener('submit', function (event) {
  event.preventDefault();

  const rCantidad = document.getElementById('Rcantidad').value;
  retiroxdia += parseInt(rCantidad);

  if (cuentaEncontrada.saldo < parseInt(rCantidad)) {
    mensajeError.textContent = 'Saldo insuficiente';
  } else {
    if (retiroxdia >= 30000) {
      mensajeError.textContent = 'Limite maximo de retiro por dia:  $ 30,000';
    } else {
      if (rCantidad > 20) {
        if (rCantidad < 30000) {
          cuentaEncontrada.saldo -= parseInt(rCantidad);
          cantidadCuenta.textContent = "$ " + cuentaEncontrada.saldo;
          nuevoRetiro.reset();
          mensajeError.textContent = '';
          retiroCuenta.value = persona.cuenta;
        } else {
          mensajeError.textContent = 'Los retiros deben ser menores a $30,000';
        }
      } else {
        mensajeError.textContent = 'Los retiros deben ser mayores a $20';
      }
    }
  }
});


// Pagar Nuevo Servicio
const nuevoServicio = document.getElementById('servicio');
nuevoServicio.addEventListener('submit', function (event) {
  event.preventDefault();

  const sCantidad = document.getElementById('Scantidad').value;
  if (cuentaEncontrada.saldo < parseInt(sCantidad)) {
    mensajeError.textContent = 'Saldo insuficiente';
  } else {
    if (sCantidad < 50000) {
      cuentaEncontrada.saldo -= parseInt(sCantidad);
      cantidadCuenta.textContent = "$ " + cuentaEncontrada.saldo;
      nuevoServicio.reset();
      mensajeError.textContent = '';
    } else {
      mensajeError.textContent = 'Solo se permiten servicios menores a $30,000';
    }
  }
});

// Nueva Transferencia
const nuevaTransferencia = document.getElementById('nuevaTransferencia');
nuevaTransferencia.addEventListener('submit', function (event) {
  event.preventDefault();

  const tCantidad = document.getElementById('tcantidad').value;

  seleccionarContacto
  var contactoSeleccionado = seleccionarContacto.selectedIndex;


  if (cuentaEncontrada.saldo < parseInt(tCantidad)) {
    mensajeError.textContent = 'Saldo insuficiente';
  } else {
    if (contactoSeleccionado == 0) {
      mensajeError.textContent = 'Selecciona un contacto';
    } else {
      if (tCantidad < 50000) {
        cuentaEncontrada.saldo -= parseInt(tCantidad);
        cantidadCuenta.textContent = "$ " + cuentaEncontrada.saldo;
        nuevaTransferencia.reset();
        mensajeError.textContent = '';
      } else {
        mensajeError.textContent = 'Solo se permiten transferencias menores a $50,000';
      }
    }
  }
});

// Salir
const Salir = document.getElementById('salir');
Salir.addEventListener('click', function () {
  window.location.href = "index.html";
});