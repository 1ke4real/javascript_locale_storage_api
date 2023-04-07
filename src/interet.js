import './assets/style.scss'
import {loader} from "./modules/loader.mjs";


let point = document.querySelector('#allpoint')
loader()


window.onload = () =>{
    let lskey = Object.keys(localStorage)
    lskey.forEach(( key) => {
        let jsonData = JSON.parse(localStorage.getItem(key))
        let jsonPoint = JSON.parse(localStorage.getItem('point-' + jsonData.id))
        if (jsonPoint != null){
            console.log(jsonPoint)
            point.innerHTML += '<div class="card ">' +

                '<header class="card-header"> <p class="card-header-title is-centered">'+jsonPoint.title+'</p></header> <br>'+
                '<div class="card-content"><span class="desc-interet">Description : '+jsonPoint.description+'</span><br> <br>'+
                '<span class="label">Adresse</span>'+
                '            <span class="">Label :'+ jsonData.label+'</span>' +
                '            <span class="">Nom :'+  jsonData.name+'</span> <br>' +
                '            <span class="">Ville :'+  jsonData.city+'</span> <br>' +
                '            <span class="">Code Postal :'+  jsonData.postcode+'</span></div> <br>' +
                '<img src="'+jsonPoint.image+'" alt="" class="img-point">'+
                '        <footer class="card-footer"><button class="suppPoint button is-danger card-footer-item">Supprimer</button></footer> </div> <br>'

        }
        document.querySelectorAll('.suppPoint').forEach( (supp)=>{
            supp.addEventListener('click', ()=>{
                localStorage.removeItem('point-'+jsonPoint.idadresse)
                location.reload();
            })
        })
    })

}