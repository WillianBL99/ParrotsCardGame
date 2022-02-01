window.onload = function(){
    makeGame(14);
}

const appElement = document.querySelector("main");
const images = ["bobross","explody","fiesta","metal","revertit","triplets","unicorn"];

function makeGame(num){
    images.sort(comparador);
    auxImages = [];

    for(i = 0; i < num/2; i++){
        auxImages.push(images[i]);
        auxImages.push(images[i]);
    }

    auxImages.sort(comparador).sort(comparador);
    auxImages.forEach( img => appElement.appendChild(addCard(img)));
}





/* Cria uma carta com o gif do fundo passado pelo parametro 'gif' */
function addCard(gif){
    // -- criando elementos --
    const divCard = document.createElement("div");
    divCard.setAttribute('class', 'card');

    const front = document.createElement("div");
    front.setAttribute('class', 'face front');

    const back = document.createElement("div");
    back.setAttribute('class', 'face back');

    const imgParrot = document.createElement("img");
    const gifParrot = document.createElement("img")

    // -- interligando elementos
    imgParrot.setAttribute('src', './img/front.png');
    gifParrot.setAttribute('src', `./img/${gif}parrot.gif`);

    front.appendChild(imgParrot);
    back.appendChild(gifParrot);

    divCard.appendChild(front);
    divCard.appendChild(back);

    return divCard;
}














function comparador() { 
	return Math.random() - 0.5; 
}