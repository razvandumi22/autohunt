window.addEventListener("DOMContentLoaded", renderTable);

const URL = "https://68e3ee488e116898997a79e1.mockapi.io/cars";

const tableBody = document.querySelector("#cars-table tbody");
const addOrEditBtn = document.querySelector("#add-or-edit-btn");
let isEditMode = false;
let carId;

const marcaInput = document.getElementById("marca");
const modelInput = document.getElementById("model");
const priceInput = document.getElementById("price");
const imageURLInput = document.getElementById("imageURL");
const descriptionInput = document.getElementById("description");
const kmInput = document.getElementById("km");
const anFabricatieInput = document.getElementById("anFabricatie");

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

addOrEditBtn.addEventListener("click", addOrEditCar);

function addOrEditCar(e) {
  e.preventDefault();
  const marca = marcaInput.value;
  const model = modelInput.value;
  const price = priceInput.value;
  const imageURL = imageURLInput.value;
  const description = descriptionInput.value;
  const km = kmInput.value;
  const anFabricatie = anFabricatieInput.value;

  const newCar = {
    marca: marca,
    model: model,
    pret: price,
    imageURL: imageURL,
    details: description,
    km: km,
    anFabricatie: anFabricatie,
  };
  const method = isEditMode ? "PUT" : "POST";
  const newUrl = isEditMode ? `${URL}/${carId}` : URL;

  fetch(newUrl, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCar),
  }).then((response) => {
    renderTable();
    resetForm();
  });

  function resetForm() {
    marcaInput.value = "";
    modelInput.value = "";
    priceInput.value = "";
    imageURLInput.value = "";
    descriptionInput.value = "";
    kmInput.value = "";
    anFabricatieInput.value = "";

    if (isEditMode) {
      isEditMode = false;
      addOrEditBtn.innerHTML = "Add car";
    }
  }
}

tableBody.addEventListener("click", handleActions);

function handleActions(e) {
  const clickedElement = e.target;
  if (clickedElement.parentElement.classList.contains("edit")) {
    carId = getTableRow(clickedElement).dataset.id;
    fetch(`${URL}/${carId}`)
      .then((response) => response.json())
      .then((car) => {
        console.log(car);
        marcaInput.value = car.marca;
        modelInput.value = car.model;
        priceInput.value = car.pret;
        imageURLInput.value = car.imageURL;
        descriptionInput.value = car.details;
        kmInput.value = car.km;
        anFabricatieInput.value = car.anFabricatie;
      });
    isEditMode = true;
    console.log(addOrEditBtn, isEditMode);
    addOrEditBtn.innerHTML = "Save";
  } else if (clickedElement.parentElement.classList.contains("delete")) {
    productId = getTableRow(clickedElement).dataset.id;
    fetch(`${URL}/${productId}`, {
      method: "DELETE",
    }).then((response) => renderTable());
  }
}

function getTableRow(editIcon) {
  return editIcon.parentElement.parentElement.parentElement.parentElement;
}
// buton de add product, se transform in add or edit si schimbam id-ul
// cream o variabila de mod edit in care stocam true daca editam sau false daca adaugam(default value)
// in momentul in care punem in input datele dintr-un produs care urmeaza sa fie editat, atunci variabila de edit mode se duce la true si i se schimba continutul din add product in save
// metodele si numele de variabile pentru addNewProduct se transorma in ceva care se duca cu gandul ca si editam, exemplu: addOrEditBtn
// la metoda care facea post trebuie sa adaugam o variabila method care va fi fie POST fie PUT in functie de valoarea lui isEditMode folosind ternary operator.
