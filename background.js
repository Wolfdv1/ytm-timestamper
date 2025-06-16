browser.action.onClicked.addListener((tab) => {
    browser.tabs.sendMessage(tab.id, { action: "requestTimestamp" });
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "requestTimestamp") {
        browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            browser.tabs.sendMessage(tabs[0].id, { action: "getTimestamp" });
        });
    }
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.formattedTime && request.link) {
        browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            browser.tabs.sendMessage(tabs[0].id, { formattedTime: request.formattedTime, link: request.link });
        });
    }
});

