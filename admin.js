window.addEventListener("DOMContentLoaded", renderTable);

const URL = "https://68e3ee488e116898997a79e1.mockapi.io/cars";

const tableBody = document.querySelector("#cars-table tbody");
const addBtn = document.querySelector("#add-btn");

function renderTable() {
  fetch(URL)
    .then((response) => response.json())
    .then((cars) => {
      tableBody.innerHTML = cars
        .map(
          (car, index) =>
            `
            <tr data-id=${car.id}>
               <td>${index + 1}</td>
               <td class="cell-img">
                  <img src=${car.imageURL} />
               </td>
                <td class="cell-marca">
                    ${car.marca}
                </td>
                <td class="cell-model">
                    ${car.model}
                </td>
               <td class="cell-price">
                  ${car.pret} $
               </td>
               <td>
                  <div class="actions">
                     <button class="btn edit" data-action="edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                     </button>
                     <button class="btn delete" data-action="delete">
                        <i class="fa-solid fa-trash"></i>
                     </button>
                  </div>
               </td>
            </tr>
            `
        )
        .join("");
    });
}

addBtn.addEventListener("click", addNewCar);

function addNewCar(e) {
  e.preventDefault();
  const marca = document.getElementById("marca").value;
  const model = document.getElementById("model").value;
  const price = document.getElementById("price").value;
  const imageURL = document.getElementById("imageURL").value;
  const description = document.getElementById("description").value;
  const km = document.getElementById("km").value;
  const anFabricatie = document.getElementById("anFabricatie").value;

  const newCar = {
    marca: marca,
    model: model,
    price: price,
    imageURL: imageURL,
    details: description,
    km: km,
    anFabricatie: anFabricatie,
  };

  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCar),
  }).then((response) => renderTable());
}
