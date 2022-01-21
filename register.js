//if ("serviceWorker" in navigator) {
//  console.log("Si Existe.");
//}

//Otra Forma también para confirmar el funcionamiento del serviceWorker.
if (navigator.serviceWorker) {
    navigator.serviceWorker.register("./serviceWorker.js");
}