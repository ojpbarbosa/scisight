package org.SciSight.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DataItem {
    private String type;
    private Weather weather;
    private NASAEvents nasaEvents;
    private List<String> relatedScientificInfo;
    private List<RelatedAPI> bestAPIsOptions;
}
