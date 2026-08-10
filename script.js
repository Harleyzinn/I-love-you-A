const cards = document.querySelectorAll('.card');
const container = document.getElementById('card-container');

// Variáveis para rastrear o toque
let startX = 0;
let currentX = 0;
let isDragging = false;
let currentCard = null;

// Organiza as camadas dos cartões (o último do HTML fica no topo)
cards.forEach((card, index) => {
    card.style.zIndex = cards.length - index;
});

// Adiciona os eventos de toque aos cartões
cards.forEach(card => {
    // Quando ela encostar o dedo na tela
    card.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        currentCard = card;
        
        // Remove a transição suave para grudar o cartão no dedo
        currentCard.style.transition = 'none'; 
    });

    // Quando ela arrastar o dedo
    card.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        currentX = e.touches[0].clientX;
        const moveX = currentX - startX;
        
        // Gira o cartão de leve conforme move para os lados
        const rotate = moveX * 0.05; 
        
        currentCard.style.transform = `translateX(${moveX}px) rotate(${rotate}deg)`;
    });

    // Quando ela soltar a tela
    card.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;

        const moveX = currentX - startX;
        
        // Se ela arrastou mais de 100 pixels, o cartão sai voando
        if (Math.abs(moveX) > 100) {
            const endX = moveX > 0 ? window.innerWidth : -window.innerWidth;
            currentCard.style.transition = 'transform 0.5s ease-out';
            currentCard.style.transform = `translateX(${endX}px) rotate(${moveX * 0.1}deg)`;
            
            // Remove o cartão da tela depois da animação
            setTimeout(() => {
                currentCard.remove();
            }, 500);
        } else {
            // Se ela arrastou pouco, o cartão volta pro meio (efeito mola)
            currentCard.style.transition = 'transform 0.3s ease-out';
            currentCard.style.transform = `translateX(0px) rotate(0deg)`;
        }
        
        currentCard = null;
    });
});
