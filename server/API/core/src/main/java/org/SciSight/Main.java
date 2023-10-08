package org.SciSight;

import org.SciSight.config.SpringConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({SpringConfig.class})
public class Main {
    public static void main(String[] args) {
        try {
            SpringApplication.run(Main.class, args);
        } catch (Throwable t) {
            t.printStackTrace();
            throw t;
        }
    }
}