document.getElementById("smartFiltersForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const stayOption = document.querySelector('input[name="stayOption"]:checked')?.value;
  const guestRating = document.querySelector('input[name="guestRating"]:checked')?.value;
  const minPrice = document.getElementById("minPrice").value || null;
  const maxPrice = document.getElementById("maxPrice").value || null;
  const starRatings = [...document.querySelectorAll('input[name="starRating"]:checked')].map(cb => cb.value);
  const amenities = [...document.querySelectorAll('.amenities-grid input:checked')].map(cb => cb.value);
  const paymentTypes = [...document.querySelectorAll('input[name="paymentType"]:checked')].map(cb => cb.value);
  const cancellation = document.querySelector('input[name="cancellation"]:checked')?.value || null;

  const propertyTypes = [...document.querySelectorAll('input[name="propertyType"]:checked')].map(cb => cb.value);
  const propertyBrands = [...document.querySelectorAll('input[name="propertyBrand"]:checked')].map(cb => cb.value);

  const travelerExperiences = [...document.querySelectorAll('input[name="travelerExperience"]:checked')].map(cb => cb.value);
  const availability = document.querySelector('input[name="availability"]:checked')?.value || null;
  const accessibility = [...document.querySelectorAll('input[name="accessibility"]:checked')].map(cb => cb.value);
  const discounts = [...document.querySelectorAll('input[name="discounts"]:checked')].map(cb => cb.value);
  const meals = [...document.querySelectorAll('input[name="meals"]:checked')].map(cb => cb.value);

  await chrome.storage.sync.set({
    smartFilters: {
      stayOption,
      guestRating,
      minPrice,
      maxPrice,
      starRatings,
      amenities,
      paymentTypes,
      cancellation,
      propertyTypes,
      propertyBrands,
      travelerExperiences,
      availability,
      accessibility,
      discounts,
      meals
    }
  }).then(() => {
    console.log("smartFilters saved successfully");
  }).catch((err) => {
    console.error("Failed to save smartFilters:", err);
  });  
  alert("Preferences saved!");
});

document.addEventListener("DOMContentLoaded", async () => {
  const data = await chrome.storage.sync.get("smartFilters");
  const filters = data.smartFilters || {};

  document.getElementById("minPrice").value = filters.minPrice || "";
  document.getElementById("maxPrice").value = filters.maxPrice || "";

  if (filters.stayOption) {
    document.querySelector(`input[name="stayOption"][value="${filters.stayOption}"]`)?.click();
  }

  if (filters.guestRating) {
    document.querySelector(`input[name="guestRating"][value="${filters.guestRating}"]`)?.click();
  }

  const checkOptions = (name, values) => {
    if (!Array.isArray(values)) return;
    values.forEach(val => {
      document.querySelector(`input[name="${name}"][value="${val}"]`)?.click();
    });
  };

  checkOptions("starRating", filters.starRatings);
  checkOptions("paymentType", filters.paymentTypes);
  checkOptions("propertyType", filters.propertyTypes);
  checkOptions("propertyBrand", filters.propertyBrands);
  checkOptions("travelerExperience", filters.travelerExperiences);
  checkOptions("accessibility", filters.accessibility);
  checkOptions("discounts", filters.discounts);
  checkOptions("meals", filters.meals);

  // Amenities handled separately since their inputs lack the name attribute
  if (Array.isArray(filters.amenities)) {
    filters.amenities.forEach(val => {
      document.querySelector(`.amenities-grid input[value="${val}"]`)?.click();
    });
  }

  // Single checkboxes
  if (filters.availability) {
    document.querySelector(`input[name="availability"][value="${filters.availability}"]`)?.click();
  }

  if (filters.cancellation) {
    document.querySelector(`input[name="cancellation"][value="${filters.cancellation}"]`)?.click();
  }
});
