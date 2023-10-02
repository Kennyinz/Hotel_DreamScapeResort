document.addEventListener("DOMContentLoaded", function () {
    // Agrega la lógica de autenticación aquí si es necesario

    const reservationForm = document.getElementById("reservationForm");
    const reservationList = document.getElementById("reservationList");
    const roomsAvailable = document.getElementById("roomsAvailable");
    const roomSelect = document.getElementById("roomSelect");

    let availableRooms = generateRandomRoomNumbers(20);
    const reservations = [];

    function generateRandomRoomNumbers(maxRooms) {
        const roomNumbers = [];
        while (roomNumbers.length < maxRooms) {
            const roomNumber = Math.floor(Math.random() * 100) + 1;
            if (!roomNumbers.includes(roomNumber)) {
                roomNumbers.push(roomNumber);
            }
        }
        return roomNumbers.sort((a, b) => a - b);
    }

    function fillRoomSelect() {
        roomSelect.innerHTML = "";
        availableRooms.forEach((roomNumber) => {
            const option = document.createElement("option");
            option.value = roomNumber;
            option.textContent = `Habitación ${roomNumber}`;
            roomSelect.appendChild(option);
        });
    }

    function addReservation(name, roomNumber, checkIn, checkOut) {
        const reservation = { name, roomNumber, checkIn, checkOut };
        reservations.push(reservation);
        displayReservations();
        updateAvailableRooms();
    }

    function displayReservations() {
        reservationList.innerHTML = "";
        reservations.forEach((reservation, index) => {
            const reservationItem = createReservationItem(reservation, index);
            reservationList.appendChild(reservationItem);

            // Agregar un evento click al botón de cancelar
            const cancelButton = reservationItem.querySelector("button");
            cancelButton.addEventListener("click", () => {
                cancelReservation(index);
            });
        });
    }

    function createReservationItem(reservation, index) {
        const reservationItem = document.createElement("li");
        reservationItem.innerHTML = `
            <strong>${reservation.name}</strong> ha reservado la habitación ${reservation.roomNumber} desde ${reservation.checkIn} hasta ${reservation.checkOut}
            <button type="button" onclick="cancelReservation(${index})">Cancelar</button>
        `;
        return reservationItem;
    }

    function cancelReservation(index) {
        const canceledRoomNumber = reservations[index].roomNumber;
        availableRooms.push(canceledRoomNumber);
        availableRooms.sort((a, b) => a - b);
        reservations.splice(index, 1);
        displayReservations();
        fillRoomSelect();
    }

    function updateAvailableRooms() {
        roomsAvailable.innerHTML = "";
        availableRooms.forEach((roomNumber) => {
            const roomItem = document.createElement("li");
            roomItem.textContent = `Habitación ${roomNumber}`;
            roomsAvailable.appendChild(roomItem);
        });
    }

    reservationForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const roomNumber = parseInt(roomSelect.value);

        if (!isRoomReserved(roomNumber)) {
            const checkIn = new Date(document.getElementById("checkIn").value);
            const checkOut = new Date(document.getElementById("checkOut").value);

            if (checkIn >= checkOut) {
                alert("La fecha de check-in debe ser anterior a la fecha de check-out.");
                return;
            }

            addReservation(name, roomNumber, checkIn, checkOut);
            availableRooms = availableRooms.filter((room) => room !== roomNumber);
            updateAvailableRooms();

            reservationForm.reset();
        } else {
            alert("Esta habitación ya ha sido reservada. Por favor, seleccione otra.");
        }
    });

    function isRoomReserved(roomNumber) {
        return reservations.some((reservation) => reservation.roomNumber === roomNumber);
    }

    fillRoomSelect();
    updateAvailableRooms();
});
