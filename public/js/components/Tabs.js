/**
 * Tabs Component
 * A shadcn/ui-inspired tabs component
 */
class Tabs {
  constructor(options = {}) {
    this.options = {
      selector: options.selector || '.tabs',
      activeClass: options.activeClass || 'active',
      defaultTab: options.defaultTab || 0
    };
    
    this.init();
  }

  init() {
    const tabsContainers = document.querySelectorAll(this.options.selector);
    
    tabsContainers.forEach(container => {
      // Style tabs container
      this._addClasses(container, 'w-full');
      
      // Get tabs and panels
      const tabList = container.querySelector('.tabs-list');
      const tabPanels = container.querySelector('.tabs-content');
      
      if (!tabList || !tabPanels) return;
      
      // Style tab list
      this._addClasses(tabList, 'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground');
      
      // Get all tabs and panels
      const tabs = Array.from(tabList.children);
      const panels = Array.from(tabPanels.children);
      
      // Style tabs and panels
      tabs.forEach((tab, index) => {
        // Style tab
        this._addClasses(tab, 'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm cursor-pointer');
        
        // Set initial active state
        if (index === this.options.defaultTab) {
          tab.setAttribute('data-state', 'active');
          panels[index].setAttribute('data-state', 'active');
          panels[index].style.display = 'block';
        } else {
          tab.setAttribute('data-state', 'inactive');
          panels[index].setAttribute('data-state', 'inactive');
          panels[index].style.display = 'none';
        }
        
        // Add click event
        tab.addEventListener('click', () => {
          this._setActiveTab(tabs, panels, index);
        });
      });
      
      // Style panels
      panels.forEach(panel => {
        this._addClasses(panel, 'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-2');
      });
    });
  }

  _setActiveTab(tabs, panels, activeIndex) {
    tabs.forEach((tab, index) => {
      if (index === activeIndex) {
        tab.setAttribute('data-state', 'active');
        panels[index].setAttribute('data-state', 'active');
        panels[index].style.display = 'block';
      } else {
        tab.setAttribute('data-state', 'inactive');
        panels[index].setAttribute('data-state', 'inactive');
        panels[index].style.display = 'none';
      }
    });
  }

  _addClasses(element, classString) {
    const classes = classString.split(' ');
    element.classList.add(...classes);
  }
} 