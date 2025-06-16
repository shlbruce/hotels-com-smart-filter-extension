function markFilterSideBar(filterHeadingRect) {
    const filtersDivs = document.querySelectorAll('div[aria-label="Filters"]');
    filtersDivs.forEach((div, index) => {
        const rect = div.getBoundingClientRect();
        if (doesRectCover(rect, filterHeadingRect)) {
            div.id = "this-filter-sidebar";

            markFilters(div);
            return;
        }
    });
}

const FILTER_MARKS = [
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
  
  function markFilters(filterSidebar) {
    FILTER_MARKS.forEach(({ keyword, id }) => {
      const div = filterSidebar.querySelector(`div[id*="${keyword}"]`);
      if (div) {
        div.id = id;
      } else {
        console.log(`${id} not found`);
      }
    });
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