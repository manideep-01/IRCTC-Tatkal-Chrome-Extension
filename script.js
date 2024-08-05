document.addEventListener("DOMContentLoaded", function () {
    const addPassengerBtn = document.getElementById("add-passenger-btn");
    const addInfantBtn = document.getElementById("add-infant-btn");
    const passengerDetailsContainer = document.getElementById("passenger-details");
    let passengerCount = 1;
    let infantCount = 0;

    addPassengerBtn.addEventListener("click", function () {
        if (passengerCount < 4) { // Maximum passengers allowed is 4
            passengerCount++;
            createPassengerDetails(passengerCount);
        } else {
            alert("Maximum passenger limit reached. You cannot add more passengers.");
        }
    });

    addInfantBtn.addEventListener("click", function () {
        if (infantCount < 2) { // Maximum infants allowed is 2
            infantCount++;
            createInfantDetails(infantCount);
        } else {
            alert("Maximum infant limit reached. You cannot add more infants.");
        }
    });

    // Event delegation for delete button
    passengerDetailsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-passenger-btn")) {
            const passengerNumber = event.target.getAttribute("data-passenger");
            if (passengerNumber.startsWith("infant")) {
                infantCount--;
            } else {
                passengerCount--;
            }
            deletePassenger(passengerNumber);
        }
    });

    // Event listener for delete button of default passenger details
    const defaultPassengerDeleteBtn = document.querySelector("#passenger1-details .delete-passenger-btn");
    defaultPassengerDeleteBtn.addEventListener("click", function () {
        passengerCount--;
        deletePassenger("passenger1");
    });
});

function createPassengerDetails(passengerNumber) {
    const newPassengerDetails = document.createElement("div");
    newPassengerDetails.classList.add("passenger-details");
    newPassengerDetails.id = `passenger${passengerNumber}-details`;
    newPassengerDetails.innerHTML = `
        <div class="vertical-inputs">
            <div class="passenger-vertical-field">
                <label for="passenger${passengerNumber}-name">Passenger Name</label>
                <input type="text" id="passenger${passengerNumber}-name" name="passenger${passengerNumber}-name">
            </div>
            <div class="age-vertical-field">
                <label for="passenger${passengerNumber}-age">Age</label>
                <input type="number" id="passenger${passengerNumber}-age" name="passenger${passengerNumber}-age" min="0">
            </div>
            <div class="gender-vertical-field">
                <label for="passenger${passengerNumber}-gender">Gender</label>
                <select id="passenger${passengerNumber}-gender" name="passenger${passengerNumber}-gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                </select>
            </div>
            <div class="verticalfields">
                <label for="passenger${passengerNumber}-berth-preference">Berth Preference</label>
                <select id="passenger${passengerNumber}-berth-preference" name="passenger${passengerNumber}-berth-preference">
                    <option value="NoPreference">No Preference</option>
                    <option value="Lower">Lower</option>
                    <option value="Middle">Middle</option>
                    <option value="Upper">Upper</option>
                    <option value="SideLower">Side Lower</option>
                    <option value="SideUpper">Side Upper</option>
                </select>
            </div>
            <div class="verticalfields">
                <label for="passenger${passengerNumber}-nationality">Nationality</label>
                <select id="passenger${passengerNumber}-nationality" name="passenger${passengerNumber}-nationality">
                    <option value="India">India</option>
                </select>
            </div>
            <div class= "delete-passenger-btn-container">
                <button type="button" class="delete-passenger-btn" data-passenger="passenger${passengerNumber}">&#10006;</button>
            </div>
        </div>
    `;
    document.getElementById("passenger-details").appendChild(newPassengerDetails);
}

function createInfantDetails(infantNumber) {
    const newInfantDetails = document.createElement("div");
    newInfantDetails.classList.add("passenger-details");
    newInfantDetails.id = `infant${infantNumber}-details`;
    newInfantDetails.innerHTML = `
        <div class="infant-vertical-inputs">
            <div class="infant-vertical-field">
                <label for="infant${infantNumber}-name">Infant Name</label>
                <input type="text" id="infant${infantNumber}-name" name="infant${infantNumber}-name">
            </div>
            <div class="infant-age-vertical-field">
                <label for="infant${infantNumber}-age">Infant Age</label>
                <select id="infant${infantNumber}-age" name="infant${infantNumber}-age">
                    <option value="0-1">0 - 1 Year</option>
                    <option value="1-2">1 - 2 Years</option>
                </select>
            </div>
            <div class="infant-gender-vertical-field">
                <label for="infant${infantNumber}-gender">Infant Gender</label>
                <select id="infant${infantNumber}-gender" name="infant${infantNumber}-gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="delete-passenger-btn-container">
                <button type="button" class="delete-passenger-btn" data-passenger="infant${infantNumber}">&#10006;</button>
            </div>
        </div>
    `;
    document.getElementById("passenger-details").appendChild(newInfantDetails);
}

function deletePassenger(passengerNumber) {
    const passengerDetails = document.getElementById(`${passengerNumber}-details`);
    passengerDetails.remove();
}
