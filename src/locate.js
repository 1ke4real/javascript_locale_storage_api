import {locate} from "./modules/coordonate.mjs";
import './assets/style.scss'
import {loader} from "./modules/loader.mjs";

loader()
let point = document.querySelector('#allpoint')
let search = document.querySelector('#search')
document.querySelector('#map').style.height = "0px"


let points = []
window.onload = () =>{
    console.log(document.querySelector('#maptn').value)
    document.querySelector('#maptn').addEventListener('change', (e)=>{
        if (e.currentTarget.checked){
            // document.querySelector('#map').classList.remove('none')
            document.querySelector('#map').style.height = "71vh"
            point.classList.add('none')
        }else {
            // document.querySelector('#map').classList.add('none')
            document.querySelector('#map').style.height = "0px"
            point.classList.remove('none')
        }
    })
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
    let lskey = Object.keys(localStorage)

    let latUser = position.coords.latitude;
    let longUser = position.coords.longitude;

    var map = L.map('map').setView([latUser, longUser], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
            var redIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            });

            var marker = L.marker([latUser, longUser],{
                icon : redIcon
            }).addTo(map);
            marker.bindPopup("Vous êtes ICI")


    lskey.forEach(( key) => {
        let jsonData = JSON.parse(localStorage.getItem(key))
        let jsonPoint = JSON.parse(localStorage.getItem('point-' + jsonData.id))
        if (jsonPoint != null){

                    let distance = locate(latUser, jsonData.lat, longUser, jsonData.long);
                    points.push({
                        title: jsonPoint.title,
                        description: jsonPoint.description,
                        label: jsonData.label,
                        name: jsonData.name,
                        city: jsonData.city,
                        postcode: jsonData.postcode,
                        distance: distance,
                        image: jsonPoint.image
                    });
                    points.sort(function (a, b) {
                        return a.distance - b.distance;
                    });

                    point.innerHTML = "";
                    points.forEach((pointData)=>{
                        var markerInteret = L.marker([jsonData.lat, jsonData.long]).addTo(map);
                        markerInteret.bindPopup(
                            "<b>"+jsonData.name+"</b> <br>"+
                            "<span>Titre : "+jsonPoint.title+"</span> <br>"+
                            "<span>Desc : "+jsonPoint.description+"</span>"+
                            "<ul>" +
                            "<li>"+jsonData.label+"</li>"+
                            "<li>"+jsonData.postcode+" "+jsonData.city+"</li>"+
                            "<li>"+distance+"Km</li>"+
                            "</ul>"
                        )

                        search.addEventListener('input', ()=>{
                            if (search.value.length>3){

                                const foundPoint = points.find((point) => {
                                    return Object.values(point).includes(search.value);
                                })
                                if (foundPoint) {
                                    console.log("trouvé :", foundPoint);
                                    console.log(foundPoint.postcode)
                                    point.innerHTML = '<div class="card " data-locate="'+foundPoint.distance+'">' +
                                        '<header class="card-header"> <p class="card-header-title is-centered">' +
                                        foundPoint.title +
                                        '</p></header> <br>' +
                                        '<div class="card-content"><span class="desc-interet">Description : ' +
                                        foundPoint.description +
                                        '</span><br> <br>' +
                                        '<span class="label">Adresse</span>' +
                                        '            <span class="">Label :' +
                                        foundPoint.label +
                                        '</span>' +
                                        '            <span class="">Nom :' +
                                        foundPoint.name +
                                        '</span> <br>' +
                                        '            <span class="">Ville :' +
                                        foundPoint.city +
                                        '</span> <br>' +
                                        '            <span class="">Code Postal :' +
                                        foundPoint.postcode +
                                        '</span><br>' +
                                        ' <span class="title">Distance : ' +
                                        foundPoint.distance +
                                        ' Km</span> <br>' +
                                        '<img src="'+foundPoint.image+'" alt="" class="img-point">'+
                                        '</div> ' +
                                        '        <footer class="card-footer"><button class="suppPoint button is-danger card-footer-item">Supprimer</button></footer> </div> <br>';
                                } else {
                                    console.log("non trouvé");

                                }

                            }
                        })

                        point.innerHTML += '<div class="card " data-locate="'+pointData.distance+'">' +
                            '<header class="card-header"> <p class="card-header-title is-centered">' +
                            pointData.title +
                            '</p></header> <br>' +
                            '<div class="card-content"><span class="desc-interet">Description : ' +
                            pointData.description +
                            '</span><br> <br>' +
                            '<span class="label">Adresse</span>' +
                            '            <span class="">Label :' +
                            pointData.label +
                            '</span>' +
                            '            <span class="">Nom :' +
                            pointData.name +
                            '</span> <br>' +
                            '            <span class="">Ville :' +
                            pointData.city +
                            '</span> <br>' +
                            '            <span class="">Code Postal :' +
                            pointData.postcode +
                            '</span><br>' +
                            ' <span class="title">Distance : ' +
                            pointData.distance +
                            ' Km</span> <br>' +
                            '<img src="'+pointData.image+'" alt="" class="img-point">'+
                            '</div> ' +
                            '        <footer class="card-footer"><button class="suppPoint button is-danger card-footer-item">Supprimer</button></footer> </div> <br>';

                        document.querySelectorAll(".suppPoint").forEach((supp) => {
                            supp.addEventListener("click", () => {
                                console.log("coucou");
                                localStorage.removeItem("point-" + jsonPoint.idadresse);
                                location.reload();
                            });
                    })
                 })
        }
    })
        })
    } else {
        console.log("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }

}