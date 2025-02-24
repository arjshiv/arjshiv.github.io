/**
 * Card Component
 * A shadcn/ui-inspired card component with variants
 */
class Card {
  constructor(options = {}) {
    this.options = {
      selector: options.selector || '.modern-card',
      variants: {
        default: 'rounded-lg border bg-card text-card-foreground shadow-sm',
        interactive: 'rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer',
        glass: 'rounded-lg backdrop-blur-lg bg-white/10 border border-white/20 text-card-foreground shadow-sm'
      }
    };
    
    this.init();
  }

  init() {
    const cards = document.querySelectorAll(this.options.selector);
    
    cards.forEach(card => {
      // Add base styles
      if (card.classList.contains('interactive')) {
        this._addClasses(card, this.options.variants.interactive);
        this._addInteractiveEffects(card);
      } else if (card.classList.contains('glass')) {
        this._addClasses(card, this.options.variants.glass);
      } else {
        this._addClasses(card, this.options.variants.default);
      }
      
      // Add header, content, and footer styling if they exist
      const header = card.querySelector('.card-header');
      const content = card.querySelector('.card-content');
      const footer = card.querySelector('.card-footer');
      
      if (header) {
        this._addClasses(header, 'flex flex-col space-y-1.5 p-6');
      }
      
      if (content) {
        this._addClasses(content, 'p-6 pt-0');
      }
      
      if (footer) {
        this._addClasses(footer, 'flex items-center p-6 pt-0');
      }
    });
  }

  _addClasses(element, classString) {
    const classes = classString.split(' ');
    element.classList.add(...classes);
  }

  _addInteractiveEffects(card) {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  }
} 