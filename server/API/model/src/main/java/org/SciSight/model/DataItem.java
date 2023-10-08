package org.SciSight.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DataItem {
    private Weather weather;
}
