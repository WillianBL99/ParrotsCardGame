window.onload = function(){
    buildGame(checkNumber());
}


const appElement = document.querySelector("main");
const images = ["bobross","explody","fiesta","metal","revertit","triplets","unicorn"];

function buildGame(num){
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



// Repete até o usuário inserir um número par entre 4 e 14
function checkNumber(){
    let pairNumber;

    do {
        pairNumber = parseInt(prompt('Com quantas cartas você quer jogar?'))
        if(pairNumber < 4 || pairNumber > 14 || pairNumber%2 !== 0) alert('Insira um número par entre 4 e 14, inclusive.');
    } while(pairNumber < 4 || pairNumber > 14 || pairNumber%2 !== 0);
    return pairNumber;
}

// Embaralhar array a partir do sort()
function comparador() { 
	return Math.random() - 0.5; 
}