const animalEmojis = [
    '🐶', '🐶', '🐱', '🐱', '🐭', '🐭',
    '🐹', '🐹', '🐰', '🐰', '🦊', '🦊'
];
const gameContainer = document.getElementById('game');
let firstCard, secondCard;
let lockBoard = false;

// Shuffle animal emojis
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Create cards
function createCards() {
    const shuffledEmojis = shuffle(animalEmojis);
    shuffledEmojis.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<span class="emoji">${emoji}</span>`;
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}

// Flip card
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Check for match
function checkForMatch() {
    const isMatch = firstCard.innerHTML === secondCard.innerHTML;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Disable cards on match
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

// Unflip cards if no match
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Reset board after each turn
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Initialize game
createCards();
