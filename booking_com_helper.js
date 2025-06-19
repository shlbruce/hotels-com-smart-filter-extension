function markFilterSideBarBookingCom(filterHeadingRect) {
    const filtersDivs = document.querySelectorAll('div[aria-label="Filters"]');
    filtersDivs.forEach((div, index) => {
        const rect = div.getBoundingClientRect();
        if (doesRectCover(rect, filterHeadingRect)) {
            div.id = "this-filter-sidebar";

            markFiltersBookingCom(div);
            return;
        }
    });
}

const FILTER_MARKS_BOOKING_COM = [
    { keyword: "filter_group_hotelfacility", id: "this-filter-amenities" },
    { keyword: "filter_group_ht_id", id: "this-filter-property-type" },
    { keyword: "filter_group_kitchen", id: "this-filter-kitchen" },
    { keyword: "filter_group_outdoor_facilities", id: "this-filter-outdoor-space" },
    { keyword: "filter_group_mealplan", id: "this-filter-meals" },
    { keyword: "filter_group_review_score", id: "this-filter-guest-review-score" },
    { keyword: "filter_group_roomfacility", id: "this-filter-room-amenities" },
    { keyword: "filter_group_class", id: "this-filter-property-rating" },
    { keyword: "filter_group_stay_type", id: "this-filter-travel-group" },
    { keyword: "filter_group_tdb", id: "this-filter-bed-preference" },
    { keyword: "filter_group_fc", id: "this-filter-reservation-policy" },
    { keyword: "filter_group_pmt", id: "this-filter-online-payment" },
    { keyword: "filter_group_chaincode", id: "this-filter-brands" },
    { keyword: "filter_group_accessible_facilities", id: "this-filter-property-accessibility" },
    { keyword: "filter_group_accessible_room_facilities", id: "this-filter-room-Accessibility" }
];

function markFiltersBookingCom(filterSidebar) {
    FILTER_MARKS_BOOKING_COM.forEach(({ keyword, id }) => {
        const div = filterSidebar.querySelector(`div[id*="${keyword}"]`);
        if (div) {
            div.parentElement.id = id;
        } else {
            console.log(`${id} not found`);
        }
    });
}

function uncheckAllFiltersBookingCom() {
    FILTER_MARKS_BOOKING_COM.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (!section) {
            console.log(`Section not found: ${id}`);
            return;
        }

        const checkboxes = section.querySelectorAll('input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
            checkbox.click(); // Simulate unchecking
        });
    });
}


function showAllPropertyBrandsBookingCom() {
    const brandsFilter = document.getElementById("this-filter-brands");
    if (!brandsFilter) {
        return;
    }
    const brandsShowAllButton = brandsFilter.querySelector('button[aria-controls*="filter_group_chaincode"]');

    if (brandsShowAllButton) {
        if (!brandsShowAllButton.innerText.trim().includes("Show less")) {
            brandsShowAllButton.click();
        }
    } else {
        console.log("brandsShowAllButton is not found");
    }
}

function showAllPropertyAmenitiesBookingCom() {
    
    const amenitiesFilter = document.getElementById("this-filter-amenities");
    if (!amenitiesFilter) {
        return;
    }

    const propertyAmenitiesShowAllButton = amenitiesFilter.querySelector('button[aria-controls*="filter_group_hotelfacility"]');

    if (propertyAmenitiesShowAllButton) {
        if (!propertyAmenitiesShowAllButton.innerText.trim().includes("Show less")) {
            propertyAmenitiesShowAllButton.click();
        }
    } else {
        console.log("propertyAmenitiesShowAllButton is not found");
    }
}


function showAllRoomAmenitiesBookingCom() {
    
    const roomAmenitiesFilter = document.getElementById("this-filter-room-amenities");

    if (!roomAmenitiesFilter) {
        return;
    }

    const roomAmenitiesShowAllButton = roomAmenitiesFilter.querySelector('button[aria-controls*="filter_group_roomfacility"]');

    if (roomAmenitiesShowAllButton) {
        if (!roomAmenitiesShowAllButton.innerText.trim().includes("Show less")) {
            roomAmenitiesShowAllButton.click();
        }
    } else {
        console.log("roomAmenitiesShowAllButton is not found");
    }
}