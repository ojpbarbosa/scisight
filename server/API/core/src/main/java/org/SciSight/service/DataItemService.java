package org.SciSight.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.SciSight.client.CustomHttpClient;
import org.SciSight.client.NASAClient;
import org.SciSight.client.WeatherClient;
import org.SciSight.model.DataItem;
import org.SciSight.model.NASAEvents;
import org.SciSight.model.RequestModel;
import org.SciSight.model.Weather;
import org.SciSight.utils.Wrapper;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataItemService {
    private final WeatherClient weatherClient;
    private final NASAClient nasaClient;
    private final Wrapper wrapper;
    private final RelatedInfo relatedInfo;

    public Optional<DataItem> getByField(String field, RequestModel requestModel){
        Optional<DataItem> dataItem = checkStudyField(field);

        if(dataItem.isEmpty()) return dataItem;
        relatedInfo.getRelatedScientificInfo(dataItem.get(), requestModel);

        return dataItem;
    }

    private Optional<DataItem> checkStudyField(String field) {
        switch (field) {
            case "ecology", "health":

              break;
            case "nasa":
              return get(nasaClient, "nasa");
            case "weather":
              return get(weatherClient, "weather");
            default:
              log.error("Field {} is not recognized!", field);
        }
        return Optional.empty();
    }

    public Optional<DataItem> get(CustomHttpClient client, String type){
        Optional<?> object = client.get();
        if (object.isEmpty()) {
          return Optional.empty();
        }

        Object data = object.get();

        if (data.getClass() == Weather.class) {
            return wrapper.convert((Weather) data, type);
        } else if (data.getClass() == NASAEvents.class) {
            return wrapper.convert((NASAEvents) data, type);
        } else {
            return Optional.empty();
        }
    }

}
