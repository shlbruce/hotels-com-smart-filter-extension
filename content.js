function handleSmartFilterClick(event) {

    event.stopPropagation(); // ⛔ Prevents event bubbling
    event.preventDefault();  // ⛔ Prevents default action

    chrome.storage.sync.get(["smartFilters"], function (result) {
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
  
    // Amenities
    pool: "Pool",
    spa: "Spa",
    airport_shuttle: "Airport shuttle included",
    casino: "Casino",
    pet_friendly: "Pet friendly",
    parking: "Parking",
    kitchen: "Kitchen",
    hot_tub: "Hot tub",
    wifi: "Wifi Included",
    restaurant: "Restaurant",
    air_conditioned: "Air conditioned",
    gym: "Gym",
    golf_course: "Golf course",
    bar: "Bar",
    outdoor_space: "Outdoor space",
    electric_charger: "Electric car charging station",
    washer_dryer: "Washer and dryer",
    ocean_view:"Ocean view",
    water_park: "Water park",
    cribs: "Cribs",

    // Availability
    available_only: "Only show available properties",
  
    // Cancellation
    fully_refundable: "Fully refundable property",

    // Payment Type
    pay_later: "Reserve now, pay later",
    gift_card: "Pay with Hotels.com gift card",
  
    

    // Property Type
    hotel: "Hotel",
    resort: "Resort",
    motel: "Motel",
    aparthotel: "Aparthotel",
    apartment: "Apartment",
    condo_resort: "Condo resort",
    condo: "Condo",
    bnb: "Bed & Breakfast",
    vacation_home: "Private vacation home",
    cottage: "Cottage",
    guesthouse: "Guesthouse",
    safari: "Safari lodge",
    hostel: "Hostel/Backpacker accommodation",
  
    // Property Brand
    mgm: "MGM Resorts",
    caesars: "Caesars Entertainment",
    boyd: "Boyd Gaming",
    wynn: "Wynn Resorts",
    hilton: "Hilton Hotels",
    world_bw: "World Hotels BW",
    hyatt: "Hyatt Hotels",
    station: "Station Casinos",
    hilton_grand: "Hilton Grand Vacations",
    golden_nugget: "Golden Nugget",
    trump: "Trump Hotels",
    curio: "Curio Collection by Hilton",
    oyo: "OYO Americas",
    westgate: "Westgate Resorts",
    doubletree: "Doubletree by Hilton",
    hampton: "Hampton Inn",
    motel6: "Motel 6",
    holiday_inn_express: "Holiday Inn Express",
    la_quinta: "La Quinta Inn & Suites",
    best_western_plus: "Best Western Plus",
    best_western: "Best Western",
    wyndham: "Wyndham Extra Holidays",
  
    // Traveler Experience
    family_friendly: "Family friendly",
    adults_only: "Adults only",
    lgbtq: "LGBTQ welcoming",
    luxury: "Luxury experience",
    business: "Business friendly",
    beach: "Beach access",
    romantic: "Romantic setting",
    eco: "Eco-certified",
    budget: "Budget option",
    wedding: "Wedding venue",
  
    // Discounts
    vip: "VIP Access properties",
    member: "Member prices",
    discounted: "Discounted properties",
  
    // Meals
    breakfast: "Breakfast included",
    dinner: "Dinner included",
    all_inclusive: "All-inclusive meals",
    lunch: "Lunch included"
  };
  

function applyFiltersInHotelsCom(smartFilters) {
    for (const [key, value] of Object.entries(smartFilters)) {
        if (key === "accessibility") {
            value.forEach(accessibility => {
                mappedAccessibility = HOTELS_COM_MAP[accessibility];
                let checkbox = document.querySelector(`input[name='accessibility'][aria-label*='${mappedAccessibility}']`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "amenities") {
            value.forEach(amenity => {
                mappedAmenity = HOTELS_COM_MAP[amenity];
                const checkbox = document.querySelector(`input[name="amenities"][aria-label*="${mappedAmenity}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "availability") {
            value.forEach(availability => {
                mappedAvailability = HOTELS_COM_MAP[availability];
                const checkbox = document.querySelector(`input[name="availableFilter"][aria-label="${mappedAvailability}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "cancellation") {
            value.forEach(cancellation => {
                mappedCancellation = HOTELS_COM_MAP[cancellation];
                const checkbox = document.querySelector(`input[name="paymentType"][aria-label="${mappedCancellation}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        // else if (key === "discounts") {
        //     value.forEach(discount => {
        //         const checkbox = document.querySelector(`input[name="rewards"][aria-label*="${discount}"]`);
        //         if (checkbox) {
        //             checkbox.checked = true;
        //         }
        //     });
        // }
        // else if (key === "guestRating") {
        //     const radio = document.querySelector(`input[name="guestRating"][aria-label*="${value}"]`);
        //     if (radio) {
        //         radio.checked = true;
        //     }
        // }
        // else if (key === "maxPrice") {
        //     const maxPriceInput = document.getElementById("price-max");
        //     if (maxPriceInput) {
        //         maxPriceInput.value = value;
        //     }
        // }
        // else if (key === "minPrice") {
        //     const minPriceInput = document.getElementById("price-min");
        //     if (minPriceInput) {
        //         minPriceInput.value = value;
        //     }
        // }
        else if (key === "paymentTypes") {
            value.forEach(paymentType => {
                mappedPaymentType = HOTELS_COM_MAP[paymentType];
                const checkbox = document.querySelector(`input[name="paymentType"][aria-label="${mappedPaymentType}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        // else if (key === "propertyBrands") {
        //     value.forEach(brand => {
        //         const checkbox = document.querySelector(`input[name="hotel_brand"][aria-label="${brand}"]`);
        //         if (checkbox) {
        //             checkbox.checked = true;
        //         }
        //     });
        // }
        // else if (key === "propertyTypes") {
        //     value.forEach(type => {
        //         const checkbox = document.querySelector(`input[name="lodging"][aria-label="${type}"]`);
        //         if (checkbox) {
        //             checkbox.checked = true;
        //         }
        //     });
        // }
        // else if (key === "starRatings") {
        //     value.forEach(rating => {
        //         const checkbox = document.querySelector(`input[name="star"][aria-label*="${rating}"]`);
        //         if (checkbox) {
        //             checkbox.checked = true;
        //         }
        //     });
        // }
        // else if (key === "stayOption") {
        //     const radio = document.querySelector(`input[name="stay_options_group"][aria-label*="${value}"]`);
        //     if (radio) {
        //         radio.checked = true;
        //     }
        // }
        // else if (key === "travelerExperiences") {
        //     value.forEach(experience => {
        //         const checkbox = document.querySelector(`input[name="travelerType"][aria-label*="${experience}"]`);
        //         if (checkbox) {
        //             checkbox.checked = true;
        //         }
        //     });
        // }
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
    button.style.transition = "background-color 0.1s, transform 0.1s";

    // Visual press effect
    button.addEventListener("mousedown", () => {
        button.style.backgroundColor = "#ddd";
        button.style.transform = "scale(0.96)";
    });

    const resetButtonStyle = () => {
        button.style.backgroundColor = "#f5f5f5";
        button.style.transform = "scale(1)";
    };

    button.addEventListener("mouseup", resetButtonStyle);
    button.addEventListener("mouseleave", resetButtonStyle);

    // Your smart filter logic
    button.addEventListener("click", handleSmartFilterClick);

    filterHeading.insertAdjacentElement("afterend", button);

}

// Run initially and observe DOM changes
addSmartFilterButton();
const observer = new MutationObserver(addSmartFilterButton);
observer.observe(document.body, { childList: true, subtree: true }); 