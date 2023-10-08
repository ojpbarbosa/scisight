package org.SciSight.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.SciSight.client.WeatherClient;
import org.SciSight.model.DataItem;
import org.SciSight.model.Weather;
import org.SciSight.utils.Wrapper;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataItemService {
    private final WeatherClient weatherClient;
    private final Wrapper wrapper;

    public Optional<DataItem> getByField(String field){
        Optional<Weather> weatherObj = weatherClient.getWeatherAlert(field);
        if (weatherObj.isEmpty()) Optional.empty();
        return wrapper.convert(weatherObj.get());
    }

}
