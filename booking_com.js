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
                //applyFiltersInHotelsCom(smartFilters);
            }, 2000);

        } else {
            console.warn("No smart filters found in storage.");
        }
    });
}