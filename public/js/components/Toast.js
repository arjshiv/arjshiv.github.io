/**
 * Toast Component
 * A shadcn/ui-inspired toast notification component
 */
class Toast {
  constructor(options = {}) {
    this.options = {
      position: options.position || 'bottom-right',
      duration: options.duration || 5000,
      maxToasts: options.maxToasts || 3
    };
    
    this.toasts = [];
    this.container = null;
    
    this.init();
  }

  init() {
    // Create toast container
    this.container = document.createElement('div');
    this.container.classList.add('toast-container');
    
    // Set position
    this.container.style.position = 'fixed';
    this.container.style.zIndex = '9999';
    
    switch (this.options.position) {
      case 'top-right':
        this.container.style.top = '1rem';
        this.container.style.right = '1rem';
        break;
      case 'top-left':
        this.container.style.top = '1rem';
        this.container.style.left = '1rem';
        break;
      case 'bottom-left':
        this.container.style.bottom = '1rem';
        this.container.style.left = '1rem';
        break;
      case 'bottom-right':
      default:
        this.container.style.bottom = '1rem';
        this.container.style.right = '1rem';
        break;
    }
    
    // Add container to body
    document.body.appendChild(this.container);
  }

  show({ title, description, type = 'default', duration = this.options.duration }) {
    // Create toast element
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.setAttribute('role', 'alert');
    
    // Set toast styles
    toast.style.display = 'flex';
    toast.style.alignItems = 'flex-start';
    toast.style.justifyContent = 'space-between';
    toast.style.width = '350px';
    toast.style.padding = '1rem';
    toast.style.borderRadius = '0.5rem';
    toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    toast.style.marginBottom = '0.75rem';
    toast.style.transform = 'translateX(100%)';
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.3s ease-in-out';
    
    // Set background color based on type
    switch (type) {
      case 'success':
        toast.style.backgroundColor = 'hsl(142.1, 76.2%, 36.3%)';
        toast.style.color = 'white';
        break;
      case 'error':
        toast.style.backgroundColor = 'hsl(0, 84.2%, 60.2%)';
        toast.style.color = 'white';
        break;
      case 'warning':
        toast.style.backgroundColor = 'hsl(38, 92.7%, 50.2%)';
        toast.style.color = 'black';
        break;
      case 'info':
        toast.style.backgroundColor = 'hsl(221.2, 83.2%, 53.3%)';
        toast.style.color = 'white';
        break;
      default:
        toast.style.backgroundColor = 'hsl(0, 0%, 100%)';
        toast.style.color = 'hsl(222.2, 84%, 4.9%)';
        toast.style.border = '1px solid hsl(214.3, 31.8%, 91.4%)';
        break;
    }
    
    // Create toast content
    const content = document.createElement('div');
    content.classList.add('toast-content');
    content.style.flex = '1';
    
    if (title) {
      const titleElement = document.createElement('div');
      titleElement.classList.add('toast-title');
      titleElement.textContent = title;
      titleElement.style.fontWeight = 'bold';
      titleElement.style.marginBottom = '0.25rem';
      content.appendChild(titleElement);
    }
    
    if (description) {
      const descriptionElement = document.createElement('div');
      descriptionElement.classList.add('toast-description');
      descriptionElement.textContent = description;
      descriptionElement.style.fontSize = '0.875rem';
      content.appendChild(descriptionElement);
    }
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.classList.add('toast-close');
    closeButton.innerHTML = '&times;';
    closeButton.style.background = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '1.25rem';
    closeButton.style.marginLeft = '0.5rem';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = 'inherit';
    closeButton.style.opacity = '0.7';
    
    closeButton.addEventListener('mouseenter', () => {
      closeButton.style.opacity = '1';
    });
    
    closeButton.addEventListener('mouseleave', () => {
      closeButton.style.opacity = '0.7';
    });
    
    closeButton.addEventListener('click', () => {
      this.dismiss(toast);
    });
    
    // Assemble toast
    toast.appendChild(content);
    toast.appendChild(closeButton);
    
    // Add to container
    this.container.appendChild(toast);
    
    // Manage toast queue
    this.toasts.push(toast);
    
    // Remove excess toasts
    while (this.toasts.length > this.options.maxToasts) {
      const oldestToast = this.toasts.shift();
      this.dismiss(oldestToast);
    }
    
    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    }, 10);
    
    // Auto dismiss
    if (duration !== Infinity) {
      toast.timeoutId = setTimeout(() => {
        this.dismiss(toast);
      }, duration);
    }
    
    // Add hover pause
    toast.addEventListener('mouseenter', () => {
      if (toast.timeoutId) {
        clearTimeout(toast.timeoutId);
      }
    });
    
    toast.addEventListener('mouseleave', () => {
      if (duration !== Infinity) {
        toast.timeoutId = setTimeout(() => {
          this.dismiss(toast);
        }, duration);
      }
    });
    
    return toast;
  }

  dismiss(toast) {
    // Clear timeout if exists
    if (toast.timeoutId) {
      clearTimeout(toast.timeoutId);
    }
    
    // Animate out
    toast.style.transform = 'translateX(100%)';
    toast.style.opacity = '0';
    
    // Remove after animation
    setTimeout(() => {
      if (toast.parentNode === this.container) {
        this.container.removeChild(toast);
      }
      
      // Remove from array
      const index = this.toasts.indexOf(toast);
      if (index > -1) {
        this.toasts.splice(index, 1);
      }
    }, 300);
  }

  success(options) {
    return this.show({ ...options, type: 'success' });
  }

  error(options) {
    return this.show({ ...options, type: 'error' });
  }

  warning(options) {
    return this.show({ ...options, type: 'warning' });
  }

  info(options) {
    return this.show({ ...options, type: 'info' });
  }
} 