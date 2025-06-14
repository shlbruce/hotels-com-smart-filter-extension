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

    // Discounts
    vip: "VIP Access properties",
    member: "Member Prices",
    discounted: "Discounted properties",

    // Guest Rating
    guest_rating_any: "Any",
    guest_rating_9: "Wonderful 9+",
    guest_rating_8: "Very good 8+",
    guest_rating_7: "Good 7+",

    // Payment Type
    pay_later: "Reserve now, pay later",
    gift_card: "Pay with Hotels.com gift card",
  
    
    // Property Type
    hotel: "Hotel",
    resort: "Resort",
    bnb: "Bed & breakfast",
    condo: "Condo",
    motel: "Motel",
    vacation_home: "Private vacation home",
    aparthotel: "Aparthotel",
    apartment: "Apartment",
    condo_resort: "Condo resort",
    villa: "Villa",
    cottage: "Cottage",
    guesthouse: "Guesthouse",
    hostel: "Hostel/Backpacker accommodation",
  
    // Property Brand
    mgm: "MGM",
    caesars: "Caesars Entertainment",
    venetian_las_vegas: "Venetian Las Vegas",
    boyd: "Boyd Gaming",
    wynn: "Wynn Resorts",
    hilton: "Hilton Hotels",
    world_bw: "World Hotels BW",
    hyatt: "Hyatt Hotels",
    station: "Station Casinos",
    conrad: "Conrad",
    hilton_grand: "Hilton Grand Vacations",
    golden_nugget: "Golden Nugget",
    trump: "Trump Hotels",
    curio: "Curio Collection",
    oyo: "OYO AMER",
    westgate: "Westgate Resorts",
    doubletree: "Doubletree",
    hampton: "Hampton Inn",
    motel6: "Motel 6",
    la_quinta: "La Quinta Inn & Suites",
    lxr_hotels_resorts: "LXR Hotels & Resorts",
    best_western_plus: "Best Western Plus",
    holiday_inn_express: "Holiday Inn Express Hotel",
    wyndham_extra_holidays: "Wyndham Extra Holidays",
    four_seasons: "Four Seasons",
  
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
                const checkbox = document.querySelector(`input[name="availableFilter"][aria-label*="${mappedAvailability}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "cancellation") {
            value.forEach(cancellation => {
                mappedCancellation = HOTELS_COM_MAP[cancellation];
                const checkbox = document.querySelector(`input[name="paymentType"][aria-label*="${mappedCancellation}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "discounts") {
            value.forEach(discount => {
                mappedDiscount = HOTELS_COM_MAP[discount];
                const checkbox = document.querySelector(`input[name="rewards"][aria-label*="${mappedDiscount}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "guestRating") {
            mappedValue = HOTELS_COM_MAP[value];
            const radio = document.querySelector(`input[name="guestRating"][aria-label*="${mappedValue}"]`);
            if (radio && !radio.checked) {
                radio.click(); // Simulate real user interaction
            }
        }
        // handle minPrice and maxPrice together
        else if (key === "maxPrice") {
            const sliderMax = document.querySelector('input[type="range"][aria-label*="Maximum"]');
            const sliderMin = document.querySelector('input[type="range"][aria-label*="Minimum"]');
            if (sliderMin && sliderMax) {
                sliderMax.value = value;
                
                sliderMax.dispatchEvent(new Event('input', { bubbles: true }));
                sliderMax.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));

                setTimeout(() => {
                    sliderMin.value = smartFilters.minPrice || 0;
                    sliderMin.dispatchEvent(new Event('input', { bubbles: true }));
                    sliderMin.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
                }, 50);
            }
        }
        else if (key === "paymentTypes") {
            value.forEach(paymentType => {
                mappedPaymentType = HOTELS_COM_MAP[paymentType];
                const checkbox = document.querySelector(`input[name="paymentType"][aria-label*="${mappedPaymentType}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "propertyBrands") {
            value.forEach(brand => {
                mappedBrand = HOTELS_COM_MAP[brand];
                const checkbox = document.querySelector(`input[name="hotel_brand"][aria-label*="${mappedBrand}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "propertyTypes") {
            value.forEach(type => {
                mappedType = HOTELS_COM_MAP[type];
                const checkbox = document.querySelector(`input[name="lodging"][aria-label*="${mappedType}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
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