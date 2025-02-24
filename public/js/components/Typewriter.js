class Typewriter {
    constructor(options) {
        this.text = options.text;
        this.highlightedText = options.highlightedText;
        this.speed = options.speed || 100;
        this.element = document.querySelector(options.selector);
        this.displayText = '';
        this.currentIndex = 0;
        this.fullText = `${this.text} ${this.highlightedText}`;
        this.init();
    }

    init() {
        this.element.innerHTML = `
            <span class="base-text"></span>
            <span class="highlight"></span>
            <span class="cursor">|</span>
        `;
        this.baseTextElement = this.element.querySelector('.base-text');
        this.highlightElement = this.element.querySelector('.highlight');
        this.cursorElement = this.element.querySelector('.cursor');
        this.type();
    }

    type() {
        if (this.currentIndex < this.fullText.length) {
            this.displayText = this.fullText.slice(0, this.currentIndex + 1);
            const baseText = this.text.slice(0, this.displayText.length);
            const highlightedPortion = this.displayText.slice(this.text.length + 1);
            
            this.baseTextElement.textContent = baseText;
            if (this.displayText.length > this.text.length) {
                this.baseTextElement.textContent += ' ';
                this.highlightElement.textContent = highlightedPortion;
            }
            
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        }
    }
} 