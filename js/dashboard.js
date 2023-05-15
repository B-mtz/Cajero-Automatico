
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