package org.SciSight.config;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@ConfigurationProperties(prefix = "spring.application")
public class SpringConfig {
    private String name;

  public void setName(String name) {
        this.name = name;
    }
}
