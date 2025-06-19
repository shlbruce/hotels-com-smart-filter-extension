const FILTER_MARKS_AGODA = [
    
    { keyword: "filter-menu-AccomdType", id: "this-filter-property-type" },
    { keyword: "filter-menu-PaymentOptions", id: "this-filter-payment-options" },
    { keyword: "filter-menu-ReviewScores", id: "this-filter-guest-review-score" },
    { keyword: "filter-menu-StarRatingWithLuxury", id: "this-filter-property-rating" },
    { keyword: "filter-menu-RoomAmenities", id: "this-filter-room-amenities" },
    { keyword: "filter-menu-Facilities", id: "this-filter-property-amenities" },
    { keyword: "filter-menu-RoomOffers", id: "this-filter-room-offer" },
    { keyword: "filter-menu-GroupedBedTypes", id: "this-filter-bed-type" },
    { keyword: "filter-menu-LocationScore", id: "this-filter-location-score" },
    { keyword: "filter-menu-BrandsAndChains", id: "this-filter-property-brand" },
];

function markFiltersAgoda() {
    const filterSidebar = document.getElementById("searchPageLeftColumn");
    FILTER_MARKS_AGODA.forEach(({ keyword, id }) => {
        const legend = document.querySelector(`legend[id="${keyword}"]`);
        if (legend) {
            const fieldset = legend.parentElement;
            if (fieldset) {
                fieldset.id = id;
            }
        } else {
            console.log(`${id} not found`);
        }
    });
}

function uncheckAllFilters() {  
    const filterSidebar = document.getElementById("searchPageLeftColumn");
    const clearButtons = filterSidebar.querySelectorAll('span[label="CLEAR"]');
    clearButtons.forEach(clearButton => {
        clearButton.click();
    });
}

function clickShowAllAgoda() {
    let filterSection = document.getElementById("this-filter-property-amenities");
    if (!filterSection) return;

    filterSection = filterSection.parentElement;
    let button = filterSection.querySelector('button[aria-label*="more for Property facilities"]');
    if (button) {
        button.click();
    }

    filterSection = document.getElementById("this-filter-property-type");
    if (!filterSection) return;

    filterSection = filterSection.parentElement;
    button = filterSection.querySelector('button[aria-label*="more for Property type"]');
    if (button) {
        button.click();
    }
}
