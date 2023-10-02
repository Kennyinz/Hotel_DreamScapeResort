// Función para cambiar el color de fondo al pasar el mouse sobre un botón
function changeButtonColor(buttonId, color) {
    const button = document.getElementById(buttonId);
    button.style.backgroundColor = color;
}

// Función para restablecer el color de fondo de un botón al quitar el mouse
function resetButtonColor(buttonId, originalColor) {
    const button = document.getElementById(buttonId);
    button.style.backgroundColor = originalColor;
}

// Función para resaltar un botón al hacer clic
function highlightButton(buttonId) {
    const button = document.getElementById(buttonId);
    button.style.backgroundColor = "#ffae00"; // Dorado
    button.style.color = "#003366"; // Azul oscuro
}

// Función para restablecer el color de un botón después de hacer clic
function resetButtonClick(buttonId, originalColor, textColor) {
    const button = document.getElementById(buttonId);
    button.style.backgroundColor = originalColor;
    button.style.color = textColor;
}

// Variables para la galería de habitaciones
let currentRoom = 1;
const totalRooms = 4; // Cambiar al número total de habitaciones
const roomImage = document.querySelector(".room-image img");
const roomInfo = document.querySelector(".room-info h3");

// Función para cambiar de habitación
function changeRoom(offset) {
    currentRoom += offset;
    if (currentRoom < 1) {
        currentRoom = totalRooms;
    } else if (currentRoom > totalRooms) {
        currentRoom = 1;
    }
    updateRoomInfo();
}

// Función para actualizar la información de la habitación
function updateRoomInfo() {
    // Actualizar la URL con el número de habitación
    window.location.hash = currentRoom;

    // Cambiar la imagen de la habitación
    roomImage.src = `habitaciones${currentRoom}.jpg`;

    // Cambiar el título de la habitación
    roomInfo.textContent = `Habitación ${currentRoom}`;
}

// Cargar la habitación actual al cargar la página
window.onload = () => {
    const hash = parseInt(window.location.hash.substring(1));
    if (hash >= 1 && hash <= totalRooms) {
        currentRoom = hash;
    }
    updateRoomInfo();
};

// Manejar eventos de cambio de habitación
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

prevButton.addEventListener("click", () => changeRoom(-1));
nextButton.addEventListener("click", () => changeRoom(1));

// Mostrar información adicional de la habitación al hacer clic en el botón "Más información"
const moreInfoButton = document.querySelector(".more-info-button");
const roomDescription = document.querySelector(".room-description");

moreInfoButton.addEventListener("click", () => {
    roomDescription.style.display = "block";
});

// Cerrar la información adicional al hacer clic en el botón "Cerrar"
const closeButton = document.querySelector(".close-button");

closeButton.addEventListener("click", () => {
    roomDescription.style.display = "none";
});

// Eventos para el botón "Personal"
const personalButton = document.querySelector("nav .navbar li:last-child a");

personalButton.addEventListener("mouseover", () => {
    changeButtonColor("personal", "#ffae00"); // Cambia el color al pasar el mouse
});

personalButton.addEventListener("mouseout", () => {
    resetButtonColor("personal", "#333"); // Restablece el color al quitar el mouse
});

personalButton.addEventListener("click", () => {
    highlightButton("personal"); // Resalta el botón al hacer clic
});

// Para restablecer el botón "Personal" después de hacer clic, puedes agregar un evento similar según tus necesidades.

// Función para manejar el inicio de sesión
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtiene los valores ingresados por el usuario
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Aquí puedes verificar los datos del usuario (simulado)
    // Por ejemplo, puedes compararlos con valores predefinidos
    if (email === "usuario@ejemplo.com" && password === "contraseña") {
        // Inicio de sesión exitoso
        alert("Inicio de sesión exitoso");
        // Puedes redirigir al usuario a su página de perfil, por ejemplo:
        window.location.href = "perfil_usuario.html";
    } else {
        alert("Credenciales incorrectas. Inténtalo de nuevo.");
    }
});

// Función para manejar el registro de usuario
document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtiene los valores ingresados por el usuario para el registro
    const newEmail = document.getElementById("new-email").value;
    const newPassword = document.getElementById("new-password").value;

    // Aquí puedes realizar el registro del usuario (simulado)
    // Por ejemplo, puedes almacenar los datos en localStorage
    localStorage.setItem("userEmail", newEmail);
    localStorage.setItem("userPassword", newPassword);

    // Limpia el formulario de registro
    document.getElementById("new-email").value = "";
    document.getElementById("new-password").value = "";

    alert("Registro exitoso. Ahora puedes iniciar sesión.");
});

document.addEventListener("DOMContentLoaded", function () {
    // Obtén el cuadro de inicio de sesión o registro y el mensaje de confirmación por su ID
    var loginBox = document.getElementById("login-box");
    var confirmationMessage = document.getElementById("confirmation-message");
    var loginForm = document.getElementById("login-form");
    var registerLink = document.getElementById("register-link");

    // Función para mostrar el cuadro de inicio de sesión
    function showLoginBox() {
        loginBox.style.display = "block";
        confirmationMessage.style.display = "none";
    }

    // Función para mostrar el mensaje de confirmación
    function showConfirmationMessage(message) {
        confirmationMessage.textContent = message;
        confirmationMessage.style.display = "block";

        // Desvanecimiento del mensaje de confirmación después de 3 segundos (3000 milisegundos)
        setTimeout(function () {
            confirmationMessage.style.display = "none";
        }, 3000);
    }

    // Función para simular el inicio de sesión
    function simulateLogin(username, password) {
        // Simulamos una verificación simple (esto debe reemplazarse con lógica real)
        if (username === "usuario" && password === "contraseña") {
            showConfirmationMessage("Inicio de sesión exitoso");
            loginBox.style.display = "none";
        } else {
            showConfirmationMessage("Credenciales incorrectas");
        }
    }

    // Agrega un evento de clic al enlace de registro para mostrar el cuadro de inicio de sesión
    registerLink.addEventListener("click", function (event) {
        event.preventDefault();
        showLoginBox();
    });

    // Agrega un evento de envío al formulario de inicio de sesión
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        simulateLogin(username, password);
    });

    // Mostrar el cuadro de inicio de sesión al cargar la página
    showLoginBox();
});
