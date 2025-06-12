function handleSmartFilterClick(event) {

    event.stopPropagation(); // ⛔ Prevents event bubbling
    event.preventDefault();  // ⛔ Prevents default action

    chrome.storage.sync.get(["smartFilters"], function(result) {
        const smartFilters = result.smartFilters;
        if (smartFilters) {
            applyFiltersInHotelsCom(smartFilters);
            
        } else {
            console.warn("No smart filters found in storage.");
        }
    });
}

const HOTELS_COM_MAP = {
    // Accessibility
    roll_in_shower: "Roll-in shower",
    elevator: "Elevator",
    in_room: "In-room accessibility",
    accessible_bathroom: "Accessible bathroom",
    service_animals: "Service animals allowed",
    stair_free: "Stair-free path to entrance",
    wheelchair_parking: "Wheelchair accessible parking",
    sign_language: "Sign language-capable staff",
  };
  
function applyFiltersInHotelsCom(smartFilters) {
    for (const [key, value] of Object.entries(smartFilters)) {
        if (key === "accessibility") {
            value.forEach(accessibility => {
                mappedAccessibility = HOTELS_COM_MAP[accessibility];
                let checkbox = document.querySelector(`input[name='accessibility'][aria-label*='${mappedAccessibility}']`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
        else if (key === "amenities") {
            value.forEach(amenity => {
                const checkbox = document.querySelector(`input[name="amenities"][aria-label*="${amenity}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
        else if (key === "availability") {
            value.forEach(availability => {
                const checkbox = document.querySelector(`input[name="availableFilter"][aria-label="${availability}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
        else if (key === "cancellation") {
            value.forEach(cancellation => {
                const checkbox = document.querySelector(`input[name="paymentType"][aria-label="${cancellation}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
        else if (key === "discounts") {
            value.forEach(discount => {
                const checkbox = document.querySelector(`input[name="rewards"][aria-label*="${discount}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
        else if (key === "guestRating") {
            const radio = document.querySelector(`input[name="guestRating"][aria-label*="${value}"]`);
            if (radio) {
                radio.checked = true;
            }
        }
        else if (key === "maxPrice") {
            const maxPriceInput = document.getElementById("price-max");
            if (maxPriceInput) {
                maxPriceInput.value = value;
            }
        }
        else if (key === "minPrice") {
            const minPriceInput = document.getElementById("price-min");
            if (minPriceInput) {
                minPriceInput.value = value;
            }
        }
        else if (key === "paymentTypes") {
            value.forEach(paymentType => {
                const checkbox = document.querySelector(`input[name="paymentType"][aria-label="${paymentType}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
        else if (key === "propertyBrands") {
            value.forEach(brand => {
                const checkbox = document.querySelector(`input[name="hotel_brand"][aria-label="${brand}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
        else if (key === "propertyTypes") {
            value.forEach(type => {
                const checkbox = document.querySelector(`input[name="lodging"][aria-label="${type}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
        else if (key === "starRatings") {
            value.forEach(rating => {
                const checkbox = document.querySelector(`input[name="star"][aria-label*="${rating}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
        else if (key === "stayOption") {
            const radio = document.querySelector(`input[name="stay_options_group"][aria-label*="${value}"]`);
            if (radio) {
                radio.checked = true;
            }
        }
        else if (key === "travelerExperiences") {
            value.forEach(experience => {
                const checkbox = document.querySelector(`input[name="travelerType"][aria-label*="${experience}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
    }
}

function addSmartFilterButton() {

    // Check if the button already exists
    if (document.getElementById("smart-filter-button")) {
        return;
    }

    // Find the heading with text "Filter by"
    const headings = document.querySelectorAll('h3');
    const filterHeading = Array.from(headings).find(h => h.textContent.trim() === 'Filter by');


    if (!filterHeading) {
        return;
    }

    const button = document.createElement("button");
    button.id = "smart-filter-button";
    button.textContent = "Smart Filter";
    button.style.margin = "6px 0px";
    button.style.padding = "6px 1px";
    button.style.fontSize = "12px";
    button.style.cursor = "pointer";
    button.style.borderRadius = "8px";
    button.style.border = "1px solid #ccc";
    button.style.color = "red";
    button.style.backgroundColor = "#f5f5f5";


    // Add any custom click behavior
    button.addEventListener("click", handleSmartFilterClick);

    filterHeading.insertAdjacentElement("afterend", button);
}

// Run initially and observe DOM changes
addSmartFilterButton();
const observer = new MutationObserver(addSmartFilterButton);
observer.observe(document.body, { childList: true, subtree: true }); 