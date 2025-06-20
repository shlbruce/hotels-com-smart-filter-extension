function setupTabPanels() {
  const tabButtons = [
    document.getElementById("general-tab-button"),
    document.getElementById("property-type-tab-button"),
    document.getElementById("amenities-tab-button"),
    document.getElementById("accessibility-tab-button"),
    document.getElementById("property-brand-tab-button"),
    document.getElementById("faq-tab-button")
  ];

  const tabContents = [
    document.getElementById("general-tab"),
    document.getElementById("property-type-tab"),
    document.getElementById("amenities-tab"),
    document.getElementById("accessibility-tab"),
    document.getElementById("property-brand-tab"),
    document.getElementById("faq-tab")
  ];

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      tabButtons.forEach(btn => btn.classList.remove("active"));
      tabContents.forEach(tc => tc.style.display = "none");

      button.classList.add("active");
      tabContents[index].style.display = "block";
    });
  });
}

function addFAQToggleListeners() {
  document.querySelectorAll('.faq-toggle').forEach(toggleBtn => {
    toggleBtn.addEventListener('click', () => {
      const icon = toggleBtn.querySelector('.toggle-icon');
      const answer = toggleBtn.nextElementSibling;
      const isOpen = answer.style.display === 'block';

      icon.textContent = isOpen ? '+' : '-';
      answer.style.display = isOpen ? 'none' : 'block';
    });
  });
}

function addSaveFilterListener() {
  document.getElementById("smartFiltersForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const locationRating = document.querySelector('input[name="locationRating"]:checked')?.value;
    const guestRatings = [...document.querySelectorAll('input[name="guestRating"]:checked')].map(cb => cb.value);
    const minPrice = document.getElementById("minPrice").value || null;
    const maxPrice = document.getElementById("maxPrice").value || null;
    const smartFilterDelay = document.getElementById("smartFilterDelay").value || 1000;
    const starRatings = [...document.querySelectorAll('input[name="starRating"]:checked')].map(cb => cb.value);
    const propertyAmenities = [...document.querySelectorAll('input[name="propertyAmenities"]:checked')].map(cb => cb.value);
    const roomAmenities = [...document.querySelectorAll('input[name="roomAmenities"]:checked')].map(cb => cb.value);
    const bedPreference = [...document.querySelectorAll('input[name="bedPreference"]:checked')].map(cb => cb.value);
    const paymentFlexibility = [...document.querySelectorAll('input[name="paymentFlexibility"]:checked')].map(cb => cb.value);
    const cancellation = [...document.querySelectorAll('input[name="cancellation"]:checked')].map(cb => cb.value);
    const propertyTypes = [...document.querySelectorAll('input[name="propertyType"]:checked')].map(cb => cb.value);
    const propertyBrands = [...document.querySelectorAll('input[name="propertyBrand"]:checked')].map(cb => cb.value);
    const travelerExperiences = [...document.querySelectorAll('input[name="travelerExperience"]:checked')].map(cb => cb.value);
    const availability = [...document.querySelectorAll('input[name="availability"]:checked')].map(cb => cb.value);
    const accessibility = [...document.querySelectorAll('input[name="accessibility"]:checked')].map(cb => cb.value);
    const propertyAccessibility = [...document.querySelectorAll('input[name="propertyAccessibility"]:checked')].map(cb => cb.value);
    const discounts = [...document.querySelectorAll('input[name="discounts"]:checked')].map(cb => cb.value);
    const meals = [...document.querySelectorAll('input[name="meals"]:checked')].map(cb => cb.value);

    await chrome.storage.sync.set({
      smartFilters: {
        accessibility,
        availability,
        bedPreference,
        cancellation,
        discounts,
        guestRatings,
        locationRating,
        meals,
        maxPrice,
        minPrice,
        paymentFlexibility,
        propertyAccessibility,
        propertyAmenities,
        propertyBrands,
        propertyTypes,
        roomAmenities,
        smartFilterDelay,
        starRatings,
        travelerExperiences
      }
    }).then(() => {
      console.log("smartFilters saved successfully");
    }).catch((err) => {
      console.error("Failed to save smartFilters:", err);
    });

    const panel = document.getElementById("confirmationPanel");
    panel.style.display = "block";
    setTimeout(() => {
      panel.style.display = "none";
    }, 2500);
  });
}


document.addEventListener("DOMContentLoaded", async () => {

  setupTabPanels();

  const data = await chrome.storage.sync.get("smartFilters");
  const filters = data.smartFilters || {};

  document.getElementById("minPrice").value = filters.minPrice || "";
  document.getElementById("maxPrice").value = filters.maxPrice || "";
  document.getElementById("smartFilterDelay").value = filters.smartFilterDelay || "";

  if (filters.locationRating) {
    document.querySelector(`input[name="locationRating"][value="${filters.locationRating}"]`)?.click();
  }
  const checkOptions = (name, values) => {
    if (!Array.isArray(values)) return;
    values.forEach(val => {
      console.log(`Checking ${name} with value: ${val}`);
      document.querySelector(`input[name="${name}"][value="${val}"]`)?.click();
    });
  };

  checkOptions("accessibility", filters.accessibility);
  checkOptions("propertyAccessibility", filters.propertyAccessibility); // 👈 NEW
  checkOptions("propertyAmenities", filters.propertyAmenities);
  checkOptions("roomAmenities", filters.roomAmenities);
  checkOptions("bedPreference", filters.bedPreference);
  checkOptions("cancellation", filters.cancellation);
  checkOptions("discounts", filters.discounts);
  checkOptions("guestRating", filters.guestRatings);
  checkOptions("meals", filters.meals);
  checkOptions("paymentFlexibility", filters.paymentFlexibility);
  checkOptions("propertyBrand", filters.propertyBrands);
  checkOptions("propertyType", filters.propertyTypes);
  checkOptions("starRating", filters.starRatings);
  checkOptions("travelerExperience", filters.travelerExperiences);

  if (filters.availability) {
    document.querySelector(`input[name="availability"][value="${filters.availability}"]`)?.click();
  }

  addSaveFilterListener();
  addResetFilterListener();
  addFAQToggleListeners();
});

function addResetFilterListener() {
  document.getElementById("resetFiltersButton").addEventListener("click", () => {
    const confirmModal = document.getElementById("confirmResetModal");
    const confirmYes = document.getElementById("confirmYes");
    const confirmNo = document.getElementById("confirmNo");

    document.getElementById("resetFiltersButton").addEventListener("click", () => {
      confirmModal.style.display = "flex";
    });

    confirmYes.addEventListener("click", () => {
      const form = document.getElementById("smartFiltersForm");

      form.querySelectorAll('input[type="number"], input[type="text"]').forEach(input => {
        input.value = '';
      });

      form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
      });

      form.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = radio.defaultChecked;
      });

      chrome.storage.sync.remove("smartFilters", () => {
        console.log("smartFilters reset");
      });

      confirmModal.style.display = "none";
    });

    confirmNo.addEventListener("click", () => {
      confirmModal.style.display = "none";
    });
  });
}
