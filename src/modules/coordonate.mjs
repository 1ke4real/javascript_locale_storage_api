import '../assets/style.scss'
 export const locate = (lat2, lat1, lon2, lon1)=>{
    console.log('formule')
     const R = 6371;
     const dLat = toRadians(lat2 - lat1);
     const dLon = toRadians(lon2 - lon1);
     const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
     const locate = R * c;
     const res = locate.toFixed(2)
     return res;
 }

 export const toRadians = (degrees)=> {
     return degrees * (Math.PI/180);
 }