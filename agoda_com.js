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

            markFiltersAgoda()
            clickShowAllAgoda();
            setTimeout(() => {
                applyFiltersInAgodaCom(smartFilters);
            }, 2000);

        } else {
            console.warn("No smart filters found in storage.");
        }
    });
}

const AGODA_COM_MAP = {

    //
    //Bed Preference
    //

    single_twin_beds: { name: "this-filter-bed-type", text: "Single/twin" },
    double_bed: { name: "this-filter-bed-type", text: "Double" },
    king_bed: { name: "this-filter-bed-type", text: "King" },
    queen_bed: { name: "this-filter-bed-type", text: "Queen" },

    //
    // Cancellation => Payment options
    //

    free_cancellation: {
        name: "this-filter-payment-options",
        text: "Free cancellation"
    },

    //
    // Guest Rating
    //
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
    // Location Rating
    //

    location_rating_9: {
        name: "this-filter-location-score",
        text: "9+ Exceptional"
    },
    location_rating_8: {
        name: "this-filter-location-score",
        text: "8+ Excellent"
    },
    location_rating_7: {
        name: "this-filter-location-score",
        text: "7+ Very good"
    },

    //
    // Meals
    //

    meal_plan_breakfast: {
        name: "this-filter-room-offer",
        text: "Breakfast included"
    },
    meal_plan_dinner: {
        name: "this-filter-room-offer",
        text: "Lunch included"
    },
    meal_plan_lunch: {
        name: "this-filter-room-offer",
        text: "Dinner included"
    },
    meal_plan_gluten_free: {
        name: "this-filter-room-offer",
        text: "Gluten-free"
    },

    //
    // Payment Flexibility  =>Payment options
    //
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

    //
    // Property Accessibility
    //
    facilities_disabled_guests: {
        name: "this-filter-property-amenities",
        text: "Facilities for disabled guests"
    },


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
    early_check_in: {
        name: "this-filter-room-offer",
        text: "Early check-in"
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
    internet: {
        name: "this-filter-property-amenities",
        text: "Internet"
    },
    late_check_out: {
        name: "this-filter-room-offer",
        text: "Late check-out"
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

    //
    // Property Brand
    //

    best_western: {
        name: "this-filter-property-brand",
        text: "Best Western International"
    },
    best_western_plus: {
        name: "this-filter-property-brand",
        text: "Best Western International"
    },
    choice_hotels: {
        name: "this-filter-property-brand",
        text: "Choice Hotels"
    },
    extended_stay_america: {
        name: "this-filter-property-brand",
        text: "Extended Stay America"
    },
    hilton_worldwide: {
        name: "this-filter-property-brand",
        text: "Hilton Worldwide"
    },
    hyatt_hotels: {
        name: "this-filter-property-brand",
        text: "Hyatt Hotels"
    },
    intercontinental_hotels_group: {
        name: "this-filter-property-brand",
        text: "InterContinental Hotels Group"
    },
    marriott: {
        name: "this-filter-property-brand",
        text: "Marriott Hotels and Resorts"
    },
    oyo: {
        name: "this-filter-property-brand",
        text: "OYO Rooms"
    },
    sonesta: {
        name: "this-filter-property-brand",
        text: "Sonesta"
    },
    travelstaytion: {
        name: "this-filter-property-brand",
        text: "TravelStaytion"
    },
    wyndham_hotels_resorts: {
        name: "this-filter-property-brand",
        text: "Wyndham Hotels & Resorts"
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


    //
    // Room amenities
    //

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

    //
    // Star Ratings
    //

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

    //
    // Traveler Experience
    //

    travel_experience_family_friendly: {
        name: "this-filter-property-amenities",
        text: "Family/child friendly"
    },
    travel_experience_pet_friendly: [
        {
            name: "this-filter-room-amenities",
            text: "Pets allowed in room"
        },
        {
            name: "this-filter-property-amenities",
            text: "Pets allowed"
        }
    ],
    travel_experience_business: {
        name: "this-filter-property-amenities",
        text: "Business facilities"
    },


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
        else if (key === "bedPreference") {
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
        else if (key === "locationRating") {
            const mappedType = AGODA_COM_MAP[value];
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
            const inputMin = document.getElementById("price_box_0");
            const inputMax = document.getElementById("price_box_1");
            if (!inputMin || !inputMax) return;

            // Simulate pressing Enter
            const enterEvent = new KeyboardEvent("keydown", {
                bubbles: true,
                cancelable: true,
                key: "Enter",
                code: "Enter",
                keyCode: 13,
                which: 13
            });

            if (smartFilters.minPrice != null) {
                // Set the value
                inputMin.value = smartFilters.minPrice;

                // Trigger input/change events if needed
                inputMin.dispatchEvent(new Event("input", { bubbles: true }));
                inputMin.dispatchEvent(new Event("change", { bubbles: true }));

                inputMin.dispatchEvent(enterEvent);
            }

            if (smartFilters.maxPrice != null) {
                inputMax.value = smartFilters.maxPrice;

                // Trigger input/change events if needed
                inputMax.dispatchEvent(new Event("input", { bubbles: true }));
                inputMax.dispatchEvent(new Event("change", { bubbles: true }));

                inputMax.dispatchEvent(enterEvent);
            }
        }
        else if (key === "meals") {
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
        else if (key === "propertyBrands") {
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
        else if (key === "travelerExperiences") {
            value.forEach(type => {
                let mappedTypes = AGODA_COM_MAP[type];
                if (!mappedTypes) return;

                // Normalize to an array if it's a single object
                if (!Array.isArray(mappedTypes)) {
                    mappedTypes = [mappedTypes];
                }

                mappedTypes.forEach(mappedType => {
                    const filterSection = document.getElementById(mappedType.name);
                    if (!filterSection) return;

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
            });
        }
    }
}