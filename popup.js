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