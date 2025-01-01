class TypeQuest {
    constructor() {
        this.playerName = '';
        this.character = '';
        this.score = 0;
        this.wpm = 0;
        this.accuracy = 100;
        this.currentLevel = 0;
        this.startTime = 0;
        
        // Add these properties
        this.timerInterval = null;
        this.timeElapsed = 0;

        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        // Screens
        this.startScreen = document.getElementById('start-screen');
        this.gameScreen = document.getElementById('game-screen');
        
        // Input elements
        this.playerNameInput = document.getElementById('player-name');
        this.typingInput = document.getElementById('typing-input');
        
        // Display elements
        this.textDisplay = document.getElementById('text-display');
        this.wpmDisplay = document.getElementById('wpm');
        this.accuracyDisplay = document.getElementById('accuracy');
        this.scoreDisplay = document.getElementById('score');
        
        // Add these elements
        this.timerDisplay = document.getElementById('timer');
        this.nextButton = document.getElementById('next-challenge');

        // Buttons
        this.startButton = document.getElementById('start-game');
        this.characterButtons = document.querySelectorAll('.character-select button');
    }

    bindEvents() {
        this.startButton.addEventListener('click', () => this.startGame());
        this.characterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.character = e.target.dataset.character;
                this.characterButtons.forEach(btn => btn.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });
        this.typingInput.addEventListener('input', (e) => this.handleTyping(e));

        // Add this event
        this.nextButton.addEventListener('click', () => this.loadNextChallenge());
    }

    startTimer() {
        this.timeElapsed = 0;
        this.startTime = Date.now();
        this.timerInterval = setInterval(() => {
            this.timeElapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(this.timeElapsed / 60);
            const seconds = this.timeElapsed % 60;
            this.timerDisplay.textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timerInterval);
    }

    loadNextChallenge() {
        this.currentLevel++;
        this.typingInput.value = '';
        this.nextButton.classList.add('hidden');
        this.loadLevel();
        this.startTimer();
    }

    startGame() {
        this.playerName = this.playerNameInput.value.trim();
        if (!this.playerName || !this.character) {
            alert('Please enter your name and select a character!');
            return;
        }
        
        this.startScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.startTime = Date.now();
        this.loadLevel();

        // Add timer start
        this.startTimer();
    }

    loadLevel() {
        if (this.currentLevel >= gameData.levels.length) {
            alert('Congratulations! You have completed all levels.');
            this.resetGame();
            return;
        }

        const level = gameData.levels[this.currentLevel];
        document.getElementById('story-text').textContent = level.story;
        this.textDisplay.textContent = level.text;
        this.typingInput.value = '';
        this.startTime = Date.now();
    }

    handleTyping(e) {
        const typed = e.target.value;
        const target = this.textDisplay.textContent;
        
        // Simple WPM calculation
        const words = typed.split(' ').length;
        const minutes = (Date.now() - this.startTime) / 60000;
        this.wpm = Math.round(words / minutes);
        
        // Update displays
        this.wpmDisplay.textContent = `WPM: ${this.wpm}`;
        
        // Check if completed
        const level = gameData.levels[this.currentLevel];
        if (typed === target && this.wpm >= level.minWPM) {
            this.completeLevel();
        }
    }

    completeLevel() {
        this.stopTimer();
        this.score += Math.max(100 - Math.floor(this.timeElapsed / 2), 10);
        this.scoreDisplay.textContent = `Score: ${this.score}`;
        this.nextButton.classList.remove('hidden');
    }

    resetGame() {
        this.score = 0;
        this.currentLevel = 0;
        this.startScreen.classList.remove('hidden');
        this.gameScreen.classList.add('hidden');
    }
}

// Start the game when the page loads
window.addEventListener('DOMContentLoaded', () => {
    const game = new TypeQuest();
});