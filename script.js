window.onload = addElemento;
function addElemento(){
    var divAtual = document.getElementById('row')
    var cont = '<i class="fa fa-html5" aria-hidden="true"></i><i class="fa fa-css3" aria-hidden="true"></i><i class="fa fa-linux" aria-hidden="true"></i><i class="fa fa-windows" aria-hidden="true"></i><i class="fa fa-android" aria-hidden="true"></i><i class="fa fa-github" aria-hidden="true"></i><i class="fa fa-stack-overflow" aria-hidden="true"></i><i class="fa fa-code" aria-hidden="true"></i><i class="fa fa-terminal" aria-hidden="true"></i><i class="fa fa-battery-three-quarters" aria-hidden="true"></i><i class="fa fa-microchip" aria-hidden="true"></i><i class="fa fa-database" aria-hidden="true"></i>'
    for(let i =0; i<20;i++){
        var divNova = document.createElement("div")
        divNova.innerHTML = cont
        divAtual.appendChild(divNova)
    }
}
var largura = document.documentElement.clientWidth
console.log(largura)