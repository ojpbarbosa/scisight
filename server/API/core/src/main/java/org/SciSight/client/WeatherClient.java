package org.SciSight.client;

import com.fasterxml.jackson.databind.DeserializationFeature;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.SciSight.model.Weather;
import org.apache.http.client.utils.URIBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Optional;


@Component
@Slf4j
@RequiredArgsConstructor
public class WeatherClient {
    private static HttpClient httpClient = HttpClient.newHttpClient();
    private static ObjectMapper objectMapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    @Value("${api.weather.token}")
    private String authToken;
    @Value("${api.weather.url}")
    private String baseUrl;

    public Optional<Weather> getWeatherAlert(final String state) {
        try {
            URI uri = new URIBuilder()
                    .setScheme("https")
                    .setHost(baseUrl)
                    .setPath("/alerts/active")
                    .setParameter("area", state)
                    .build();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(uri)
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            Weather weather = objectMapper.readValue(response.body(), Weather.class);
            return Optional.of(weather);
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }
}
