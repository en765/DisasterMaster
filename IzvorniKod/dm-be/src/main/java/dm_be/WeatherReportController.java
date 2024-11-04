
// WeatherReportController.java
package dm_be; // Change this if needed to match your structure

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather-reports")
public class WeatherReportController {

    @PostMapping
    public ResponseEntity<String> createWeatherReport(@RequestBody WeatherReport report) {
        // Log the received report
        System.out.println("Received Location: " + report.getLocation());
        System.out.println("Received Description: " + report.getDescription());

        // Return a successful response
        return ResponseEntity.ok("Weather report submitted successfully!");
    }
}
