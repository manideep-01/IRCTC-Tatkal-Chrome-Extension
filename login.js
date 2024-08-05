document.addEventListener("DOMContentLoaded", function() {
    const saveDataBtn = document.querySelector(".save-data");
    const loadDataBtn = document.querySelector(".load-data");
    const clearDataBtn = document.querySelector(".clear-data");
    const connectBtn = document.querySelector(".connect");

    saveDataBtn.addEventListener("click", function() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        console.log("Saving Data:", username, password);

        // Save data to local storage
        chrome.storage.local.set({ username: username, password: password }, function() {
            console.log("Data saved successfully!");
            alert("Data saved successfully!");
        });
    });

    loadDataBtn.addEventListener("click", function() {
        chrome.storage.local.get(["username", "password"], function(result) {
            console.log("Loading Data:", result.username, result.password);
            if (result.username !== undefined && result.password !== undefined) {
                document.getElementById("username").value = result.username || "";
                document.getElementById("password").value = result.password || "";
                alert("Data loaded successfully!");
            } else {
                alert("No data found. Please save data first.");
            }
        });
    });

    clearDataBtn.addEventListener("click", function() {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";

        // Clear data from local storage
        chrome.storage.local.remove(["username", "password"], function() {
            console.log("Data cleared successfully!");
            alert("Fields cleared successfully!");
        });
    });
    if (connectBtn) {
        connectBtn.addEventListener("click", function() {
            chrome.storage.local.get(["username", "password"], function(result) {
                if (result.username && result.password) {
                    // Open the IRCTC page
                    chrome.tabs.create({ url: "https://www.irctc.co.in/nget/train-search" }, function(tab) {
                        const tabId = tab.id;
                        chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo) {
                            if (updatedTabId === tabId && changeInfo.status === 'complete') {
                                // Click the login button
                                chrome.tabs.sendMessage(tabId, { action: "clickLoginButton" });

                                // Fill the credentials after the login form appears
                                chrome.tabs.onUpdated.addListener(function innerListener(innerTabId, innerChangeInfo) {
                                    if (innerTabId === tabId && innerChangeInfo.status === 'complete') {
                                        setTimeout(() => {
                                            chrome.tabs.sendMessage(tabId, {
                                                action: "fillCredentials",
                                                username: result.username,
                                                password: result.password
                                            });
                                        }, 1000);
                                        chrome.tabs.onUpdated.removeListener(innerListener);
                                    }
                                });

                                chrome.tabs.onUpdated.removeListener(listener);
                            }
                        });
                    });
                } else {
                    alert("No data found. Please save data first.");
                }
            });
        });
    } else {
        console.error("Connect button not found");
    }
});
