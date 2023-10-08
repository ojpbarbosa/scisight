package org.SciSight.utils;

import lombok.RequiredArgsConstructor;
import org.SciSight.model.DataItem;
import org.SciSight.model.NASAEvents;
import org.SciSight.model.Weather;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class Wrapper {
    public Optional<DataItem> convert(Weather weatherObject, String type) {
        return Optional.ofNullable(DataItem.builder().type(type).weather((Weather) weatherObject).build());
    }
    public Optional<DataItem> convert(NASAEvents nasaObject, String type) {
        return Optional.ofNullable(DataItem.builder().type(type).nasaEvents((NASAEvents) nasaObject).build());
    }

}
