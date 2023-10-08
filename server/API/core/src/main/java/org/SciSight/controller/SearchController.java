package org.SciSight.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.SciSight.model.DataItem;
import org.SciSight.model.RequestModel;
import org.SciSight.service.DataItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static io.micrometer.core.instrument.Metrics.counter;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
public class SearchController {

    private final DataItemService dataItemService;

    @CrossOrigin
    @PostMapping("/{fieldOfStudy}")
    public ResponseEntity<DataItem> get(@PathVariable("fieldOfStudy") final String field,
                                        @RequestBody RequestModel requestModel) {
        counter("search.api.get").increment();
        var dataItem = dataItemService.getByField(field, requestModel).orElse(null);
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
