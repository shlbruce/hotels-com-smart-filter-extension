function handleSmartFilterClickOnHotelsCom(event) {
    event.stopPropagation();
    event.preventDefault();

    const button = document.getElementById("smart-filter-button");
    if (!button) return;

    const originalText = button.textContent;
    button.innerHTML = "🌀 Applying...";
    button.disabled = true;
    button.style.opacity = "0.6";
    button.style.cursor = "not-allowed";

    chrome.storage.sync.get(["smartFilters"], function (result) {
        const smartFilters = result.smartFilters;
        if (smartFilters) {
            const buttons = document.querySelectorAll('button');
            for (const btn of buttons) {
                if (btn.textContent.trim() === "Remove all filters") {
                    btn.click();
                    break;
                }
            }

            setTimeout(() => {
                applyFiltersInHotelsCom(smartFilters);

                // Wait an extra 2 seconds after applying filters
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.opacity = "1";
                    button.style.cursor = "pointer";
                }, 4000);
            }, 2000);
        } else {
            console.warn("No smart filters found in storage.");
            button.textContent = originalText;
            button.disabled = false;
            button.style.opacity = "1";
            button.style.cursor = "pointer";
        }
    });
}


const HOTELS_COM_MAP = {
    // Room Accessibility
    roll_in_shower: "Roll-in shower",
    in_room: "In-room accessibility",
    accessible_bathroom: "Accessible bathroom",


    // Property Accessibility
    elevator: "Elevator",
    service_animals: "Service animals allowed",
    stair_free: "Stair-free path to entrance",
    wheelchair_parking: "Wheelchair accessible parking",
    sign_language: "Sign language-capable staff",

    //
    // Property Amenities
    //
    airport_shuttle: "Airport shuttle included",
    bar: "Bar",
    casino: "Casino",
    electric_charger: "Electric car charging station",
    golf_course: "Golf course",
    gym: "Gym",
    parking: "Parking",
    pool: "Pool",
    restaurant: "Restaurant",
    spa: "Spa",
    washer_dryer: "Washer and dryer",
    water_park: "Water park",

    // Room amenities
    air_conditioned: "Air conditioned",
    cribs: "Cribs",
    hot_tub: "Hot tub",
    kitchen: "Kitchen",
    ocean_view: "Ocean view",
    outdoor_space: "Outdoor space",
    wifi: "Wifi Included",

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

    // Payment Flexibility
    pay_later: "Reserve now, pay later",
    hotels_com_gift_card: "Pay with Hotels.com gift card",


    // Property Type
    hotel: "Hotel",
    resort: "Resort",
    bed_and_breakfast: "Bed & breakfast",
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
    aloft: "aloft",
    autograph_collection: "Autograph Collection",
    best_western: "Best Western",
    best_western_plus: "Best Western Plus",
    boyd: "Boyd Gaming",
    caesars: "Caesars Entertainment",
    club_quarters: "Club Quarters",
    conrad: "Conrad",
    country_inn: "Country Inn & Suites - by Choice Hotels",
    courtyard_marriott: "Courtyard",
    crowne_plaza: "Crowne Plaza Hotels & Resorts",
    curio_collection_hilton: "Curio Collection",
    doubletree: "Doubletree",
    embassy_suites: "Embassy Suites",
    eurostars: "Eurostars Hotels",
    extended_stay_america: "Extended Stay America Suites",
    fairfield_inn: "Fairfield Inn",
    four_seasons: "Four Seasons",
    golden_nugget: "Golden Nugget",
    hampton: "Hampton Inn",
    hilton: "Hilton Hotels",
    hilton_garden_inn: "Hilton Garden Inn",
    hilton_grand: "Hilton Grand Vacations",
    holiday_inn: "Holiday Inn",
    holiday_inn_express: "Holiday Inn Express Hotel",
    homewood_suites: "Homewood Suites by Hilton",
    hyatt_hotels: "Hyatt Hotels",
    hyatt_house: "Hyatt House",
    hyatt_place: "Hyatt Place",
    hyatt_regency: "Hyatt Regency",
    intercontinental: "InterContinental Hotels & Resorts",
    la_quinta: "La Quinta Inn & Suites",
    loews: "Loews",
    lxr_hotels_resorts: "LXR Hotels & Resorts",
    marriott: "Marriott Hotels & Resorts",
    mgm: "MGM",
    motel6: "Motel 6",
    oyo: "OYO AMER",
    renaissance: "Renaissance",
    sofitel: "Sofitel",
    sonesta: "Sonesta Hotels",
    springhill_suites: "SpringHill Suites",
    station: "Station Casinos",
    super8: "Super 8",
    trump: "Trump Hotels",
    travelodge: "Travelodge by Wyndham",
    venetian_las_vegas: "Venetian Las Vegas",
    westgate: "Westgate Resorts",
    westin: "Westin",
    world_bw: "World Hotels BW",
    wynn: "Wynn Resorts",
    wyndham_extra_holidays: "Wyndham Extra Holidays",

    // Star Ratings
    starRating_5: "5 stars",
    starRating_4: "4 stars",
    starRating_3: "3 stars",
    starRating_2: "2 stars",
    starRating_1: "1 star",

    // Stay Option
    stay_options_any: "Any",
    stay_options_hotels: "Hotels",
    stay_options_homes: "Homes",

    // Traveler Experience
    travel_experience_family_friendly: { name: "travelerType", aria_label: "Family friendly" },
    travel_experience_pet_friendly: { name: "amenities", aria_label: "Pet friendly" },
    travel_experience_adults_only: { name: "travelerType", aria_label: "Adults only" },
    travel_experience_lgbtq: { name: "travelerType", aria_label: "LGBTQ welcoming" },
    travel_experience_luxury: { name: "travelerType", aria_label: "Luxury" },
    travel_experience_business: { name: "travelerType", aria_label: "Business friendly" },
    travel_experience_beach: { name: "travelerType", aria_label: "Beach" },
    travel_experience_romantic: { name: "travelerType", aria_label: "Romantic" },
    travel_experience_eco: { name: "travelerType", aria_label: "Eco-certified" },
    travel_experience_budget: { name: "travelerType", aria_label: "Budget" },
    travel_experience_wedding: { name: "travelerType", aria_label: "Wedding" },

    // Meals
    meal_plan_breakfast: "Breakfast included",
    meal_plan_dinner: "Dinner included",
    meal_plan_lunch: "Lunch included",
    meal_plan_all_inclusive: "All inclusive"
};


function applyFiltersInHotelsCom(smartFilters) {

    for (const [key, value] of Object.entries(smartFilters)) {
        if (key === "accessibility") {
            value.forEach(accessibility => {
                const mappedAccessibility = HOTELS_COM_MAP[accessibility];
                if (!mappedAccessibility) return;
                let checkbox = document.querySelector(`input[name='accessibility'][aria-label*='${mappedAccessibility}']`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "propertyAccessibility") {
            value.forEach(accessibility => {
                const mappedAccessibility = HOTELS_COM_MAP[accessibility];
                if (!mappedAccessibility) return;
                let checkbox = document.querySelector(`input[name='accessibility'][aria-label*='${mappedAccessibility}']`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "propertyAmenities") {
            value.forEach(amenity => {
                const mappedAmenity = HOTELS_COM_MAP[amenity];
                if (!mappedAmenity) return;
                const checkbox = document.querySelector(`input[name="amenities"][aria-label*="${mappedAmenity}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "roomAmenities") {
            value.forEach(amenity => {
                const mappedAmenity = HOTELS_COM_MAP[amenity];
                if (!mappedAmenity) return;
                const checkbox = document.querySelector(`input[name="amenities"][aria-label*="${mappedAmenity}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "availability") {
            value.forEach(availability => {
                const mappedAvailability = HOTELS_COM_MAP[availability];
                if (!mappedAvailability) return;
                const checkbox = document.querySelector(`input[name="availableFilter"][aria-label*="${mappedAvailability}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "cancellation") {
            value.forEach(cancellation => {
                const mappedCancellation = HOTELS_COM_MAP[cancellation];
                if (!mappedCancellation) return;
                const checkbox = document.querySelector(`input[name="paymentType"][aria-label*="${mappedCancellation}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "discounts") {
            value.forEach(discount => {
                const mappedDiscount = HOTELS_COM_MAP[discount];
                if (!mappedDiscount) return;
                const checkbox = document.querySelector(`input[name="rewards"][aria-label*="${mappedDiscount}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "guestRatings") {
            if (value.length === 0) {
                const checkbox = document.querySelector(`input[name="guestRating"][aria-label*="guest_rating_any"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
                continue;
            }
            const minRating = value.reduce((min, current) => {
                const currentNum = parseInt(current.split('_').pop(), 10);
                const minNum = parseInt(min.split('_').pop(), 10);
                return currentNum < minNum ? current : min;
            });

            const mappedGuestRating = HOTELS_COM_MAP[minRating];
            let checkbox;
            if (!mappedGuestRating) {
                checkbox = document.querySelector(`input[name="guestRating"][aria-label*="guest_rating_any"]`);

            }
            else {
                checkbox = document.querySelector(`input[name="guestRating"][aria-label*="${mappedGuestRating}"]`);
            }
            if (checkbox && !checkbox.checked) {
                checkbox.click();
            }
        }
        // handle minPrice and maxPrice together
        else if (key === "maxPrice") {
            const sliderMax = document.querySelector('input[type="range"][aria-label*="Maximum"]');
            const sliderMin = document.querySelector('input[type="range"][aria-label*="Minimum"]');
            if (sliderMax && value != null) {
                sliderMax.value = value;
                // don't try to put MouseDown event, it will trigger sliderMax not work. 
                // I guess mousedown take some time to process, then sliderMax.mouseup event will be too closed to sliderMin.mouseup
                // then only one mouseup event is executed.
                sliderMax.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
            }

            if (sliderMin && smartFilters.minPrice != null) {
                setTimeout(() => {
                    sliderMin.value = smartFilters.minPrice || 0;
                    sliderMin.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
                }, 2000);
            }
        }
        else if (key === "meals") {
            value.forEach(meal => {
                const mappedMeal = HOTELS_COM_MAP[meal];
                if (!mappedMeal) return;
                const checkbox = document.querySelector(`input[name="mealPlan"][aria-label*="${mappedMeal}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "paymentFlexibility") {
            value.forEach(paymentFlexibility => {
                const mappedPaymentFlexibility = HOTELS_COM_MAP[paymentFlexibility];
                if (!mappedPaymentFlexibility) return;
                const checkbox = document.querySelector(`input[name="paymentType"][aria-label*="${mappedPaymentFlexibility}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "propertyBrands") {
            value.forEach(brand => {
                const mappedBrand = HOTELS_COM_MAP[brand];
                if (!mappedBrand) return;
                if (mappedBrand === "Holiday Inn") {
                    const checkboxes = document.querySelectorAll(`input[name="hotel_brand"][aria-label*="${mappedBrand}"]`);
                    for (const checkbox of checkboxes) {
                        const label = checkbox.getAttribute("aria-label") || "";
                        if (!label.startsWith("Holiday Inn Express")) {
                            if (!checkbox.checked) {
                                checkbox.click();
                            }
                            break;
                        }
                    }
                }
                else {
                    const checkbox = document.querySelector(`input[name="hotel_brand"][aria-label*="${mappedBrand}"]`);
                    if (checkbox && !checkbox.checked) {
                        checkbox.click();
                    }
                }
            });
        }
        else if (key === "propertyTypes") {
            value.forEach(type => {
                const mappedType = HOTELS_COM_MAP[type];
                if (!mappedType) return;
                const checkbox = document.querySelector(`input[name="lodging"][aria-label*="${mappedType}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "starRatings") {
            value.forEach(rating => {
                const mappedRating = HOTELS_COM_MAP[rating];
                if (!mappedRating) return;
                const checkbox = document.querySelector(`input[name="star"][aria-label*="${mappedRating}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "travelerExperiences") {
            value.forEach(experience => {
                const mappedExperience = HOTELS_COM_MAP[experience];
                if (!mappedExperience) return;
                const checkbox = document.querySelector(`input[name="${mappedExperience.name}"][aria-label*="${mappedExperience.aria_label}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
    }

}

function addSmartFilterButtonOnHotelsCom() {

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
    button.textContent = "Apply your filters";
    button.style.margin = "6px 0px";
    button.style.padding = "6px 2px";
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
    button.addEventListener("click", handleSmartFilterClickOnHotelsCom);

    filterHeading.insertAdjacentElement("afterend", button);

}