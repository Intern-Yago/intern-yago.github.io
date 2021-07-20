window.onload = addElemento;
function addElemento(){
    var largura = document.body.clientWidth
    console.log(largura)
    console.log(largura/45) 
    var divAtual = document.getElementById('row')
    var cont = '<i class="fa fa-linux" aria-hidden="true"></i><i class="fa fa-windows" aria-hidden="true"></i><i class="fa fa-android" aria-hidden="true"></i><i class="fa fa-github" aria-hidden="true"></i><i class="fa fa-stack-overflow" aria-hidden="true"></i><i class="fa fa-code" aria-hidden="true"></i><i class="fa fa-terminal" aria-hidden="true"></i></i><i class="fa fa-database" aria-hidden="true"></i><i class="fa fa-wifi" aria-hidden="true"></i><i class="fa fa-bluetooth" aria-hidden="true"></i>'
    for(let i =0; i<(largura/60);i++){
        var divNova = document.createElement("div")
        divNova.innerHTML = cont
        divAtual.appendChild(divNova)
    }
}

const toTop = document.querySelector(".arrow-top")

window.addEventListener("scroll", () =>{
    if(window.pageYOffset > 100){
        toTop.classList.add('active')
    }else{
        toTop.classList.remove('active')
    }

})