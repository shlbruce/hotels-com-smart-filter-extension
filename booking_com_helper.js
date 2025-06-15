function markFilterSideBar(filterHeadingRect) {
    const filtersDivs = document.querySelectorAll('div[aria-label="Filters"]');
    filtersDivs.forEach((div, index) => {
        const rect = div.getBoundingClientRect();
        if (doesRectCover(rect, filterHeadingRect)) {
            div.id = "this-filter-sidebar";
            return;
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