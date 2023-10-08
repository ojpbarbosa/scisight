package org.SciSight.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.With;
import org.SciSight.model.weather.Feature;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@With
public class Weather {
    private List<Feature> features;
    private String title;
    private String updated;
}
