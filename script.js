const recadinhos = [
    { emoji: "🎀", cor: "#ffb6c1", titulo: "Oie!", texto: "Fiz isso aqui especialmente para você." },
    { emoji: "🌧️", cor: "#b6d4ff", titulo: "Eu sei...", texto: "Sei que as coisas andam meio desanimadas ultimamente..." },
    { emoji: "🌤️", cor: "#87cefa", titulo: "Mas lembre-se", texto: "Seu sorriso colore o céu mesmo no dia mais cinzento." },
    { emoji: "✨", cor: "#ffe4b5", titulo: "Mas olha...", texto: "Queria te lembrar do quanto você é especial!" },
    { emoji: "🍓", cor: "#ffc0cb", titulo: "Fato #1", texto: "Você é mais doce que um morango com Nutella." },
    { emoji: "🐱", cor: "#ffffff", titulo: "Fato #2", texto: "E consegue ser mais fofa que a própria Hello Kitty!" },
    { emoji: "🥰", cor: "#ffdae0", titulo: "Sabia?", texto: "Toda vez que eu lembro do seu sorriso, meu dia melhora 100%." },
    { emoji: "🍩", cor: "#f5deb3", titulo: "Vontade do dia", texto: "Queria poder te mandar uma caixa gigante de doces agora..." },
    { emoji: "💌", cor: "#ffb6c1", titulo: "Por enquanto...", texto: "Espero que esses recadinhos virtuais te arranquem um sorriso." },
    { emoji: "💖", cor: "#ffdae0", titulo: "Aviso importante", texto: "Você é incrível, nunca deixe ninguém te convencer do contrário!" },
    { emoji: "🌸", cor: "#e6e6fa", titulo: "Sério!", texto: "Eu adoro passar meu tempo com você. É a melhor companhia." },
    { emoji: "😊", cor: "#ffebcd", titulo: "Um pedido", texto: "Dá um sorrisinho agora vai? Você fica linda sorrindo." },
    { emoji: "👀", cor: "#f0f8ff", titulo: "Eita...", texto: "As cartinhas estão acabando..." },
    { emoji: "🎁", cor: "#ffc0cb", titulo: "Mas calma!", texto: "A melhor parte vem agora no final!" }
];

const container = document.getElementById('card-container');

recadinhos.slice().reverse().forEach((recado, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    
    // Z-index ajustado para garantir que fiquem acima da mensagem final
    card.style.zIndex = 10 + index;

    card.innerHTML = `
        <div class="card-image" style="background-color: ${recado.cor}">
            ${recado.emoji}
        </div>
        <div class="card-content">
            <h3>${recado.titulo}</h3>
            <p>${recado.texto}</p>
        </div>
    `;
    
    container.appendChild(card);
});

const cards = document.querySelectorAll('.card');

let startX = 0;
let currentX = 0;
let isDragging = false;
let currentCard = null;

cards.forEach(card => {
    card.addEventListener('touchstart', dragStart);
    card.addEventListener('touchmove', dragMove);
    card.addEventListener('touchend', dragEnd);

    card.addEventListener('mousedown', dragStart);
    window.addEventListener('mousemove', dragMove);
    window.addEventListener('mouseup', dragEnd);
});

function dragStart(e) {
    if (e.type === 'touchstart') {
        startX = e.touches[0].clientX;
    } else {
        startX = e.clientX;
    }
    
    isDragging = true;
    currentCard = this;
    
    if (e.type === 'mousedown') {
        currentCard = e.target.closest('.card');
        if (!currentCard) {
            isDragging = false;
            return;
        }
    }

    currentCard.style.transition = 'none';
}

function dragMove(e) {
    if (!isDragging || !currentCard) return;
    
    if (e.type === 'touchmove') {
        currentX = e.touches[0].clientX;
    } else {
        currentX = e.clientX;
    }

    const moveX = currentX - startX;
    const rotate = moveX * 0.05; 
    
    currentCard.style.transform = `translateX(${moveX}px) rotate(${rotate}deg)`;
}

function dragEnd() {
    if (!isDragging || !currentCard) return;
    isDragging = false;

    const moveX = currentX - startX;
    
    if (Math.abs(moveX) > 80) {
        const endX = moveX > 0 ? window.innerWidth + 200 : -window.innerWidth - 200;
        currentCard.style.transition = 'transform 0.5s ease-out';
        currentCard.style.transform = `translateX(${endX}px) rotate(${moveX * 0.1}deg)`;
        
        const cardToRemove = currentCard;
        setTimeout(() => {
            cardToRemove.remove();
        }, 500);
    } else {
        currentCard.style.transition = 'transform 0.3s ease-out';
        currentCard.style.transform = `translateX(0px) rotate(0deg)`;
    }
    
    currentCard = null;
}

const btnObs = document.getElementById('btn-obs');
const modalAmor = document.getElementById('modal-amor');
const btnFechar = document.getElementById('btn-fechar-modal');

btnObs.addEventListener('click', () => {
    modalAmor.classList.add('ativo');
});

btnFechar.addEventListener('click', () => {
    modalAmor.classList.remove('ativo');
});
