window.onload = function(){
    addCard();
}


const appElement = document.querySelector("main");
let item;

function addCard(){
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
    gifParrot.setAttribute('src', './img/tripletsparrot.gif');

    front.appendChild(imgParrot);
    back.appendChild(gifParrot);

    divCard.appendChild(front);
    divCard.appendChild(back);

    appElement.appendChild(divCard);
}