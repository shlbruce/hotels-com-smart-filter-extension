function addSmartFilterButtonOnBookingCom() {

    // Check if the button already exists
    if (document.getElementById("smart-filter-button")) {
        return;
    }

    // Find the heading with text "Filter by"
    const headings = document.querySelectorAll('h2');
    const filterHeading = Array.from(headings).find(h => h.textContent.trim() === 'Filter by:');

    if (!filterHeading) {
        return;
    }

    const rect = filterHeading.getBoundingClientRect();
    markFilterSideBar(rect);

    const container = document.createElement("div");
    container.id = "smart-filter-container";
    container.style.display = "inline-block"; // optional: makes container shrink-wrap the button

    const button = document.createElement("button");
    button.id = "smart-filter-button";
    button.textContent = "Apply your filters";

    // Compact styling
    button.style.width = "auto";
    button.style.display = "inline-block";
    button.style.margin = "6px 0px";
    button.style.padding = "6px 3px";
    button.style.fontSize = "12px";
    button.style.cursor = "pointer";
    button.style.borderRadius = "8px";
    button.style.border = "1px solid #ccc";
    button.style.color = "red";
    button.style.backgroundColor = "#f5f5f5";
    button.style.transition = "background-color 0.1s, transform 0.1s";

    // Append button to container
    container.appendChild(button);


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
    button.addEventListener("click", handleSmartFilterClickOnBookingCom);

    filterHeading.insertAdjacentElement("beforebegin", container);

    clickShowAll();
}

function handleSmartFilterClickOnBookingCom(event) {

    event.stopPropagation(); // ⛔ Prevents event bubbling
    event.preventDefault();  // ⛔ Prevents default action

    chrome.storage.sync.get(["smartFilters"], function (result) {
        const smartFilters = result.smartFilters;
        if (smartFilters) {
            const buttons = document.querySelectorAll("button");
            const clearFiltersBtn = Array.from(buttons).find(btn =>
                btn.textContent.trim() === "Clear filters"
            );

            if (clearFiltersBtn) {
                clearFiltersBtn.click();
            }
            else {
                uncheckAllFilters();
                console.warn("Clear filters button not found.");
            }

            setTimeout(() => {
                applyFiltersInBookingCom(smartFilters);
            }, 2000);

        } else {
            console.warn("No smart filters found in storage.");
        }
    });
}
const BOOKING_COM_MAP = {

    // Room Accessibility

    accessible_bathroom: {
        name: "accessible_room_facilities",
        aria_label: ["Toilet with grab rails", "Raised toilet", "Lower sink"]
    },
    adapted_bath: {
        name: "accessible_room_facilities",
        aria_label: ["Adapted bath"]
    },
    emergency_cord_bathroom: {
        name: "accessible_room_facilities",
        aria_label: ["Emergency cord in bathroom"]
    },
    entire_unit_ground_floor: {
        name: "accessible_room_facilities",
        aria_label: ["Entire unit located on ground floor"]
    },
    in_room: {
        name: "accessible_room_facilities",
        aria_label: ["Entire unit wheelchair accessible"]
    },
    roll_in_shower: {
        name: "accessible_room_facilities",
        aria_label: ["Roll-in shower"]
    },
    shower_chair: {
        name: "accessible_room_facilities",
        aria_label: ["Shower chair"]
    },
    walk_in_shower: {
        name: "accessible_room_facilities",
        aria_label: ["Walk-in shower"]
    },

    // Property Accessibility
    auditory_guidance: {
        name: "accessible_facilities",
        aria_label: ["Auditory guidance"]
    },
    bathroom_emergency_cord: {
        name: "accessible_facilities",
        aria_label: ["Bathroom emergency cord"]
    },
    elevator: {
        name: "accessible_room_facilities",
        aria_label: ["Upper floors accessible by elevator"]
    },
    lowered_sink: {
        name: "accessible_facilities",
        aria_label: ["Lowered sink"]
    },
    raised_toilet: {
        name: "accessible_facilities",
        aria_label: ["Raised toilet"]
    },
    toilet_grab_rails: {
        name: "accessible_facilities",
        aria_label: ["Toilet with grab rails"]
    },
    visual_braille: {
        name: "accessible_facilities",
        aria_label: ["Visual aids (Braille)"]
    },
    visual_tactile: {
        name: "accessible_facilities",
        aria_label: ["Visual aids (tactile signs)"]
    },
    wheelchair: {
        name: "hotelfacility",
        aria_label: ["Wheelchair accessible"]
    },

    // Property Amenities

    airport_shuttle: { name: "hotelfacility", aria_label: "Airport shuttle" },
    bar: { name: "hotelfacility", aria_label: "Bar" },
    casino: { name: "hotelfacility", aria_label: "Casino" },
    electric_charger: { name: "hotelfacility", aria_label: "Electric vehicle charging station" },
    family_rooms: { name: "hotelfacility", aria_label: "Family rooms" },
    front_desk_24h: { name: "hotelfacility", aria_label: "24-hour front desk" },
    golf_course: { name: "hotelfacility", aria_label: "Golf course" },
    gym: { name: "hotelfacility", aria_label: "Fitness center" },
    //this is hotel hot tub, not in room hot tub.
    hot_tub: { name: "hotelfacility", aria_label: "Hot tub/Jacuzzi" },
    non_smoking_rooms: { name: "hotelfacility", aria_label: "Non-smoking rooms" },
    parking: { name: "hotelfacility", aria_label: "Parking" },
    pool: { name: "hotelfacility", aria_label: "Swimming pool" },
    restaurant: { name: "hotelfacility", aria_label: "Restaurant" },
    room_service: { name: "hotelfacility", aria_label: "Room service" },
    spa: { name: "hotelfacility", aria_label: "Spa" },
    water_park: { name: "hotelfacility", aria_label: "Water park" },

    // Amenities => Room amenities
    wifi: { name: "hotelfacility", aria_label: "Free Wifi" },
    air_conditioned: { name: "roomfacility", aria_label: "Air conditioning" },
    // Private bathroom
    ocean_view: { name: "roomfacility", aria_label: "Sea view" },
    // Private pool
    // Hot tub (this is in room hot-tub)
    washer_dryer: { name: "roomfacility", aria_label: "Washing machine" },
    // View
    // Refrigerator
    // Upper floors accessible by elevator (this is in room facility)
    // Flat-screen TV
    // Toilet
    // Lake view
    // Towels
    // Shower
    // Bathtub
    // Complimentary evening snacks and drinks in the executive lounge
    // Sauna
    // Fireplace
    // Linens
    // Barbecue
    // Computer
    // Game console
    // TV
    // Fax
    // Reading light

    // amenities => Kitchen
    kitchen: { name: "kitchen", aria_label: "Private kitchen" },

    // casino: { name: "casino", aria_label: "Casino" },

    // 
    // golf_course: { name: "golf_course", aria_label: "Golf course" },
    // bar: { name: "bar", aria_label: "Bar" },
    // outdoor_space: { name: "outdoor_space", aria_label: "Outdoor space" },
    // water_park: { name: "water_park", aria_label: "Water park" },
    // cribs: { name: "cribs", aria_label: "Cribs" },

    // Cancellation => Reservation policy
    free_cancellation: { name: "fc", aria_label: "Free cancellation" },

    // Guest Rating => Guest review score
    guest_rating_9: { name: "review_score", aria_label: "Wonderful: 9+" },
    guest_rating_8: { name: "review_score", aria_label: "Very Good: 8+" },
    guest_rating_7: { name: "review_score", aria_label: "Good: 7+" },
    guest_rating_6: { name: "review_score", aria_label: "Pleasant: 6+" },

    // Payment Flexibility => Reservation policy 
    no_prepayment: { name: "fc", aria_label: "No prepayment" },
    online_payment: { name: "pmt", aria_label: "Accepts online payments" },
    apple_pay: { name: "pmt", aria_label: "Apple Pay" },

    //
    // Property Type => Property Type
    //

    apartment: { name: "ht_", aria_label: "Apartments" },
    bnb: { name: "ht_", aria_label: "Bed and Breakfasts" },
    entire_home: { name: "privacy_type", aria_label: "Entire homes & apartments" },
    guesthouse: { name: "ht_", aria_label: "Guesthouses" },
    hostel: { name: "ht_", aria_label: "Hostels" },
    homestay: { name: "ht_", aria_label: "Homestays" },
    hotel: { name: "ht_", aria_label: "Hotels" },
    motel: { name: "ht_", aria_label: "Motels" },
    resort: { name: "ht_", aria_label: "Resorts" },
    vacation_home: { name: "ht_", aria_label: "Vacation Homes" },
    villa: { name: "ht_", aria_label: "Villas" },

    // Property Brand => Brands

    hampton: { name: "chaincode", aria_label: ["Hampton Inn"] },
    hilton: { name: "chaincode", aria_label: ["Hilton Hotels & Resorts"] },
    hyatt: { name: "chaincode", aria_label: ["Hyatt Regency", "Hyatt Place", "Hyatt House"] },
    // Homewood Suites by Hilton
    // Best Western
    // Courtyard by Marriott
    // Hilton Garden Inn
    // Autograph Collection
    // Sonesta Hotels
    // Holiday Inn Hotels & Resorts
    // Curio Collection by Hilton
    // Westin
    // Travelodge by Wyndham
    // Sofitel
    // InterContinental Hotels & Resorts
    // Crowne Plaza Hotels & Resorts
    // Marriott Hotels & Resorts
    // Eurostars Hotels

    // mgm: { name: "mgm", aria_label: "MGM" },
    // caesars: { name: "caesars", aria_label: "Caesars Entertainment" },
    // venetian_las_vegas: { name: "venetian_las_vegas", aria_label: "Venetian Las Vegas" },
    // boyd: { name: "boyd", aria_label: "Boyd Gaming" },
    // wynn: { name: "wynn", aria_label: "Wynn Resorts" },

    // world_bw: { name: "world_bw", aria_label: "World Hotels BW" },

    // station: { name: "station", aria_label: "Station Casinos" },
    // conrad: { name: "conrad", aria_label: "Conrad" },
    // hilton_grand: { name: "hilton_grand", aria_label: "Hilton Grand Vacations" },
    // golden_nugget: { name: "golden_nugget", aria_label: "Golden Nugget" },
    // trump: { name: "trump", aria_label: "Trump Hotels" },
    // curio: { name: "curio", aria_label: "Curio Collection" },
    // oyo: { name: "oyo", aria_label: "OYO AMER" },
    // westgate: { name: "westgate", aria_label: "Westgate Resorts" },
    // doubletree: { name: "doubletree", aria_label: "Doubletree" },

    // motel6: { name: "motel6", aria_label: "Motel 6" },
    // la_quinta: { name: "la_quinta", aria_label: "La Quinta Inn & Suites" },
    // lxr_hotels_resorts: { name: "lxr_hotels_resorts", aria_label: "LXR Hotels & Resorts" },
    // best_western_plus: { name: "best_western_plus", aria_label: "Best Western Plus" },
    // holiday_inn_express: { name: "holiday_inn_express", aria_label: "Holiday Inn Express Hotel" },
    // wyndham_extra_holidays: { name: "wyndham_extra_holidays", aria_label: "Wyndham Extra Holidays" },
    // four_seasons: { name: "four_seasons", aria_label: "Four Seasons" },

    // Star Ratings => Property rating
    starRating_5: { name: "class=", aria_label: "5 stars" },
    starRating_4: { name: "class=", aria_label: "4 stars" },
    starRating_3: { name: "class=", aria_label: "3 stars" },
    starRating_2: { name: "class=", aria_label: "2 stars" },

    // Traveler Experience  => Travel group
    travel_experience_adults_only: { name: "stay_type", aria_label: "Adults only" },
    travel_experience_pet_friendly: { name: "stay_type", aria_label: "Pet friendly" },

    // Meals => Meals
    meal_plan_breakfast: { name: "mealplan", aria_label: "Breakfast included" },
};



function applyFiltersInBookingCom(smartFilters) {

    for (const [key, value] of Object.entries(smartFilters)) {

        if (key === "accessibility") {
            value.forEach(accessibility => {
                const mappedAccessibility = BOOKING_COM_MAP[accessibility];
                if (!mappedAccessibility) return;
                mappedAccessibility.aria_label.forEach(label => {
                    let checkbox = document.querySelector(`input[name*='${mappedAccessibility.name}'][aria-label*='${label}']`);
                    if (checkbox && !checkbox.checked) {
                        checkbox.click();
                    }
                });
            });
        }
        else if (key === "propertyAccessibility") {
            value.forEach(accessibility => {
                const mappedAccessibility = BOOKING_COM_MAP[accessibility];
                if (!mappedAccessibility) return;
                mappedAccessibility.aria_label.forEach(label => {
                    let checkbox = document.querySelector(`input[name*='${mappedAccessibility.name}'][aria-label*='${label}']`);
                    if (checkbox && !checkbox.checked) {
                        checkbox.click();
                    }
                });
            });
        }
        else if (key === "propertyAmenities") {
            value.forEach(amenity => {
                const mappedAmenity = BOOKING_COM_MAP[amenity];
                if (!mappedAmenity) return;
                const checkbox = document.querySelector(`input[name*="${mappedAmenity.name}"][aria-label*="${mappedAmenity.aria_label}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "cancellation") {
            value.forEach(cancellation => {
                const mappedCancellation = BOOKING_COM_MAP[cancellation];
                if (!mappedCancellation) return;
                const checkbox = document.querySelector(`input[name*="${mappedCancellation.name}"][aria-label*="${mappedCancellation.aria_label}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "guestRatings") {
            value.forEach(rating => {
                const mappedRating = BOOKING_COM_MAP[rating];
                if (!mappedRating) return;
                const checkbox = document.querySelector(`input[name*="${mappedRating.name}"][aria-label*="${mappedRating.aria_label}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "meals") {
            value.forEach(meal => {
                const mappedMeal = BOOKING_COM_MAP[meal];
                if (!mappedMeal) return;
                const checkbox = document.querySelector(`input[name*="${mappedMeal.name}"][aria-label*="${mappedMeal.aria_label}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "paymentFlexibility") {
            value.forEach(paymentFlexibility => {
                const mappedPaymentFlexibility = BOOKING_COM_MAP[paymentFlexibility];
                if (!mappedPaymentFlexibility) return;
                const checkbox = document.querySelector(`input[name*="${mappedPaymentFlexibility.name}"][aria-label*="${mappedPaymentFlexibility.aria_label}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "propertyBrands") {
            value.forEach(brand => {
                const mappedBrand = BOOKING_COM_MAP[brand];
                if (!mappedBrand) return;
                mappedBrand.aria_label.forEach(label => {
                    const checkbox = document.querySelector(`input[name*="${mappedBrand.name}"][aria-label*="${label}"]`);
                    if (checkbox && !checkbox.checked) {
                        checkbox.click();
                    }
                }
                );
            });
        }
        else if (key === "propertyTypes") {
            value.forEach(type => {
                const mappedType = BOOKING_COM_MAP[type];
                if (!mappedType) return;
                const checkbox = document.querySelector(`input[name*="${mappedType.name}"][aria-label*="${mappedType.aria_label}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "starRatings") {
            value.forEach(rating => {
                const mappedRating = BOOKING_COM_MAP[rating];
                if (!mappedRating) return;
                const checkbox = document.querySelector(`input[name*="${mappedRating.name}"][aria-label*="${mappedRating.aria_label}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        else if (key === "travelerExperiences") {
            value.forEach(experience => {
                const mappedExperience = BOOKING_COM_MAP[experience];
                if (!mappedExperience) return;
                const checkbox = document.querySelector(`input[name*="${mappedExperience.name}"][aria-label*="${mappedExperience.aria_label}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
    }

    // Handle minPrice and maxPrice here, otherwise when other filters are applied, the price filter will be reset
    // So add timeout to ensure other filters are applied first
    setTimeout(() => {
        // Click the "Apply filters" button
        // // handle minPrice and maxPrice together
        const sliderMax = document.querySelector('input[type="range"][aria-label="Max."]');
        const sliderMin = document.querySelector('input[type="range"][aria-label="Min."]');
        if (sliderMax && smartFilters.maxPrice != null) {
            sliderMax.value = smartFilters.maxPrice;
            sliderMax.dispatchEvent(new Event('input', { bubbles: true }));
            sliderMax.dispatchEvent(new Event('change', { bubbles: true }));
        }

        if (sliderMin && smartFilters.minPrice != null) {
            sliderMin.value = smartFilters.minPrice || 0;
            sliderMin.dispatchEvent(new Event('input', { bubbles: true }));
            sliderMin.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }, 1000);

}