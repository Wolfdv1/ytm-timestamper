document.addEventListener('DOMContentLoaded', () => {
    browser.runtime.sendMessage({ action: "requestTimestamp" });
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const timestampLink = document.getElementById('timestamp-link');
    const copyIcon = document.getElementById('copy-icon');

    if (request.formattedTime && request.link) {
        timestampLink.textContent = `${request.formattedTime}`;
        timestampLink.href = request.link;
        timestampLink.target = "_blank";

        copyIcon.onclick = () => {
            navigator.clipboard.writeText(request.link).then(() => {
                alert('Link copied to clipboard!');
            });
        };
    } else if (request.error) {
        timestampElement.textContent = request.error;
        timestampLink.textContent = '';
    }
});

