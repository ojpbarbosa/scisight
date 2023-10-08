package org.SciSight.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.SciSight.model.NASAEvents;
import org.apache.http.client.utils.URIBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

@Component
@Slf4j
@RequiredArgsConstructor
public class NASAClient extends CustomHttpClient {
    private static HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper;
    @Value("${api.nasa.token}")
    private String authToken;
    @Value("${api.nasa.url}")
    private String baseUrl;

    @Override
    public Optional<NASAEvents> get() {
        try {
          URI uri = new URIBuilder()
            .setScheme("https")
            .setHost(baseUrl)
            .setPath("/api/v2.1/events")
            .addParameter("limit", "10")
            .addParameter("days", "30")
            .addParameter("status", "open")
            .build();

          HttpRequest request = HttpRequest.newBuilder()
            .uri(uri)
            .build();

          HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
          NASAEvents nasaEvents = objectMapper.readValue(response.body(), NASAEvents.class);
          return Optional.of(nasaEvents);
        } catch (Exception e) {
          e.printStackTrace();
          return Optional.empty();
        }
    }
}
