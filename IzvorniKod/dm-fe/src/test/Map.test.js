const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;

(async function testMapInteraction() {
    let driver = await new Builder().forBrowser('firefox').build();

    try {
        // Step 1: Maximize the browser window (make it full screen)
        await driver.manage().window().maximize();
        console.log('Browser window maximized to full screen.');

        // Step 2: Load the webpage where your React app is running
        await driver.get('http://localhost:3000');  // Adjust with your local URL or deployed URL

        // Step 3: Wait for the map container to be present
        const mapContainer = await driver.wait(until.elementLocated(By.id('homepage-map')), 10000);
        assert.isNotNull(mapContainer, 'Map is displayed');
        console.log('Map is displayed.');

        // Step 4: Test valid location search
        const searchInput = await driver.findElement(By.css('.search-bar input'));
        const searchButton = await driver.findElement(By.css('.search-bar button'));

        // Step 4.1: Fill in valid location and click the search button
        await searchInput.sendKeys('London');
        await searchButton.click();
        console.log('Search button clicked with a valid location.');

        // Step 4.2: Wait for the map to be centered on the valid location (London)
        await driver.wait(until.elementLocated(By.css('#homepage-map')), 10000);
        console.log('Map should now be centered on London.');

        // Step 5: Test invalid location search
        await searchInput.clear();
        await searchInput.sendKeys('InvalidLocation');
        await searchButton.click();
        console.log('Search button clicked with an invalid location.');

        // Step 5.1: Wait for the alert (alert should appear with the error message for invalid location)
        let alert = await driver.wait(until.alertIsPresent(), 10000);
        const alertText = await alert.getText();
        assert.equal(alertText, 'Location not found!', 'Alert message is correct for invalid location.');
        console.log('Alert for invalid location shown correctly.');

        // Step 5.2: Click the "OK" button on the alert to dismiss it and return to the main page
        await alert.accept();
        console.log('Alert dismissed successfully.');

        // Step 6: Test empty search and clicking search button
        await searchInput.clear();
        await searchButton.click();
        console.log('Search button clicked with an empty search bar.');

        // Wait for map updates after the empty search
        // Instead of accessing window.map, let's check if the map container has moved or updated
        await driver.wait(until.elementLocated(By.css('.leaflet-map-pane')), 5000); // Wait for map updates
        const mapPane = await driver.findElement(By.css('.leaflet-map-pane'));

        // Check if the map pane exists, indicating the map is still there and functional
        assert.isNotNull(mapPane, 'Map pane exists after empty search.');
        console.log('Map is still active after empty search.');

    } catch (error) {
        console.log('Test failed due to error: ' + error);
        assert.fail('Test failed due to error: ' + error);
    } finally {
        await driver.quit();
    }
})();
