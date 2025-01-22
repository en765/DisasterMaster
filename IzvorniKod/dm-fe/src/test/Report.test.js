const { Builder, By, until } = require('selenium-webdriver');
const assert = require('chai').assert;
require('geckodriver');

(async function testLeafletMap() {
    let driver = await new Builder().forBrowser('firefox').build();

    // Define disaster types and corresponding European locations
    const disasters = [
        { type: '🌍 Earthquake', locations: ['Lisbon', 'Rome', 'Athens'] },
        { type: '🔥 Fire', locations: ['Barcelona', 'Naples', 'Paris'] },
        { type: '🌊 Flood', locations: ['Amsterdam', 'Berlin', 'Paris'] },
        { type: '🌩️ Storm', locations: ['London', 'Dublin', 'Brussels'] }
    ];

    try {
        await driver.manage().window().maximize();
        console.log('Browser window maximized to full screen.');

        // Load the webpage where your React app is running
        await driver.get('http://localhost:3000');  // Adjust with your local URL or deploy URL

        // Wait for the map container to be present
        const mapDisplayed = await driver.wait(until.elementLocated(By.id('homepage-map')), 10000);
        console.log('Map is displayed:', mapDisplayed != null);

        // Loop through each disaster and its corresponding locations
        for (let disaster of disasters) {
            for (let location of disaster.locations) {
                // 1. Click the "AddWeatherReports" Button
                const addWeatherReportsButton = await driver.wait(until.elementLocated(By.css('.add-report-button')), 10000);
                await addWeatherReportsButton.click();  // Click to open the weather report options
                console.log(`AddWeatherReports button clicked, list of reports shown for ${disaster.type} at ${location}.`);

                // 2. Select the Disaster (e.g., Earthquake)
                const disasterIcon = await driver.wait(until.elementLocated(By.xpath(`//li[text()='${disaster.type}']`)), 10000);
                await disasterIcon.click();  // Click on the selected disaster
                console.log(`${disaster.type} icon selected.`);

                // 3. Wait for the Report Form to load
                const mainContent = await driver.wait(until.elementLocated(By.className('main-content')), 10000);
                const weatherReportForm = await mainContent.findElement(By.className('weather-report-form'));
                console.log('Weather report form loaded for ' + disaster.type);

                // 4. Find the form-content div inside the report form, and then the <form> element inside it
                const formContent = await weatherReportForm.findElement(By.className('form-content'));
                const form = await formContent.findElement(By.tagName('form'));
                console.log('Form element located inside form-content.');

                // 5. Find the Search Bar (input element with placeholder "Enter location")
                const searchInput = await form.findElement(By.xpath(".//input[@placeholder='Enter location']"));
                await searchInput.clear();  // Clear the input field
                await searchInput.sendKeys(location);  // Type the location into the search bar
                console.log(`Location entered in search bar: ${location}`);

                // 6. Click the search button inside the form
                const searchButton = await form.findElement(By.xpath(".//button[text()='Search']"));
                
                // Ensure the search button is visible and clickable
                await driver.executeScript("arguments[0].scrollIntoView();", searchButton);
                await searchButton.click();
                console.log('Search button clicked, location set to ' + location + '.');

                // Wait for location to be validated (additional delay, if needed)
                await driver.sleep(2000);  // Wait to ensure the location has been correctly selected

                // 7. Fill out the rest of the form (e.g., description)
                await form.findElement(By.xpath(".//textarea[@placeholder='Describe the situation']")).sendKeys(`Severe ${disaster.type.toLowerCase()} in ${location}`);
                console.log(`Description added to the form for ${disaster.type} in ${location}.`);

                // 8. Submit the Report Form
                await form.findElement(By.xpath(".//button[text()='Submit']")).click();
                console.log(`Report form submitted for ${disaster.type} in ${location}.`);

                // Wait for a few seconds before moving to the next disaster/location pair
                await driver.sleep(3000);
            }
        }

    } catch (error) {
        console.log('Test failed due to error: ' + error);
        assert.fail('Test failed due to error: ' + error);
    } finally {
        await driver.quit();
    }
})();
