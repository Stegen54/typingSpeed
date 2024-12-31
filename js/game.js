class TypeQuest {
    constructor() {
        this.playerName = '';
        this.character = '';
        this.score = 0;
        this.wpm = 0;
        this.accuracy = 100;
        this.currentLevel = 0;
        
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
    }

    startGame() {
        this.playerName = this.playerNameInput.value.trim();
        if (!this.playerName || !this.character) {
            alert('Please enter your name and select a character!');
            return;
        }
        
        this.startScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');
        this.loadLevel();
    }

    loadLevel() {
        // TODO: Load level content from gameData
        this.textDisplay.textContent = "Welcome brave adventurer! Type this text to begin your quest.";
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
        if (typed === target) {
            this.completeLevel();
        }
    }

    completeLevel() {
        this.score += 100;
        this.scoreDisplay.textContent = `Score: ${this.score}`;
        this.currentLevel++;
        this.loadLevel();
    }
}

// Start the game when the page loads
window.addEventListener('DOMContentLoaded', () => {
    const game = new TypeQuest();
});