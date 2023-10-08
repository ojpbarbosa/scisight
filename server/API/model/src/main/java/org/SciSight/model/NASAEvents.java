package org.SciSight.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.With;
import org.SciSight.model.nasaUtils.NASAEvent;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@With
public class NASAEvents {
    private String title;
    private String description;
    private String link;
    private List<NASAEvent> events;
}
