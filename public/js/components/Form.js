/**
 * Form Component
 * A shadcn/ui-inspired form component with validation
 */
class Form {
  constructor(options = {}) {
    this.options = {
      selector: options.selector || '.contact-form',
      onSubmit: options.onSubmit || this._defaultSubmitHandler,
      validation: options.validation || true
    };
    
    this.init();
  }

  init() {
    const forms = document.querySelectorAll(this.options.selector);
    
    forms.forEach(form => {
      // Style form elements
      this._styleFormElements(form);
      
      // Add validation if enabled
      if (this.options.validation) {
        this._addValidation(form);
      }
      
      // Add submit handler
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        if (this._validateForm(form)) {
          const formData = new FormData(form);
          const data = {};
          
          for (const [key, value] of formData.entries()) {
            data[key] = value;
          }
          
          this.options.onSubmit(data, form);
        }
      });
    });
  }

  _styleFormElements(form) {
    // Style labels
    const labels = form.querySelectorAll('label');
    labels.forEach(label => {
      this._addClasses(label, 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');
    });
    
    // Style inputs
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      this._addClasses(input, 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50');
      
      // Add floating label effect
      const formGroup = input.closest('.form-group');
      if (formGroup) {
        formGroup.style.position = 'relative';
        
        input.addEventListener('focus', () => {
          formGroup.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
          if (!input.value) {
            formGroup.classList.remove('focused');
          }
        });
        
        // Initialize state based on value
        if (input.value) {
          formGroup.classList.add('focused');
        }
      }
    });
    
    // Style buttons
    const buttons = form.querySelectorAll('button');
    buttons.forEach(button => {
      this._addClasses(button, 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background');
    });
  }

  _addValidation(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Add validation message element
      const validationMessage = document.createElement('div');
      validationMessage.classList.add('validation-message');
      validationMessage.style.color = 'red';
      validationMessage.style.fontSize = '0.75rem';
      validationMessage.style.marginTop = '0.25rem';
      validationMessage.style.display = 'none';
      
      input.parentNode.appendChild(validationMessage);
      
      // Add validation on blur
      input.addEventListener('blur', () => {
        this._validateInput(input);
      });
      
      // Add validation on input
      input.addEventListener('input', () => {
        if (input.dataset.hasError === 'true') {
          this._validateInput(input);
        }
      });
    });
  }

  _validateInput(input) {
    const validationMessage = input.parentNode.querySelector('.validation-message');
    let isValid = true;
    let message = '';
    
    // Required validation
    if (input.required && !input.value.trim()) {
      isValid = false;
      message = 'This field is required';
    }
    
    // Email validation
    if (input.type === 'email' && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        isValid = false;
        message = 'Please enter a valid email address';
      }
    }
    
    // Update validation state
    if (!isValid) {
      input.dataset.hasError = 'true';
      input.classList.add('error');
      validationMessage.textContent = message;
      validationMessage.style.display = 'block';
    } else {
      input.dataset.hasError = 'false';
      input.classList.remove('error');
      validationMessage.style.display = 'none';
    }
    
    return isValid;
  }

  _validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this._validateInput(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  _defaultSubmitHandler(data, form) {
    console.log('Form submitted:', data);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.textContent = 'Form submitted successfully!';
    successMessage.style.color = 'green';
    successMessage.style.marginTop = '1rem';
    
    form.appendChild(successMessage);
    
    // Reset form
    form.reset();
    
    // Remove success message after 3 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  }

  _addClasses(element, classString) {
    const classes = classString.split(' ');
    element.classList.add(...classes);
  }
} 