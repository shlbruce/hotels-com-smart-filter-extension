

function init() {
    const hostname = window.location.hostname;
    if (hostname === "www.hotels.com") {
        addSmartFilterButtonOnHotelsCom();
        return;
    }
    else if (hostname === "www.booking.com") {
        addSmartFilterButtonOnBookingCom();
        return;
    }
    
}

// Run initially and observe DOM changes
const observer = new MutationObserver(init);
observer.observe(document.body, { childList: true, subtree: true }); 