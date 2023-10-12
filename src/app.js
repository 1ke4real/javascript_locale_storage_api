import "./assets/style.scss";
import { uploadImage } from "./modules/file.mjs";

let formInput = document.querySelector("#search");
let card = document.querySelector(".result");
const cardComponent = (data) => {
  return `
      <div class="card column is-3 ">
    <header class="card-header">
        <p class="label card-header-title">
            ${data.label}
        </p>
    </header>
    <div class="card-content">
        <span class="name">Nom :${data.name}</span> <br>
        <span class="city">Ville :${data.city}</span> <br>
        <span class="postcode">Code Postal :${data.postcode}</span>   
      </div>
        <footer class="card-footer">
            <button class="supp button is-light card-footer-item">Supprimer</button>
            <button class="voir button is-dark card-footer-item" data-id="${data.id}" >Voir</button>
        </footer>
      </div>
      `;
};

const modalComponent = (data) => {
  return `
    <div class="modal" data-id="${data.id}">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">${data.label}</p>
            <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <span class="label">${data.label}</span> <br>
            <span class="name">${data.name}</span> <br>
            <span class="city">${data.city}</span> <br>
            <span class="postcode">${data.postcode}</span> <br><br>
            <div class="formmodal">
            <label for="nomPoint">Nom :</label><input type="text" class="nomPoint input" placeholder="Entrez un titre" id="nom${data.id}"> <br>
            <label for="descPoint">Description :</label><input type="text" class="descPoint input" placeholder="Entrez une description" id="desc${data.id}"> <br> <br>
            <div class="file">
                <label class="file-label">
                    <input class="file-input" type="file" name="resume">
                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Importer une image
                        </span>
                    </span>
                </label>
            </div> <br>
            <div> <img src="" alt="" class="img-preview"></div>
            <button class="SavePoint button is-dark" data-id="${data.id}">Enregistrer</button>
            </div>
        </section>
    </div>
    </div>         
    `;
};
window.onload = () => {
  if (localStorage != null) {
    setTimeout(() => {
      document.querySelector(".result").classList.remove("none");
    }, 2000);
    let lskey = Object.keys(localStorage);
    lskey.forEach((key) => {
      let jsonData = JSON.parse(localStorage.getItem(key));
      if (jsonData.id != null) {
        card.innerHTML += cardComponent(jsonData);

        document.querySelector(".mod").innerHTML += modalComponent(jsonData);
      }
      let imageLink;
      if (document.querySelector(".file-input")) {
        document
          .querySelector(".file-input")
          .addEventListener("change", (e) => {
            uploadImage(e).then((res) => {
              imageLink = res;
              document.querySelector(".img-preview").src = imageLink;
            });
          });
      }

      document.querySelectorAll(".SavePoint").forEach((save) => {
        save.addEventListener("click", () => {
          if (
            JSON.parse(localStorage.getItem("point-" + save.dataset.id)) ===
            null
          ) {
            let pointObject = {
              title: document.querySelector("#nom" + save.dataset.id).value,
              description: document.querySelector("#desc" + save.dataset.id)
                .value,
              idadresse: save.dataset.id,
              lat: jsonData.lat,
              long: jsonData.long,
              image: imageLink,
            };
            localStorage.setItem(
              "point-" + save.dataset.id,
              JSON.stringify(pointObject),
            );
            Swal.fire("Bravo !", "Nouvel ajout de point", "success");
            document.querySelectorAll(".modal").forEach((mod) => {
              mod.classList.remove("is-active");
            });
          } else {
            alert("un point d'interet existe deja pour cete adresse");
            document.querySelectorAll(".modal").forEach((mod) => {
              mod.classList.remove("is-active");
            });
            location.reload();
          }
        });
      });

      document.querySelectorAll(".supp").forEach((button) => {
        button.addEventListener("click", () => {
          localStorage.removeItem(key);

          location.reload();
        });
      });

      document.querySelectorAll(".voir").forEach((button) => {
        button.addEventListener("click", () => {
          document.querySelectorAll(".modal").forEach((mod) => {
            if (button.dataset.id === mod.dataset.id) {
              mod.classList.add("is-active");
            }
          });
        });
      });
      document.querySelectorAll(".delete").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".modal").forEach((mod) => {
            mod.classList.remove("is-active");
          });
        });
      });
    });
  }
  formInput.addEventListener("input", () => {
    if (formInput.value.length > 0) {
      document.querySelectorAll(".card-search").forEach((s) => {
        s.classList.add("none");
      });
      document.querySelector(".loader").classList.remove("none");
    } else {
      document.querySelector(".loader").classList.add("none");
    }
    if (formInput.value.length > 4) {
      setTimeout(() => {
        document.querySelector(".loader").classList.add("none");
        fetch(
          "https://api-adresse.data.gouv.fr/search/?q=" +
            formInput.value +
            "&limit=15&autocomplete=0",
        )
          .then((res) => res.json())
          .then((data) => {
            data.features.forEach((values, key) => {
              console.log(values.properties);
              card.innerHTML +=
                '<div class="card column is-3 card-search" data-id="' +
                values.properties.id +
                '">' +
                '           <div class="card-header"> <p class="label card-header-title">' +
                values.properties.label +
                "</p></div> <br>" +
                '           <div class="card-content"> <span class="name">Nom :' +
                values.properties.name +
                "</span> <br>" +
                '<span class="city">Ville :' +
                values.properties.city +
                "</span> <br>" +
                '<span class="postcode">Code Postal :' +
                values.properties.postcode +
                "</span></div>" +
                '       <div class="card-footer"> <button class="ajouter button is-dark card-footer-item" data-id="' +
                values.properties.id +
                '">Ajouter</button> </div></div> <br>';
              document.querySelectorAll(".ajouter").forEach((button) => {
                button.addEventListener("click", () => {
                  let dataObject = {
                    id: values.properties.id,
                    label: values.properties.label,
                    name: values.properties.name,
                    city: values.properties.city,
                    postcode: values.properties.postcode,
                    lat: values.geometry.coordinates[1],
                    long: values.geometry.coordinates[0],
                  };
                  localStorage.setItem(
                    values.properties.id,
                    JSON.stringify(dataObject),
                  );
                  location.reload();
                });
              });
            });
          })
          .catch((error) => console.log(error));
      }, 1000);
    }
  });
};
