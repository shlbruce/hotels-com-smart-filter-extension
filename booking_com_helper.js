function markFilterSideBar(filterHeadingRect) {
    const filtersDivs = document.querySelectorAll('div[aria-label="Filters"]');
    filtersDivs.forEach((div, index) => {
        const rect = div.getBoundingClientRect();
        if (doesRectCover(rect, filterHeadingRect)) {
            div.id = "this-filter-sidebar";

            markAmenitiesFilters(div);
            markPropertyTypeFilters(div);
            markKitchenFilters(div);
            markOutdoorSpaceFilters(div);
            markMealsFilters(div);
            markGuestReviewScoreFilters(div);
            markRoomAmenitiesFilters(div);
            markPropertyRatingFilters(div);
            markTravelGroupFilters(div);
            markBedPreferenceFilters(div);
            markReservationPolicyFilters(div);
            markOnlinePaymentFilters(div);
            markBrandsFilters(div);
            markPropertyAccessibilityFilters(div);
            markRoomAccessibilityFilters(div);
            return;
        }
    });
}

function markAmenitiesFilters(filterSiderBar) {
    const amenitiesDiv = filterSiderBar.querySelector('div[id*="filter_group_hotelfacility"]');
    if (amenitiesDiv) {
        amenitiesDiv.id = "this-filter-amenities";
    }
    else {
        console.log("Amenities filter not found");
    }
}

function markPropertyTypeFilters(filterSiderBar) {
    const propertyTypeDiv = filterSiderBar.querySelector('div[id*="filter_group_ht_id"]');
    if (propertyTypeDiv) {
        propertyTypeDiv.id = "this-filter-property-type";
    }
    else {
        console.log("Property type filter not found");
    }
}

function markKitchenFilters(filterSiderBar) {
    const kitchenDiv = filterSiderBar.querySelector('div[id*="filter_group_kitchen"]');
    if (kitchenDiv) {
        kitchenDiv.id = "this-filter-kitchen";
    }
    else {
        console.log("Kitchen filter not found");
    }
}

function markOutdoorSpaceFilters(filterSiderBar) {
    const outdoorSpaceDiv = filterSiderBar.querySelector('div[id*="filter_group_outdoor_facilities"]');
    if (outdoorSpaceDiv) {
        outdoorSpaceDiv.id = "this-filter-outdoor-space";
    }
    else {
        console.log("Outdoor space filter not found");
    }
}

function markMealsFilters(filterSiderBar) {
    const mealsDiv = filterSiderBar.querySelector('div[id*="filter_group_mealplan"]');
    if (mealsDiv) {
        mealsDiv.id = "this-filter-meals";
    }
    else {
        console.log("Meals filter not found");
    }
}

function markGuestReviewScoreFilters(filterSiderBar) {
    const guestReviewScoreDiv = filterSiderBar.querySelector('div[id*="filter_group_review_score"]');
    if (guestReviewScoreDiv) {
        guestReviewScoreDiv.id = "this-filter-guest-review-score";
    }
    else {
        console.log("Guest review score filter not found");
    }
}

function markRoomAmenitiesFilters(filterSiderBar) {
    const div = filterSiderBar.querySelector('div[id*="filter_group_roomfacility"]');
    if (div) {
        div.id = "this-filter-room-amenities";
    }
    else {
        console.log("Room amenities filter not found");
    }
}

function markPropertyRatingFilters(filterSiderBar) {
    const div = filterSiderBar.querySelector('div[id*="filter_group_class"]');
    if (div) {
        div.id = "this-filter-property-rating";
    }
    else {
        console.log("Property rating filter not found");
    }
}

function markTravelGroupFilters(filterSiderBar) {
    const div = filterSiderBar.querySelector('div[id*="filter_group_stay_type"]');
    if (div) {
        div.id = "this-filter-travel-group";
    }
    else {
        console.log("Travel group filter not found");
    }
}

function markBedPreferenceFilters(filterSiderBar) {
    const div = filterSiderBar.querySelector('div[id*="filter_group_tdb"]');
    if (div) {
        div.id = "this-filter-bed-preference";
    }
    else {
        console.log("Bed preference filter not found");
    }
}

function markReservationPolicyFilters(filterSiderBar) {
    const div = filterSiderBar.querySelector('div[id*="filter_group_fc"]');
    if (div) {
        div.id = "this-filter-reservation-policy";
    }
    else {
        console.log("Reservation policy filter not found");
    }
}

function markOnlinePaymentFilters(filterSiderBar) {
    const div = filterSiderBar.querySelector('div[id*="filter_group_pmt"]');
    if (div) {
        div.id = "this-filter-online-payment";
    }
    else {
        console.log("Online Payment filter not found");
    }
}

function markBrandsFilters(filterSiderBar) {
    const div = filterSiderBar.querySelector('div[id*="filter_group_chaincode"]');
    if (div) {
        div.id = "this-filter-brands";
    }
    else {
        console.log("Brands filter not found");
    }
}

function markPropertyAccessibilityFilters(filterSiderBar) {
    const div = filterSiderBar.querySelector('div[id*="filter_group_accessible_facilities"]');
    if (div) {
        div.id = "this-filter-property-accessibility";
    }
    else {
        console.log("Property Accessibility filter not found");
    }
}

function markRoomAccessibilityFilters(filterSiderBar) {
    const div = filterSiderBar.querySelector('div[id*="filter_group_accessible_room_facilities"]');
    if (div) {
        div.id = "this-filter-room-Accessibility";
    }
    else {
        console.log("Room Accessibility filter not found");
    }
}




function clickShowAll() {
    const filterSiderBar = document.getElementById("this-filter-sidebar");
    if (!filterSiderBar) return;

    const amenitiesShowAllButton = filterSiderBar.querySelector('button[aria-controls*="filter_group_hotelfacility"]');

    if (amenitiesShowAllButton) {
        amenitiesShowAllButton.click();
    } else {
        console.log("amenitiesShowAllButton is not found");
    }

    const roomAmenitiesShowAllButton = filterSiderBar.querySelector('button[aria-controls*="filter_group_roomfacility"]');

    if (roomAmenitiesShowAllButton) {
        roomAmenitiesShowAllButton.click();
    } else {
        console.log("roomAmenitiesShowAllButton is not found");
    }

    const brandsShowAllButton = filterSiderBar.querySelector('button[aria-controls*="filter_group_chaincode"]');

    if (brandsShowAllButton) {
        brandsShowAllButton.click();
    } else {
        console.log("brandsShowAllButton is not found");
    }
}