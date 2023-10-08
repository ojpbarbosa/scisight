package org.SciSight.model.weatherUtils;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.With;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@With
public class Properties {
    private String areaDesc;
    private String severity;
    private String urgency;
    private String event;
    private String headline;
    private String description;
    private String instruction;
}
