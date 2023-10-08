package org.SciSight.utils;

import lombok.RequiredArgsConstructor;
import org.SciSight.model.DataItem;
import org.SciSight.model.Weather;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class Wrapper {

    public Optional<DataItem> convert(Weather weatherObject) {
        return Optional.ofNullable(DataItem.builder().weather(weatherObject).build());
    }
}
