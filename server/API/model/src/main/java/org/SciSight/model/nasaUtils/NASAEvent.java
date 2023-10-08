package org.SciSight.model.nasaUtils;

import lombok.Data;

import java.util.List;

@Data
public class NASAEvent {
  private String id;
  private String title;
  private List<Geometry> geometries;
}
