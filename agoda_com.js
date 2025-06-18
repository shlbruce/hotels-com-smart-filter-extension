function addSmartFilterButtonOnAgodaCom() {

    // Check if the button already exists
    if (document.getElementById("smart-filter-button")) {
        return;
    }

    // Find the heading with text "Filter by"
    let textSearch = document.querySelector('div[data-element-name="search-filter-text-search"]');
    if (!textSearch && !textSearch.parentElement) {
        return;
    }
    textSearch = textSearch.parentElement;

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
    button.addEventListener("click", handleSmartFilterClickOnAgodaCom);

    textSearch.insertAdjacentElement("afterend", button);
}

function handleSmartFilterClickOnAgodaCom(event) {

    event.stopPropagation(); // ⛔ Prevents event bubbling
    event.preventDefault();  // ⛔ Prevents default action

    chrome.storage.sync.get(["smartFilters"], function (result) {
        const smartFilters = result.smartFilters;
        if (smartFilters) {
            const clearButton = document.querySelector('span[label = "CLEAR"]');
            if (clearButton) {
                clearButton.click();
            }

            markFilters()
            setTimeout(() => {
                applyFiltersInAgodaCom(smartFilters);
            }, 2000);

        } else {
            console.warn("No smart filters found in storage.");
        }
    });
}

const AGODA_COM_MAP = {
    // Room Accessibility
    roll_in_shower: "Roll-in shower",
    in_room: "In-room accessibility",
    accessible_bathroom: "Accessible bathroom",


    // Property Accessibility

    facilities_disabled_guests: {
        name: "this-filter-property-amenities",
        text: "Facilities for disabled guests"
    },
    // elevator: "Elevator",
    // service_animals: "Service animals allowed",
    // stair_free: "Stair-free path to entrance",
    // wheelchair_parking: "Wheelchair accessible parking",
    // sign_language: "Sign language-capable staff",


    //
    // Property Amenities
    //
    airport_shuttle: {
        name: "this-filter-property-amenities",
        text: "Airport transfer"
    },
    bar: {
        name: "this-filter-property-amenities",
        text: "Air conditioning"
    },
    casino: {
        name: "this-filter-property-amenities",
        text: "Air conditioning"
    },
    electric_charger: {
        name: "this-filter-property-amenities",
        text: "Air conditioning"
    },
    front_desk_24h: {
        name: "this-filter-property-amenities",
        text: "Front desk [24-hour]"
    },
    golf_course: {
        name: "this-filter-property-amenities",
        text: "Golf course"
    },
    gym: {
        name: "this-filter-property-amenities",
        text: "Gym/fitness"
    },
    non_smoking_rooms: {
        name: "this-filter-property-amenities",
        text: "Non-smoking"
    },
    night_club: {
        name: "this-filter-property-amenities",
        text: "Nightclub"
    },
    parking: {
        name: "this-filter-property-amenities",
        text: "Car park"
    },
    pool: {
        name: "this-filter-property-amenities",
        text: "Swimming pool"
    },
    restaurant: {
        name: "this-filter-property-amenities",
        text: "Restaurants"
    },
    smoking_area: {
        name: "this-filter-property-amenities",
        text: "Smoking area"
    },
    spa: {
        name: "this-filter-property-amenities",
        text: "Spa/sauna"
    },
    washer_dryer: {
        name: "this-filter-property-amenities",
        text: "Air conditioning"
    },
    water_park: {
        name: "this-filter-property-amenities",
        text: "Air conditioning"
    },

    // Room amenities
    air_conditioned: {
        name: "this-filter-room-amenities",
        text: "Air conditioning"
    },
    bathtub: {
        name: "this-filter-room-amenities",
        text: "Bathtub"
    },
    coffee_tea_maker: {
        name: "this-filter-room-amenities",
        text: "Coffee/tea maker"
    },
    heating: {
        name: "this-filter-room-amenities",
        text: "Heating"
    },
    ironing_facilities: {
        name: "this-filter-room-amenities",
        text: "Ironing facilities"
    },
    kitchen: {
        name: "this-filter-room-amenities",
        text: "Kitchen"
    },
    outdoor_space_balcony: {
        name: "this-filter-room-amenities",
        text: "Balcony/terrace"
    },
    outdoor_space_terrace: {
        name: "this-filter-room-amenities",
        aria_label: "Balcony/terrace"
    },
    private_pool: {
        name: "this-filter-room-amenities",
        text: "Private pool"
    },
    refrigerator: {
        name: "this-filter-room-amenities",
        text: "Refrigerator"
    },
    television: {
        name: "this-filter-room-amenities",
        text: "TV"
    },
    washing_machine: {
        name: "this-filter-room-amenities",
        text: "Washing machine"
    },
    wifi: {
        name: "this-filter-room-amenities",
        text: "Internet access"
    },


    // Cancellation => Payment options
    free_cancellation: {
        name: "this-filter-payment-options",
        text: "Free cancellation"
    },
    // Payment Flexibility  =>Payment options
    pay_at_hotel: {
        name: "this-filter-payment-options",
        text: "Pay at the hotel"
    },
    pay_later: {
        name: "this-filter-payment-options",
        text: "Book now, pay later"
    },
    pay_now: {
        name: "this-filter-payment-options",
        text: "Pay now"
    },

    // Discounts
    vip: "VIP Access properties",
    member: "Member Prices",
    discounted: "Discounted properties",

    // Guest Rating
    guest_rating_9: {
        name: "this-filter-guest-review-score",
        text: "9+ Exceptional"
    },
    guest_rating_8: {
        name: "this-filter-guest-review-score",
        text: "8+ Excellent"
    },
    guest_rating_7: {
        name: "this-filter-guest-review-score",
        text: "7+ Very good"
    },
    guest_rating_6: {
        name: "this-filter-guest-review-score",
        text: "6+ Good"
    },

    //
    // Property Type
    //

    apartment: {
        name: "this-filter-property-type",
        text: "Apartment/Flat"
    },
    bed_and_breakfast: {
        name: "this-filter-property-type",
        text: "Guesthouse/bed and breakfast"
    },
    capsule_hotel: {
        name: "this-filter-property-type",
        text: "Capsule hotel"
    },
    entire_home: {
        name: "this-filter-property-type",
        text: "Entire House"
    },
    guesthouse: {
        name: "this-filter-property-type",
        text: "Guesthouse/bed and breakfast"
    },
    homestay: {
        name: "this-filter-property-type",
        text: "Homestay"
    },
    hostel: {
        name: "this-filter-property-type",
        text: "Hostel"
    },
    hotel: {
        name: "this-filter-property-type",
        text: "Hotel"
    },
    inn: {
        name: "this-filter-property-type",
        text: "Inn"
    },
    motel: {
        name: "this-filter-property-type",
        text: "Motel"
    },
    resort: {
        name: "this-filter-property-type",
        text: "Resort"
    },
    resort_villa: {
        name: "this-filter-property-type",
        text: "Resort villa"
    },
    serviced_apartment: {
        name: "this-filter-property-type",
        text: "Serviced apartment"
    },
    villa: {
        name: "this-filter-property-type",
        text: "Villa"
    },

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
    hyatt: "Hyatt Hotels",
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
    starRating_5: {
        name: "this-filter-property-rating",
        text: "5-Star rating"
    },
    starRating_4: {
        name: "this-filter-property-rating",
        text: "4-Star rating"
    },
    starRating_3: {
        name: "this-filter-property-rating",
        text: "3-Star rating"
    },
    starRating_2: {
        name: "this-filter-property-rating",
        text: "2-Star rating"
    },
    starRating_1: {
        name: "this-filter-property-rating",
        text: "1-Star rating"
    },

    // Stay Option
    stay_options_any: "Any",
    stay_options_hotels: "Hotels",
    stay_options_homes: "Homes",

    // Traveler Experience
    travel_experience_family_friendly: {
        name: "this-filter-property-amenities",
        text: "Family/child friendly"
    },
    travel_experience_pet_friendly: { 
        name: "this-filter-room-amenities", 
        text: "Pets allowed in room" 
    },
    travel_experience_business:{
        name: "this-filter-property-amenities",
        text: "Business facilities"
    },
    // travel_experience_adults_only: { name: "travelerType", aria_label: "Adults only" },
    // travel_experience_lgbtq: { name: "travelerType", aria_label: "LGBTQ welcoming" },
    // travel_experience_luxury: { name: "travelerType", aria_label: "Luxury" },
    // travel_experience_beach: { name: "travelerType", aria_label: "Beach" },
    // travel_experience_romantic: { name: "travelerType", aria_label: "Romantic" },
    // travel_experience_eco: { name: "travelerType", aria_label: "Eco-certified" },
    // travel_experience_budget: { name: "travelerType", aria_label: "Budget" },
    // travel_experience_wedding: { name: "travelerType", aria_label: "Wedding" },

    // Meals
    meal_plan_breakfast: "Breakfast included",
    meal_plan_dinner: "Dinner included",
    meal_plan_lunch: "Lunch included",
    meal_plan_all_inclusive: "All inclusive"
};


function applyFiltersInAgodaCom(smartFilters) {

    for (const [key, value] of Object.entries(smartFilters)) {
        if (key === "accessibility") {
            value.forEach(accessibility => {
                const mappedAccessibility = AGODA_COM_MAP[accessibility];
                if (!mappedAccessibility) return;
                let checkbox = document.querySelector(`input[name='accessibility'][aria-label*='${mappedAccessibility}']`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "propertyAccessibility") {
            value.forEach(type => {
                const mappedType = AGODA_COM_MAP[type];
                if (!mappedType) return;

                const filterSection = document.getElementById(mappedType.name);
                filterSection.querySelectorAll('li').forEach(liElement => {
                    const text = liElement.innerText.trim();
                    if (text.startsWith(mappedType.text)) {
                        const checkbox = liElement.querySelector('input[type="checkbox"]');
                        if (checkbox && !checkbox.checked) {
                            checkbox.click();
                        }
                    }
                });
            });
        }
        else if (key === "propertyAmenities") {
            value.forEach(type => {
                const mappedType = AGODA_COM_MAP[type];
                if (!mappedType) return;

                const filterSection = document.getElementById(mappedType.name);
                filterSection.querySelectorAll('li').forEach(liElement => {
                    const text = liElement.innerText.trim();
                    if (text.startsWith(mappedType.text)) {
                        const checkbox = liElement.querySelector('input[type="checkbox"]');
                        if (checkbox && !checkbox.checked) {
                            checkbox.click();
                        }
                    }
                });
            });
        }
        else if (key === "roomAmenities") {
            const filterSection = document.getElementById("this-filter-room-amenities");
            const allLi = filterSection.querySelectorAll('li');

            value.forEach(type => {
                const mappedType = AGODA_COM_MAP[type];
                if (!mappedType) return;
                allLi.forEach(liElement => {
                    const text = liElement.innerText.trim();
                    if (text.startsWith(mappedType.text)) {
                        const checkbox = liElement.querySelector('input[type="checkbox"]');
                        if (checkbox && !checkbox.checked) {
                            checkbox.click();
                        }
                    }
                });
            });
        }
        else if (key === "cancellation") {
            value.forEach(type => {
                const mappedType = AGODA_COM_MAP[type];
                if (!mappedType) return;

                const filterSection = document.getElementById(mappedType.name);
                filterSection.querySelectorAll('li').forEach(liElement => {
                    const text = liElement.innerText.trim();
                    if (text.startsWith(mappedType.text)) {
                        const checkbox = liElement.querySelector('input[type="checkbox"]');
                        if (checkbox && !checkbox.checked) {
                            checkbox.click();
                        }
                    }
                });
            });
        }
        else if (key === "discounts") {
            value.forEach(discount => {
                const mappedDiscount = AGODA_COM_MAP[discount];
                if (!mappedDiscount) return;
                const checkbox = document.querySelector(`input[name="rewards"][aria-label*="${mappedDiscount}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "guestRatings") {
            if (value.length === 0) {
                continue;
            }
            const minRating = value.reduce((min, current) => {
                const currentNum = parseInt(current.split('_').pop(), 10);
                const minNum = parseInt(min.split('_').pop(), 10);
                return currentNum < minNum ? current : min;
            });

            const mappedType = AGODA_COM_MAP[minRating];
            if (!mappedType) return;

            const filterSection = document.getElementById(mappedType.name);
            filterSection.querySelectorAll('li').forEach(liElement => {
                const text = liElement.innerText.trim();
                const cleaned = text.replace(/\s+/g, ' ');
                if (cleaned.startsWith(mappedType.text)) {
                    const checkbox = liElement.querySelector('input[type="radio"]');
                    if (checkbox && !checkbox.checked) {
                        checkbox.click();
                    }
                }
            });
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
                const mappedMeal = AGODA_COM_MAP[meal];
                if (!mappedMeal) return;
                const checkbox = document.querySelector(`input[name="mealPlan"][aria-label*="${mappedMeal}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "paymentFlexibility") {
            value.forEach(type => {
                const mappedType = AGODA_COM_MAP[type];
                if (!mappedType) return;

                const filterSection = document.getElementById(mappedType.name);
                filterSection.querySelectorAll('li').forEach(liElement => {
                    const text = liElement.innerText.trim();
                    if (text.startsWith(mappedType.text)) {
                        const checkbox = liElement.querySelector('input[type="checkbox"]');
                        if (checkbox && !checkbox.checked) {
                            checkbox.click();
                        }
                    }
                });
            });
        }
        else if (key === "propertyBrands") {
            value.forEach(brand => {
                const mappedBrand = AGODA_COM_MAP[brand];
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
                const mappedType = AGODA_COM_MAP[type];
                if (!mappedType) return;

                const filterSection = document.getElementById(mappedType.name);
                filterSection.querySelectorAll('li').forEach(liElement => {
                    const text = liElement.innerText.trim();
                    if (text.startsWith(mappedType.text)) {
                        const checkbox = liElement.querySelector('input[type="checkbox"]');
                        if (checkbox && !checkbox.checked) {
                            checkbox.click();
                        }
                    }
                });
            });
        }
        else if (key === "starRatings") {
            value.forEach(type => {
                const mappedType = AGODA_COM_MAP[type];
                if (!mappedType) return;

                const filterSection = document.getElementById(mappedType.name);
                filterSection.querySelectorAll('li').forEach(liElement => {
                    const text = liElement.innerText.trim();
                    if (text.startsWith(mappedType.text)) {
                        const checkbox = liElement.querySelector('input[type="checkbox"]');
                        if (checkbox && !checkbox.checked) {
                            checkbox.click();
                        }
                    }
                });
            });
        }
        else if (key === "stayOption") {
            const mappedValue = AGODA_COM_MAP[value];
            if (mappedValue) {
                const radio = document.querySelector(`input[name="stay_options_group"][aria-label*="${mappedValue}"]`);
                if (radio && !radio.checked) {
                    radio.click(); // Simulate real user interaction
                }
            }
        }
        else if (key === "travelerExperiences") {
            value.forEach(type => {
                const mappedType = AGODA_COM_MAP[type];
                if (!mappedType) return;

                const filterSection = document.getElementById(mappedType.name);
                filterSection.querySelectorAll('li').forEach(liElement => {
                    const text = liElement.innerText.trim();
                    if (text.startsWith(mappedType.text)) {
                        const checkbox = liElement.querySelector('input[type="checkbox"]');
                        if (checkbox && !checkbox.checked) {
                            checkbox.click();
                        }
                    }
                });
            });
        }
    }

}