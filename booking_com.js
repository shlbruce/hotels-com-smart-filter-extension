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

    // Entire unit located on ground floor
    // Adapted bath
    // Walk-in shower
    // Emergency cord in bathroom
    // Shower chair

    //  Property Accessibility
    
    // Toilet with grab rails
    // Raised toilet
    // Lowered sink
    // Bathroom emergency cord
    // Visual aids (Braille)
    // Visual aids (tactile signs)
    // Auditory guidance

    //  Accessibility => Room Accessibility and Property Accessibility
    roll_in_shower: {
        name: "accessible_room_facilities",
        aria_label: ["Roll-in shower"]
    },
    elevator: {
        name: "accessible_room_facilities",
        aria_label: ["Upper floors accessible by elevator"]
    },
    in_room: {
        name: "accessible_room_facilities",
        aria_label: ["Entire unit wheelchair accessible"]
    },
    accessible_bathroom: {
        name: "accessible_room_facilities",
        aria_label: ["Toilet with grab rails", "Raised toilet", "Lower sink"]
    },
    // service_animals: {
    //     name: "service_animals",
    //     aria_label: "Service animals allowed"
    // },
    // stair_free: {
    //     name: "stair_free",
    //     aria_label: "Stair-free path to entrance"
    // },
    wheelchair_parking: {
        name: "hotelfacility",
        aria_label: "Wheelchair accessible"
    },
    // sign_language: {
    //     name: "sign_language",
    //     aria_label: "Sign language-capable staff"
    // },

    // Amenities => Amenities  
    parking: { name: "hotelfacility", aria_label: "Parking" },
    pool: { name: "hotelfacility", aria_label: "Swimming pool" },
    restaurant: { name: "hotelfacility", aria_label: "Restaurant" },
    // Room service
    // 24-hour front desk
    gym: { name: "hotelfacility", aria_label: "Fitness center" },
    // Non-smoking rooms
    airport_shuttle: { name: "hotelfacility", aria_label: "Airport shuttle" },
    // Family rooms
    spa: { name: "hotelfacility", aria_label: "Spa" },
    //this is hotel hot tub, not in room hot tub. We need update settings to hotel facility or room facility
    hot_tub: { name: "hotelfacility", aria_label: "Hot tub/Jacuzzi" }, 
    wifi: { name: "hotelfacility", aria_label: "Free Wifi" },
    electric_charger: { name: "hotelfacility", aria_label: "Electric vehicle charging station" },

    // Amenities => Room amenities
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

    // amenities => Travel group
    pet_friendly: { name: "stay_type", aria_label: "Pet friendly" },
    
    // 
    // golf_course: { name: "golf_course", aria_label: "Golf course" },
    // bar: { name: "bar", aria_label: "Bar" },
    // outdoor_space: { name: "outdoor_space", aria_label: "Outdoor space" },
    // water_park: { name: "water_park", aria_label: "Water park" },
    // cribs: { name: "cribs", aria_label: "Cribs" },

    // // Availability
    // available_only: { name: "available_only", aria_label: "Only show available properties" },

    // Cancellation => Reservation policy
    //fully_refundable or Free cancellation not complete same, need update the settings, then we can map here. 
    fully_refundable: { name: "fc", aria_label: "Free cancellation" },

    // // Discounts
    // vip: { name: "vip", aria_label: "VIP Access properties" },
    // member: { name: "member", aria_label: "Member Prices" },
    // discounted: { name: "discounted", aria_label: "Discounted properties" },


    // Guest Rating => Guest review score

    guest_rating_9: { name: "review_score", aria_label: "Wonderful: 9+" },
    guest_rating_8: { name: "review_score", aria_label: "Very Good: 8+" },
    guest_rating_7: { name: "review_score", aria_label: "Good: 7+" },
    guest_rating_6: { name: "review_score", aria_label: "Pleasant: 6+" },

    // Payment Type => Reservation policy
    pay_later: { name: "fc", aria_label: "No prepayment" },
    // gift_card: { name: "gift_card", aria_label: "Pay with Hotels.com gift card" },

    // Property Type => Property Type

    hotel: { name: "ht_", aria_label: "Hotels" },
    // Entire homes & apartments
    apartment: { name: "ht_", aria_label: "Apartments" },
    hostel: { name: "ht_", aria_label: "Hostels" },
    guesthouse: { name: "ht_", aria_label: "Guesthouses" },
    vacation_home: { name: "ht_", aria_label: "Vacation Homes" },
    bnb: { name: "ht_", aria_label: "Bed and Breakfasts" },
    motel: { name: "ht_", aria_label: "Motels" },
    // Homestays
    resort: { name: "ht_", aria_label: "Resorts" },
    villa: { name: "ht_", aria_label: "Villas" },

    // condo: { name: "condo", aria_label: "Condo" },
    // aparthotel: { name: "aparthotel", aria_label: "Aparthotel" },
    // condo_resort: { name: "condo_resort", aria_label: "Condo resort" },
    // cottage: { name: "cottage", aria_label: "Cottage" },
    
    
    // Property Brand => Brands

    hampton: { name: "chaincode", aria_label: "Hampton Inn" },
    hilton: { name: "chaincode", aria_label: "Hilton Hotels & Resorts" },
    hyatt: { name: "chaincode", aria_label: ["Hyatt Regency", "Hyatt Place", "Hyatt Place", "Hyatt House"] },
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

    // // Stay Option
    // stay_options_any: { name: "stay_options_any", aria_label: "Any" },
    // stay_options_hotels: { name: "stay_options_hotels", aria_label: "Hotels" },
    // stay_options_homes: { name: "stay_options_homes", aria_label: "Homes" },

    // Traveler Experience  => Travel group
    travel_experience_adults_only: { name: "stay_type", aria_label: "Adults only" },

    // travel_experience_family_friendly: { name: "travel_experience_family_friendly", aria_label: "Family friendly" },
    // travel_experience_lgbtq: { name: "travel_experience_lgbtq", aria_label: "LGBTQ welcoming" },
    // travel_experience_luxury: { name: "travel_experience_luxury", aria_label: "Luxury" },
    // travel_experience_business: { name: "travel_experience_business", aria_label: "Business friendly" },
    // travel_experience_beach: { name: "travel_experience_beach", aria_label: "Beach" },
    // travel_experience_romantic: { name: "travel_experience_romantic", aria_label: "Romantic" },
    // travel_experience_eco: { name: "travel_experience_eco", aria_label: "Eco-certified" },
    // travel_experience_budget: { name: "travel_experience_budget", aria_label: "Budget" },
    // travel_experience_wedding: { name: "travel_experience_wedding", aria_label: "Wedding" },

    // Meals => Meals
    meal_plan_breakfast: { name: "mealplan", aria_label: "Breakfast included" },
    // meal_plan_dinner: { name: "meal_plan_dinner", aria_label: "Dinner included" },
    // meal_plan_lunch: { name: "meal_plan_lunch", aria_label: "Lunch included" },
    // meal_plan_all_inclusive: { name: "meal_plan_all_inclusive", aria_label: "All inclusive" }
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
        else if (key === "amenities") {
            value.forEach(amenity => {
                const mappedAmenity = BOOKING_COM_MAP[amenity];
                if (!mappedAmenity) return; 
                const checkbox = document.querySelector(`input[name*="${mappedAmenity.name}"][aria-label*="${mappedAmenity.aria_label}"]`);
                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                }
            });
        }
        // else if (key === "availability") {
        //     value.forEach(availability => {
        //         const mappedAvailability = BOOKING_COM_MAP[availability];
        //         const checkbox = document.querySelector(`input[name="availableFilter"][aria-label*="${mappedAvailability}"]`);
        //         if (checkbox && !checkbox.checked) {
        //             checkbox.click();
        //         }
        //     });
        // }
        // else if (key === "cancellation") {
        //     value.forEach(cancellation => {
        //         const mappedCancellation = BOOKING_COM_MAP[cancellation];
        //         const checkbox = document.querySelector(`input[name="paymentType"][aria-label*="${mappedCancellation}"]`);
        //         if (checkbox && !checkbox.checked) {
        //             checkbox.click();
        //         }
        //     });
        // }
        // else if (key === "discounts") {
        //     value.forEach(discount => {
        //         const mappedDiscount = BOOKING_COM_MAP[discount];
        //         const checkbox = document.querySelector(`input[name="rewards"][aria-label*="${mappedDiscount}"]`);
        //         if (checkbox && !checkbox.checked) {
        //             checkbox.click();
        //         }
        //     });
        // }
        // // handle minPrice and maxPrice together
        // else if (key === "maxPrice") {
        //     const sliderMax = document.querySelector('input[type="range"][aria-label*="Maximum"]');
        //     const sliderMin = document.querySelector('input[type="range"][aria-label*="Minimum"]');
        //     if (sliderMax && value != null) {
        //         sliderMax.value = value;
        //         // don't try to put MouseDown event, it will trigger sliderMax not work. 
        //         // I guess mousedown take some time to process, then sliderMax.mouseup event will be too closed to sliderMin.mouseup
        //         // then only one mouseup event is executed.
        //         sliderMax.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        //     }

        //     if (sliderMin && smartFilters.minPrice != null) {
        //         setTimeout(() => {
        //             sliderMin.value = smartFilters.minPrice || 0;
        //             sliderMin.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        //         }, 2000);
        //     }
        // }
        // else if (key === "meals") {
        //     value.forEach(meal => {
        //         const mappedMeal = BOOKING_COM_MAP[meal];
        //         const checkbox = document.querySelector(`input[name="mealPlan"][aria-label*="${mappedMeal}"]`);
        //         if (checkbox && !checkbox.checked) {
        //             checkbox.click();
        //         }
        //     });
        // }
        // else if (key === "paymentTypes") {
        //     value.forEach(paymentType => {
        //         const mappedPaymentType = BOOKING_COM_MAP[paymentType];
        //         const checkbox = document.querySelector(`input[name="paymentType"][aria-label*="${mappedPaymentType}"]`);
        //         if (checkbox && !checkbox.checked) {
        //             checkbox.click();
        //         }
        //     });
        // }
        // else if (key === "propertyBrands") {
        //     value.forEach(brand => {
        //         const mappedBrand = BOOKING_COM_MAP[brand];
        //         const checkbox = document.querySelector(`input[name="hotel_brand"][aria-label*="${mappedBrand}"]`);
        //         if (checkbox && !checkbox.checked) {
        //             checkbox.click();
        //         }
        //     });
        // }
        // else if (key === "propertyTypes") {
        //     value.forEach(type => {
        //         const mappedType = BOOKING_COM_MAP[type];
        //         const checkbox = document.querySelector(`input[name="lodging"][aria-label*="${mappedType}"]`);
        //         if (checkbox && !checkbox.checked) {
        //             checkbox.click();
        //         }
        //     });
        // }
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
        // else if (key === "stayOption") {
        //     const mappedValue = BOOKING_COM_MAP[value];
        //     const radio = document.querySelector(`input[name="stay_options_group"][aria-label*="${mappedValue}"]`);
        //     if (radio && !radio.checked) {
        //         radio.click(); // Simulate real user interaction
        //     }

        //     const mappedGuestRating = BOOKING_COM_MAP[smartFilters.guestRating];
        //     const radioGuestRating = document.querySelector(`input[name="guestRating"][aria-label*="${mappedGuestRating}"]`);
        //     if (radioGuestRating && !radioGuestRating.checked) {
        //         setTimeout(() => {
        //             radioGuestRating.click(); // Simulate real user interaction
        //         }, 2000);
        //     }
        // }
        // else if (key === "travelerExperiences") {
        //     value.forEach(experience => {
        //         const mappedExperience = BOOKING_COM_MAP[experience];
        //         const checkbox = document.querySelector(`input[name="travelerType"][aria-label*="${mappedExperience}"]`);
        //         if (checkbox && !checkbox.checked) {
        //             checkbox.click();
        //         }
        //     });
        // }
    }

}