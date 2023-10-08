package org.SciSight.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class RelatedAPI {
    private String api;
    private String reason;
}
