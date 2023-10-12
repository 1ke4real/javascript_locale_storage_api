import "./assets/style.scss";
import { loader } from "./modules/loader.mjs";

let point = document.querySelector("#allpoint");
const cardComponent = (data, localData) => {
  return `
    <div class="card">
    <header class="card-header">
        <p class="card-header-title is-centered">
            ${data.label}
        </p>
    </header>
    <div class="card-content">
        <span class="desc-interet">Description : ${localData.description}</span><br> <br>
        <span class="label">Adresse</span>
        <span class="">Label :${data.label}</span>
        <span class="">Nom :${data.name}</span> <br>
        <span class="">Ville :${data.city}</span> <br>
        <span class="">Code Postal :${data.postcode}</span>
        <img src="${localData.image}" alt="" class="img-point">
    </div>
    <footer class="card-footer">
        <button class="suppPoint button is-danger card-footer-item">Supprimer</button>
    </footer>`;
};
loader();

window.onload = () => {
  let lskey = Object.keys(localStorage);
  console.log(lskey);
  lskey.forEach((key) => {
    let jsonData = JSON.parse(localStorage.getItem(key));
    let jsonPoint = JSON.parse(localStorage.getItem("point-" + jsonData.id));
    if (jsonPoint != null) {
      point.innerHTML += cardComponent(jsonData, jsonPoint);
    }
    document.querySelectorAll(".suppPoint").forEach((supp) => {
      supp.addEventListener("click", () => {
        localStorage.removeItem("point-" + jsonPoint.idadresse);
        location.reload();
      });
    });
  });
};
