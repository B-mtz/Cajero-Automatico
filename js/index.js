// Definición de la clase Persona
class Persona {
    constructor(usuario, contraseña, tarjeta, id) {
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.tarjeta = tarjeta;
        this.id = id;
    }
}

// Creación del arreglo de objetos
const personas = [
    new Persona('root', 'root', '1234567890123456', 0),
    new Persona('Juan', '12345', '5435734658347657', 1),
    new Persona('Maria', 'a1b2c3', '0293472386473773', 2),
    new Persona('Felipe', 'abcde', '9823486374637434', 3),
    new Persona('Rosa', 'aabbccdd', '8234762736423859', 4)
];
// Convertir el arreglo a una cadena JSON
const personasJSON = JSON.stringify(personas);


document.getElementById("login").addEventListener("submit", function (event) {
    // Evita que el formulario se envíe
    event.preventDefault();

    // Obtener los valores de usuario y contraseña ingresados por el usuario
    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contrasena").value;

    // Verificar el usuario y la contraseña
    var personaEncontrada = personas.find(function (persona) {
        return persona.usuario === usuario && persona.contraseña === contraseña;
    });

    if (personaEncontrada) {
        // Usuario y contraseña válidos
        localStorage.setItem('personaId', personaEncontrada.id);
        localStorage.setItem('personas', personasJSON);
        window.location.href = "dashboard.html";
    } else {
        // Usuario o contraseña incorrectos
        alert("Usuario o contraseña incorrectos");
    }
});