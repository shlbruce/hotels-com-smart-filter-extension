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