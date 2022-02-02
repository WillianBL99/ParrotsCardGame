window.onload = function(){
    // monta as cartas com a quantidade passada pelo usuário em 'checkNumber()'
    buildGame(checkNumber());
}

// Pega o conteiner onde ficarão as cartas
const appElement = document.querySelector("main");
// cria o vertor com os nomes das imagens disponíveis
const images = ["bobross","explody","fiesta","metal","revertit","triplets","unicorn"];

// monta as cartas na tela
function buildGame(num){
    // embaralha as imagens no vetor
    images.sort(comparador);
    auxImages = [];

    // insere os pares de imagens no array
    for(i = 0; i < num/2; i++){
        auxImages.push(images[i]);
        auxImages.push(images[i]);
    }

    // embaralha as imagens novamente
    auxImages.sort(comparador).sort(comparador);
    // para cada imagens do vertor é criado e inserido um cartão na tela
    auxImages.forEach( img => appElement.appendChild(addCard(img)));
}

// Embaralhar array a partir do sort()
function comparador() { 
	return Math.random() - 0.5; 
}


/* Cria uma carta com o gif do fundo passado pelo parametro 'gif' */
function addCard(gif){
    // cria a div principal da carta
    const divCard = document.createElement("div");
    divCard.setAttribute('id',`${gif}`);
    divCard.setAttribute('class', 'card');
    divCard.setAttribute('onclick', 'cardSelect(this, this.id)');
    // cria a parte frontal da carta
    const front = document.createElement("div");
    front.setAttribute('class', 'face front');
    // cria a parte de trás da carta
    const back = document.createElement("div");
    back.setAttribute('class', 'face back');
    
    const imgParrot = document.createElement("img");
    const gifParrot = document.createElement("img");

    // Insere as imagens no front e no back da carta
    imgParrot.setAttribute('src', './img/front.png');
    gifParrot.setAttribute('src', `./img/${gif}parrot.gif`);

    // finaliza a montagem da carta
    front.appendChild(imgParrot);
    back.appendChild(gifParrot);
    divCard.appendChild(front);
    divCard.appendChild(back);

    // retorna a carta completa
    return divCard;
}


// Repete até o usuário inserir um número par entre 4 e 14
function checkNumber(){
    let PairNumber;
    // repete até o retorno do prompet for par e estiver entre 3 e 15
    while(true){
        pairNumber = parseInt(prompt('Com quantas cartas você quer jogar?'));
        if(isPair(pairNumber)) break;
    }

    return pairNumber;
}

// verifica se o número é par e está entre 3 e 15;
function isPair(pairNumber){
    if(pairNumber < 4 || pairNumber > 14 || pairNumber%2 !== 0){        
        alert('Insira um número par entre 4 e 14, inclusive.');
        return false;
    }
    return true;
}


/*  -- Implementação das função do jogo -- */
// Contador de vezes que uma carta foi virada
let counter = 0;
let beforParrot = {card: '', id: '' };

function cardSelect(cardClicked, cardId){
    const card = cardClicked;
    let frontCard = card.querySelector('.front');
    let backCard = card.querySelector('.back');

    
    if(!frontCard.classList.contains('frontClicked')){     
        frontCard.classList.add('frontClicked');
        backCard.classList.add('backClicked');
        
        counter++;

        if(beforParrot['card'] === ''){
            beforParrot['card'] = card;
            beforParrot['id'] = cardId;

        }
        else if(beforParrot['id'] === cardId){
            beforParrot['card'] = '';
            beforParrot['id'] = '';
        } 
        else {   
            frontCard.classList.remove('frontClicked');
            backCard.classList.remove('backClicked');            
            frontCard = beforParrot['card'].querySelector('.front');
            backCard = beforParrot['card'].querySelector('.back');
            frontCard.classList.remove('frontClicked');
            backCard.classList.remove('backClicked');    
            beforParrot['card'] = '';
            beforParrot['id'] = '';        
        }
    }
}