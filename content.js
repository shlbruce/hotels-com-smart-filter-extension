function addSmartFilterButton() {

    // Check if the button already exists
    if (document.getElementById("smart-filter-button")) {
        return;
    }

    // Find the heading with text "Filter by"
    const headings = document.querySelectorAll('h3');
    const filterHeading = Array.from(headings).find(h => h.textContent.trim() === 'Filter by');


    if (!filterHeading) {
        return;
    }

    const button = document.createElement("button");
    button.id = "smart-filter-button";
  button.textContent = "Smart Filter";
  button.style.margin = "6px 0px";
  button.style.padding = "6px 1px";
  button.style.fontSize = "12px";
  button.style.cursor = "pointer";
  button.style.borderRadius = "8px";
  button.style.border = "1px solid #ccc";
  button.style.color = "red";
  button.style.backgroundColor = "#f5f5f5";


    // Add any custom click behavior
    button.addEventListener("click", () => {
        alert("Smart filter clicked!");
        // your smart filter logic here
    });

    filterHeading.insertAdjacentElement("afterend", button);
}

// Run initially and observe DOM changes
addSmartFilterButton();
const observer = new MutationObserver(addSmartFilterButton);
observer.observe(document.body, { childList: true, subtree: true }); 