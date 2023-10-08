package org.SciSight.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RequestModel {
    @JsonProperty("api")
    private String api;

    @JsonProperty("context")
    private String context;

    @JsonProperty("field")
    private String field;

    @JsonProperty("input")
    private String input;
}
