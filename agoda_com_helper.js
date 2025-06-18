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

function clickShowAllAgoda() {
    let filterPropertyAmenities = document.getElementById("this-filter-property-amenities");
    if (!filterPropertyAmenities) return;

    filterPropertyAmenities = filterPropertyAmenities.parentElement;
    const button = filterPropertyAmenities.querySelector('button[aria-label*="more for Property facilities"]');
    if (button) {
        button.click();
    }
}
