window.onload = function(){
    startGame();
}

let intervalTimer;
let numberOfCards = 0;
let pairOfCards = 0; // quantidade de pares acertados
let atteptCounter = 0;
let beforCard = {card: '', id: '' };
let seeNextCard = true;
let timer = 0;

const clockElement = document.querySelector('.clock time');
const deckElement = document.querySelector(".deck_cards");

const images = ["bobross","explody","fiesta","metal","revertit","triplets","unicorn"]; // nome dos gifs

function clock(){
    clockElement.innerHTML = ++timer;
}

function startGame(){
    deckElement.innerHTML = '';
    clockElement.innerHTML = '0';
    pairOfCards = 0;
    atteptCounter = 0;
    numberOfCards = checkNumber();
    buildGame(numberOfCards);
    intervalTimer = setInterval(clock, 1000);
}

// monta as cartas na tela
function buildGame(num){
    images.sort(comparator);
    auxImages = [];

    // insere os pares de imagens no array
    for(i = 0; i < num/2; i++){
        auxImages.push(images[i]);
        auxImages.push(images[i]);
    }

    // embaralha as cartas duas vezes
    auxImages.sort(comparator).sort(comparator);
    // para cada imagens do vertor é criado e inserido um cartão na tela
    auxImages.forEach( img => deckElement.appendChild(addCard(img)));
}

// Embaralhar array a partir do sort()
function comparator() { 
	return Math.random() - 0.5; 
}


/* Cria uma carta com o gif de fundo passado por parametro*/
function addCard(gif){
    // cria a carta
    const divCard = document.createElement("figure");
    divCard.setAttribute('id',`${gif}`);
    divCard.setAttribute('class', 'card');
    divCard.setAttribute('onclick', 'cardSelect(this, this.id)');
    divCard.setAttribute('data-identifier', 'card');
    // cria frent da carta
    const front = document.createElement("figure");
    front.setAttribute('class', 'face front');
    front.setAttribute('data-identifier', 'front-face');
    // cria fundo da carta
    const back = document.createElement("figure");
    back.setAttribute('class', 'face back');
    back.setAttribute('data-identifier', 'back-face');
    
    const imgParrot = document.createElement("img");
    const gifParrot = document.createElement("img");

    // Insere as imagens no front e no back da carta
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
    while(true){
        pairNumber = parseInt(prompt('Com quantas cartas você quer jogar (numeros pares de 4 a 14)?'));
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


/*  -- Implementação das funções do jogo -- */

function cardSelect(cardClicked, cardId){
    const card = cardClicked;
    let frontCard = card.querySelector('.front');
    let backCard = card.querySelector('.back');

    //se a carta estiver virada e o setTimout não estiver contando
    if(!frontCard.classList.contains('frontClicked') && seeNextCard){     
        
        frontCard.classList.add('frontClicked');
        backCard.classList.add('backClicked');

        
        atteptCounter++;

        // Se for a primeira carta do par aberta
        if(beforCard.card === ''){
            beforCard.card = card;
            beforCard.id = cardId;

        }
        // se a segunda carta for o par
        else if(beforCard.id === cardId){
            beforCard.card = '';
            beforCard.id = '';
            pairOfCards++;
        } 
        // se a segunda carta não for o par
        else {   
            seeNextCard = false;
            setTimeout(() => {
                frontCard.classList.remove('frontClicked');
                backCard.classList.remove('backClicked');            
                frontCard = beforCard.card.querySelector('.front');
                backCard = beforCard.card.querySelector('.back');
                frontCard.classList.remove('frontClicked');
                backCard.classList.remove('backClicked');    
                beforCard.card = '';
                beforCard.id = ''; 
                seeNextCard = true;
            }, 1000);     
        }
    }

    // Caso tenha acertado todas as cartas
    if(numberOfCards/2 === pairOfCards){
        clearInterval(intervalTimer);
        setTimeout(() => {
            alert(`Você ganhou em ${atteptCounter} jogadas e em ${timer} segundos!`);
            if(prompt('Quer jogar novamente? [s ou n]').toUpperCase === 'S'){
                timer = 0;
                startGame();
            }
            else {
                alert('Show de bolinha!');
            }
        }, 150);
    }
}