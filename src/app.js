import "./assets/style.scss";
import { uploadImage } from "./modules/file.mjs";

let formInput = document.querySelector("#search");
let card = document.querySelector(".result");

window.onload = () => {
  if (localStorage != null) {
    setTimeout(() => {
      document.querySelector(".result").classList.remove("none");
    }, 2000);
    let lskey = Object.keys(localStorage);
    lskey.forEach((key) => {
      let jsonData = JSON.parse(localStorage.getItem(key));
      if (jsonData.id != null) {
        card.innerHTML +=
          '<div class="card column is-3 ">' +
          '<header class="card-header"><p class="label card-header-title">' +
          jsonData.label +
          "</p></header>" +
          '            <div class="card-content"><span class="name">Nom :' +
          jsonData.name +
          "</span> <br>" +
          '            <span class="city">Ville :' +
          jsonData.city +
          "</span> <br>" +
          '            <span class="postcode">Code Postal :' +
          jsonData.postcode +
          "</span></div> <br>" +
          '        <footer class="card-footer"><button class="supp button is-light card-footer-item">Supprimer</button> <button class="voir button is-dark card-footer-item" data-id="' +
          jsonData.id +
          '" >Voir</button></footer></div> <br>';

        document.querySelector(".mod").innerHTML +=
          '<div class="modal" data-id="' +
          jsonData.id +
          '">\n' +
          '<div class="modal-background"></div>\n' +
          '<div class="modal-card">\n' +
          '                    <header class="modal-card-head">\n' +
          '                        <p class="modal-card-title">' +
          jsonData.label +
          "</p>\n" +
          '                        <button class="delete" aria-label="close"></button>\n' +
          "                    </header>\n" +
          '                    <section class="modal-card-body">\n' +
          '            <span class="label">' +
          jsonData.label +
          "</span> <br>" +
          '            <span class="name">' +
          jsonData.name +
          "</span> <br>" +
          '            <span class="city">' +
          jsonData.city +
          "</span> <br>" +
          '            <span class="postcode">' +
          jsonData.postcode +
          "</span> <br><br>" +
          '<div class="formmodal">' +
          '<label for="nomPoint">Nom :</label><input type="text" class="nomPoint input" placeholder="Entrez un titre" id="nom' +
          jsonData.id +
          '"> <br>' +
          '<label for="descPoint">Description :</label><input type="text" class="descPoint input" placeholder="Entrez une description" id="desc' +
          jsonData.id +
          '"> <br> <br>' +
          '<div class="file">\n' +
          '  <label class="file-label">\n' +
          '    <input class="file-input" type="file" name="resume">\n' +
          '    <span class="file-cta">\n' +
          '      <span class="file-icon">\n' +
          '        <i class="fas fa-upload"></i>\n' +
          "      </span>\n" +
          '      <span class="file-label">\n' +
          "        Importer une image" +
          "      </span>\n" +
          "    </span>\n" +
          "  </label>\n" +
          "</div> <br>" +
          '<div> <img src="" alt="" class="img-preview"></div>' +
          '<button class="SavePoint button is-dark" data-id="' +
          jsonData.id +
          '">Enregistrer</button>' +
          "</div>" +
          "                    </section>" +
          "</div>\n" +
          "</div>";
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
