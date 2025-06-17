function addSmartFilterButtonOnAgodaCom() {

    // Check if the button already exists
    if (document.getElementById("smart-filter-button")) {
        return;
    }

    // Find the heading with text "Filter by"
    let textSearch = document.querySelector('div[data-element-name="search-filter-text-search"]');
    if (!textSearch && !textSearch.parentElement) {
        return;
    }
    textSearch = textSearch.parentElement;

    const button = document.createElement("button");
    button.id = "smart-filter-button";
    button.textContent = "Apply your filters";
    button.style.margin = "6px 0px";
    button.style.padding = "6px 2px";
    button.style.fontSize = "12px";
    button.style.cursor = "pointer";
    button.style.borderRadius = "8px";
    button.style.border = "1px solid #ccc";
    button.style.color = "red";
    button.style.backgroundColor = "#f5f5f5";
    button.style.transition = "background-color 0.1s, transform 0.1s";

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
    button.addEventListener("click", handleSmartFilterClickOnHotelsCom);

    textSearch.insertAdjacentElement("afterend", button);

}