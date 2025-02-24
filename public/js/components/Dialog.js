/**
 * Dialog Component
 * A shadcn/ui-inspired dialog/modal component
 */
class Dialog {
  constructor(options = {}) {
    this.options = {
      id: options.id || `dialog-${Math.random().toString(36).substring(2, 9)}`,
      title: options.title || '',
      content: options.content || '',
      closeOnOverlayClick: options.closeOnOverlayClick !== undefined ? options.closeOnOverlayClick : true,
      showCloseButton: options.showCloseButton !== undefined ? options.showCloseButton : true,
      onOpen: options.onOpen || null,
      onClose: options.onClose || null
    };
    
    this.isOpen = false;
    this.dialog = null;
    this.overlay = null;
    
    this.init();
  }

  init() {
    // Create dialog element
    this.dialog = document.createElement('div');
    this.dialog.id = this.options.id;
    this.dialog.classList.add('dialog');
    this.dialog.setAttribute('role', 'dialog');
    this.dialog.setAttribute('aria-modal', 'true');
    this.dialog.setAttribute('aria-labelledby', `${this.options.id}-title`);
    this.dialog.setAttribute('aria-describedby', `${this.options.id}-description`);
    
    // Set dialog styles
    this.dialog.style.position = 'fixed';
    this.dialog.style.top = '50%';
    this.dialog.style.left = '50%';
    this.dialog.style.transform = 'translate(-50%, -50%) scale(0.95)';
    this.dialog.style.width = '90%';
    this.dialog.style.maxWidth = '500px';
    this.dialog.style.maxHeight = '85vh';
    this.dialog.style.padding = '1.5rem';
    this.dialog.style.borderRadius = '0.5rem';
    this.dialog.style.backgroundColor = 'hsl(0, 0%, 100%)';
    this.dialog.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    this.dialog.style.zIndex = '9999';
    this.dialog.style.opacity = '0';
    this.dialog.style.visibility = 'hidden';
    this.dialog.style.transition = 'all 0.2s ease-in-out';
    this.dialog.style.overflow = 'auto';
    
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.classList.add('dialog-overlay');
    
    // Set overlay styles
    this.overlay.style.position = 'fixed';
    this.overlay.style.inset = '0';
    this.overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    this.overlay.style.zIndex = '9998';
    this.overlay.style.opacity = '0';
    this.overlay.style.visibility = 'hidden';
    this.overlay.style.transition = 'all 0.2s ease-in-out';
    
    // Create dialog content
    const dialogContent = document.createElement('div');
    dialogContent.classList.add('dialog-content');
    
    // Create dialog header
    const dialogHeader = document.createElement('div');
    dialogHeader.classList.add('dialog-header');
    dialogHeader.style.display = 'flex';
    dialogHeader.style.justifyContent = 'space-between';
    dialogHeader.style.alignItems = 'center';
    dialogHeader.style.marginBottom = '1rem';
    
    // Create dialog title
    const dialogTitle = document.createElement('h2');
    dialogTitle.id = `${this.options.id}-title`;
    dialogTitle.classList.add('dialog-title');
    dialogTitle.textContent = this.options.title;
    dialogTitle.style.margin = '0';
    dialogTitle.style.fontSize = '1.25rem';
    dialogTitle.style.fontWeight = '600';
    
    // Create close button if enabled
    if (this.options.showCloseButton) {
      const closeButton = document.createElement('button');
      closeButton.classList.add('dialog-close');
      closeButton.innerHTML = '&times;';
      closeButton.style.background = 'transparent';
      closeButton.style.border = 'none';
      closeButton.style.fontSize = '1.5rem';
      closeButton.style.cursor = 'pointer';
      closeButton.style.color = 'hsl(215.4, 16.3%, 46.9%)';
      closeButton.style.padding = '0.25rem';
      closeButton.style.lineHeight = '1';
      
      closeButton.addEventListener('mouseenter', () => {
        closeButton.style.color = 'hsl(222.2, 84%, 4.9%)';
      });
      
      closeButton.addEventListener('mouseleave', () => {
        closeButton.style.color = 'hsl(215.4, 16.3%, 46.9%)';
      });
      
      closeButton.addEventListener('click', () => {
        this.close();
      });
      
      dialogHeader.appendChild(closeButton);
    }
    
    // Create dialog body
    const dialogBody = document.createElement('div');
    dialogBody.id = `${this.options.id}-description`;
    dialogBody.classList.add('dialog-body');
    
    // Set content
    if (typeof this.options.content === 'string') {
      dialogBody.innerHTML = this.options.content;
    } else if (this.options.content instanceof HTMLElement) {
      dialogBody.appendChild(this.options.content);
    }
    
    // Assemble dialog
    dialogHeader.prepend(dialogTitle);
    dialogContent.appendChild(dialogHeader);
    dialogContent.appendChild(dialogBody);
    this.dialog.appendChild(dialogContent);
    
    // Add click event to overlay
    if (this.options.closeOnOverlayClick) {
      this.overlay.addEventListener('click', () => {
        this.close();
      });
    }
    
    // Add to body
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.dialog);
    
    // Add keyboard event
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open() {
    if (this.isOpen) return;
    
    this.isOpen = true;
    
    // Show overlay
    this.overlay.style.visibility = 'visible';
    this.overlay.style.opacity = '1';
    
    // Show dialog
    this.dialog.style.visibility = 'visible';
    this.dialog.style.opacity = '1';
    this.dialog.style.transform = 'translate(-50%, -50%) scale(1)';
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Call onOpen callback
    if (typeof this.options.onOpen === 'function') {
      this.options.onOpen();
    }
    
    // Focus first focusable element
    setTimeout(() => {
      const focusableElements = this.dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }, 100);
  }

  close() {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    
    // Hide dialog
    this.dialog.style.opacity = '0';
    this.dialog.style.transform = 'translate(-50%, -50%) scale(0.95)';
    
    // Hide overlay
    this.overlay.style.opacity = '0';
    
    // Restore body scrolling
    document.body.style.overflow = '';
    
    // Call onClose callback
    if (typeof this.options.onClose === 'function') {
      this.options.onClose();
    }
    
    // Hide elements after transition
    setTimeout(() => {
      this.dialog.style.visibility = 'hidden';
      this.overlay.style.visibility = 'hidden';
    }, 200);
  }

  setContent(content) {
    const dialogBody = this.dialog.querySelector('.dialog-body');
    
    if (!dialogBody) return;
    
    // Clear existing content
    dialogBody.innerHTML = '';
    
    // Set new content
    if (typeof content === 'string') {
      dialogBody.innerHTML = content;
    } else if (content instanceof HTMLElement) {
      dialogBody.appendChild(content);
    }
  }

  setTitle(title) {
    const dialogTitle = this.dialog.querySelector('.dialog-title');
    
    if (dialogTitle) {
      dialogTitle.textContent = title;
    }
  }

  destroy() {
    // Remove elements
    if (this.dialog && this.dialog.parentNode) {
      this.dialog.parentNode.removeChild(this.dialog);
    }
    
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
    
    // Reset body overflow
    document.body.style.overflow = '';
  }
} 