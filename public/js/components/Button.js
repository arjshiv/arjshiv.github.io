/**
 * Button Component
 * A shadcn/ui-inspired button component with variants
 */
class Button {
  constructor(options = {}) {
    this.options = {
      selector: options.selector || '.btn',
      variants: {
        default: {
          base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
          variants: {
            primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
            outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'underline-offset-4 hover:underline text-primary'
          }
        }
      }
    };
    
    this.init();
  }

  init() {
    const buttons = document.querySelectorAll(this.options.selector);
    
    buttons.forEach(button => {
      // Add base styles
      this._addClasses(button, this.options.variants.default.base);
      
      // Add variant styles
      if (button.classList.contains('primary')) {
        this._addClasses(button, this.options.variants.default.variants.primary);
      } else if (button.classList.contains('secondary')) {
        this._addClasses(button, this.options.variants.default.variants.secondary);
      } else if (button.classList.contains('outline')) {
        this._addClasses(button, this.options.variants.default.variants.outline);
      } else if (button.classList.contains('ghost')) {
        this._addClasses(button, this.options.variants.default.variants.ghost);
      } else if (button.classList.contains('link')) {
        this._addClasses(button, this.options.variants.default.variants.link);
      }
      
      // Add hover effect
      this._addHoverEffect(button);
      
      // Add ripple effect on click
      button.addEventListener('click', this._handleClick.bind(this));
    });
  }

  _addClasses(element, classString) {
    const classes = classString.split(' ');
    element.classList.add(...classes);
  }

  _addHoverEffect(button) {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 4px 14px 0 rgba(0, 0, 0, 0.1)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = 'none';
    });
  }

  _handleClick(event) {
    const button = event.currentTarget;
    
    // Create ripple effect
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
} 