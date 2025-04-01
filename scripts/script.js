let words = [];
let selectedWord = "";
let hint = "";
let guessedLetters = [];
let wrongGuesses = 0;

async function loadWords() {
    const response = await fetch("data/words.json");
    words = await response.json();
    startGame();
}
//TESTTT
function startGame() {
    const randomIndex = Math.floor(Math.random() * words.length);
    selectedWord = words[randomIndex].word.toLowerCase(); 
    hint = words[randomIndex].hint;
    guessedLetters = [];
    wrongGuesses = 0;

    updateDisplay();
    updateHangman();

    document.getElementById('hint').textContent = `Hint: ${hint}`;
    document.getElementById('result').textContent = "";
    document.getElementById('play-again-btn').style.display = 'none';
}

function updateDisplay() {
    let displayWord = selectedWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');

    document.getElementById('word-display').textContent = displayWord;

    if (!displayWord.includes('_')) {
        endGame(true);
    }
}

function handleGuess() {
    const letter = document.getElementById('letter-input').value.toLowerCase();

    if (!letter || guessedLetters.includes(letter)) return;

    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        updateDisplay(); 
    } else {
        wrongGuesses++;
        console.log("Wrong guesses count:", wrongGuesses);
        updateHangman(); 
    }

    if (wrongGuesses >= 6) {
        endGame(false);
    }

    document.getElementById('letter-input').value = '';
}

function updateHangman() {
    const imgPath = `images/hangman0${wrongGuesses}.png`;
    console.log("Image path:", imgPath);
  
    const img = document.createElement("img");
    img.src = imgPath;
    img.alt = "Hangman";
    img.classList.add("fade-in"); 
  
    const graphic = document.getElementById("hangman-graphic");
    graphic.innerHTML = ""; 
    graphic.appendChild(img); 
}
  

function endGame(won) {
    document.getElementById('result').textContent = won
        ? 'You Win!'
        : `You Lose! The word was ${selectedWord}`;
    document.getElementById('play-again-btn').style.display = 'block';
}

document.getElementById('guess-btn').addEventListener('click', handleGuess);
document.getElementById('play-again-btn').addEventListener('click', startGame);

loadWords();
