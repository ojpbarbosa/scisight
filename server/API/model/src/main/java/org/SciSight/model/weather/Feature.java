package org.SciSight.model.weather;

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
public class Feature {
    private Properties properties;
}
