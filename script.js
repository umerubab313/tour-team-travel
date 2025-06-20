const cities = [
  { name: "Paris", img: "paris.jpg", description: "City of light, fashion and romance." },
  { name: "Tokyo", img: "tokyo.jpg", description: "Fusion of tradition and cutting-edge tech." },
  { name: "New York", img: "newyork.jpg", description: "The city that never sleeps." },
  { name: "Rome", img: "rome.jpg", description: "History, art, and architecture." }
];

const container = document.getElementById("city-cards");

cities.forEach(city => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<img src="${city.img}" alt="${city.name}"/><h3>${city.name}</h3>`;
  card.onclick = () => showModal(city);
  container.appendChild(card);
});

function showModal(city) {
  document.getElementById("modalCityName").innerText = city.name;
  document.getElementById("modalCityDescription").innerText = city.description;
  document.getElementById("modalCityImage").src = city.img;
  document.getElementById("cityModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("cityModal").style.display = "none";
}
