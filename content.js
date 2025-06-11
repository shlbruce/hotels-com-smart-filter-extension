function getSelectedFilters() {
    const filters = {};
  
    // Example: checkboxes for star ratings
    document.querySelectorAll('[data-stid*="star-rating"] input[type="checkbox"]').forEach(input => {
      filters[input.name] = input.checked;
    });
  
    // Add more filter types here as needed
    return filters;
  }
  
  function applySavedFilters(saved) {
    for (const [name, value] of Object.entries(saved)) {
      const el = document.querySelector(`input[name="${name}"]`);
      if (el) {
        el.checked = value;
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }
  
  function saveFilters() {
    const filters = getSelectedFilters();
    chrome.storage.local.set({ "hotelFilters": filters });
  }
  
  function loadAndApplyFilters() {
    chrome.storage.local.get("hotelFilters", (data) => {
      if (data.hotelFilters) {
        applySavedFilters(data.hotelFilters);
      }
    });
  }
  
  // Save when any checkbox changes
  document.addEventListener("change", (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      saveFilters();
    }
  });
  
  // Apply on load
  window.addEventListener("load", () => {
    setTimeout(loadAndApplyFilters, 2000); // Wait for filters to render
  });
  