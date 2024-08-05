console.log("Content script running");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "clickLoginButton") {
        console.log("Received clickLoginButton message:", request);

        // Find and click the login button
        const loginButton = document.querySelector('.a[aria-label="Click here to Login in application"]');
        if (loginButton) {
            console.log("Clicking login button");
            loginButton.click();
        } else {
            console.error("Login button not found");
        }
    } else if (request.action === "fillCredentials") {
        console.log("Received fillCredentials message:", request);

        // Select the fields using their `formcontrolname` attributes
        const usernameField = document.querySelector('input[formcontrolname="userid"]');
        const passwordField = document.querySelector('input[formcontrolname="password"]');

        if (usernameField && passwordField) {
            console.log("Filling credentials");
            usernameField.value = request.username;
            passwordField.value = request.password;

            // Trigger input events to ensure the fields are updated
            usernameField.dispatchEvent(new Event('input', { bubbles: true }));
            passwordField.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            console.error("Login fields not found");
        }
    }
});
