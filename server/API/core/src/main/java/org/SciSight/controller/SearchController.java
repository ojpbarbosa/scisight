package org.SciSight.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.SciSight.model.DataItem;
import org.SciSight.service.DataItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import static io.micrometer.core.instrument.Metrics.counter;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
public class SearchController {

    private final DataItemService dataItemService;

    @GetMapping("/{fieldOfStudy}")
    public ResponseEntity<DataItem> get(@PathVariable("fieldOfStudy") final String field) {
        counter("search.api.get").increment();
        log.info("Accessing /search with field: " + field);
        var dataItem = dataItemService.getByField(field).orElse(null);
        if (dataItem == null) {
            return ResponseEntity.notFound().header("reason", "error").build();
        } else {
            return ResponseEntity.ok().body(dataItem);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        log.info("Test endpoint accessed");
        return ResponseEntity.ok("Test successful");
    }

}
