function hangman() {
    // Create an array of words
    var words = [
        "javascript",
        "monkey",
        "amazing",
        "pancake",
        "virtuous",
        "formidable",
        "bored",
        "coronation"
    ];
    // Pick a random word
    var word = words[Math.floor(Math.random() * words.length)];
    // Set up the answer array
    var answerArray = [];
    var guessedLetters = [];
    for (var i = 0; i < word.length; i++) {
        answerArray[i] = "_";
    }
    var remainingLetters = word.length;
    var guessCount = word.length + 6;
    // The game loop
    while (remainingLetters > 0) {
        // Show the player their progress
        guessCount -= 1;
        alert(answerArray.join(" ") + ": You have " + guessCount + " guess(es) remaining.");
        // Get a guess from the player
        var guess = prompt("Guess a letter, or click Cancel to stop playing.").toLowerCase();
        var guessData = {
            guess: guess,
            guessCount: guessCount,
            guessedLetters: guessedLetters,
            word: word,
            answerArray: answerArray,
            remainingLetters: remainingLetters
        };
        evaluateGuess(guessData);
        remainingLetters = guessData.remainingLetters;
        guessCount = guessData.guessCount;
        if (remainingLetters === 0) {
            break;
        }
    }
    // Show the answer and congratulate the player
    alert(answerArray.join(" "));
    alert("Thanks for playing! The answer was " + word);
}

function evaluateGuess(guessData) {
    if (guessData.guess === null) {
        // Exit the game loop
        guessData.remainingLetters = 0;
    } else if (guessData.guessCount <= 0) {
        alert("Sorry you've run out of guesses.");
        guessData.remainingLetters = 0;
    } else if (guessData.guess.length !== 1) {
        alert("Please enter a single letter.");
    } else if (isInArray(guessData.guessedLetters, guessData.guess)) {
        alert("You've already guessed this letter.");
        guessData.guessCount += 1;
    } else {
        guessData.guessedLetters.push(guessData.guess);
        // Update the game state with the guess
        for (var j = 0; j < guessData.word.length; j++) {
            if (guessData.word[j] === guessData.guess) {
                guessData.answerArray[j] = guessData.guess;
                guessData.remainingLetters--;
            }
        }
    }
}

function isInArray(word, guess) {
    for (var j = 0; j < word.length; j++) {
        if (word[j] === guess) {
            return true;
        }
    }
    return false;
}
hangman();