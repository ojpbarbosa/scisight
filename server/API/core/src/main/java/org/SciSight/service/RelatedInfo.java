package org.SciSight.service;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Consumer;

import lombok.extern.slf4j.Slf4j;
import org.SciSight.model.DataItem;
import org.SciSight.model.RequestModel;
import org.SciSight.utils.ProcessRelatedData;
import org.springframework.stereotype.Component;


@Component
@Slf4j
public class RelatedInfo {
    private final ProcessRelatedData processRelatedData;
    private final Map<String, Consumer<DataItem>> functionMap = new HashMap<>();

    public RelatedInfo(ProcessRelatedData processRelatedData) {
      this.processRelatedData = processRelatedData;
      functionMap.put("space-nasa", this::spaceFromSpace);
      functionMap.put("space-weather", this::spaceFromClimate);
      functionMap.put("space-health", this::spaceFromHealth);
      functionMap.put("climate-nasa", this::climateFromSpace);
      functionMap.put("climate-weather", this::climateFromClimate);
      functionMap.put("climate-health", this::climateFromHealth);
      functionMap.put("health-nasa", this::healthFromSpace);
      functionMap.put("health-weather", this::healthFromClimate);
      functionMap.put("health-health", this::healthFromHealth);
    }

    public void getRelatedScientificInfo(DataItem dataItem, RequestModel requestModel) {
      String field = requestModel.getField().toLowerCase();
      String api = requestModel.getApi().toLowerCase();

      String key = field + "-" + api;
      if (functionMap.containsKey(key)) {
          functionMap.get(key).accept(dataItem);
      } else {
          log.error("Invalid key, could not retrieve data about given information");
      }
    }

    public void spaceFromSpace(DataItem dataItem) {
      dataItem.setRelatedScientificInfo(processRelatedData.spaceFromSpace);
      dataItem.setBestAPIsOptions(processRelatedData.spaceAPI);
    }

    public void spaceFromClimate(DataItem dataItem) {
      dataItem.setRelatedScientificInfo(processRelatedData.spaceFromClimate);
      dataItem.setBestAPIsOptions(processRelatedData.spaceAPI);
    }

    public void spaceFromHealth(DataItem dataItem) {
      dataItem.setRelatedScientificInfo(processRelatedData.spaceFromHealth);
      dataItem.setBestAPIsOptions(processRelatedData.spaceAPI);
    }

    public void climateFromSpace(DataItem dataItem) {
      dataItem.setRelatedScientificInfo(processRelatedData.climateFromSpace);
      dataItem.setBestAPIsOptions(processRelatedData.climateAPI);
    }

    public void climateFromClimate(DataItem dataItem) {
      dataItem.setRelatedScientificInfo(processRelatedData.climateFromClimate);
      dataItem.setBestAPIsOptions(processRelatedData.climateAPI);
    }

    public void climateFromHealth(DataItem dataItem) {
      dataItem.setRelatedScientificInfo(processRelatedData.climateFromHealth);
      dataItem.setBestAPIsOptions(processRelatedData.climateAPI);
    }

    public void healthFromSpace(DataItem dataItem) {
      dataItem.setRelatedScientificInfo(processRelatedData.healthFromSpace);
      dataItem.setBestAPIsOptions(processRelatedData.healthAPI);
    }

    public void healthFromClimate(DataItem dataItem) {
      dataItem.setRelatedScientificInfo(processRelatedData.healthFromClimate);
      dataItem.setBestAPIsOptions(processRelatedData.healthAPI);
    }

    public void healthFromHealth(DataItem dataItem) {
      dataItem.setRelatedScientificInfo(processRelatedData.healthFromHealth);
      dataItem.setBestAPIsOptions(processRelatedData.healthAPI);
    }

}
