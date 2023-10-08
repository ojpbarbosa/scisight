package org.SciSight.model.nasaUtils;

import lombok.Data;
import java.util.List;

@Data
public class Geometry {
  private String date;
  private String type;
  private List<String> coordinates;
}
