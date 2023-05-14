document.getElementById("login").addEventListener("submit", function (event) {
    // Evita que el formulario se envíe
    event.preventDefault();

    // Obtener los valores de usuario y contraseña ingresados por el usuario
    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contrasena").value;

    console.log(usuario)
    // Rrealiza la verificación de usuario y contraseña
    if (usuario === "root" && contraseña === "root") {
        window.location.href = "dashboard.html";
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});