window.addEventListener("DOMContentLoaded", displayCars);
const URL = "https://68e3ee488e116898997a79e1.mockapi.io/cars";

function displayCars() {
  fetch(URL)
    .then((response) => {
      if (response.ok === false) {
        throw new Error("Network error!");
      } else return response.json();
    })
    .then(
      (cars) =>
        (document.querySelector(".cars-container").innerHTML = cars
          .map(
            (car) =>
              `<div class="car-card">
         <div class="car-image">
    <img src="${car.imageURL}" alt="Car image" />
        </div>
        <div class="car-info">
          <h3>${car.marca} ${car.model}</h3>
          <div class="price">${car.pret} $</div>
          <h4>${car.details}</h4>
          <h4>📅 ${car.anFabricatie}</h4>
          <h4>🛞 ${car.km} KM</h4>
          <div class="buttons">
            <button class="details-btn">Details</button>
            <button class="cart-btn">Add to cart</button>
          </div>
        </div>
      </div>`
          )
          .join(""))
    );
}
