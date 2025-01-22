package dm_be;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

public class SeleniumTest {
    public static void main(String[] args) {
        // Setup WebDriver for Firefox using WebDriverManager
        WebDriverManager.firefoxdriver().setup();
        
        // Initialize the Firefox WebDriver
        WebDriver driver = new FirefoxDriver();
        
        // Navigate to the React app (make sure your React app is running at this URL)
        driver.get("https://disastermaster.onrender.com");  // Change this to the actual URL of your React app

        // Perform your tests here
        System.out.println("Title of the page is: " + driver.getTitle());
        
        // Close the browser
        driver.quit();
    }
}
