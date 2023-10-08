package org.SciSight.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.SciSight.model.DataItem;
import org.SciSight.service.DataItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import static io.micrometer.core.instrument.Metrics.counter;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/search")
public class SearchController {

    private final DataItemService dataItemService;

    @RequestMapping(method = RequestMethod.GET, value = "/{field}", produces = "application/json")
    public ResponseEntity<DataItem> get(@PathVariable("field") final String field) {
        counter("search.api.get").increment();
        var dataItem = dataItemService.getByField(field).orElse(null);
        if (dataItem == null) {
            return ResponseEntity.notFound().header("reason", "error").build();
        } else {
            return ResponseEntity.ok().body(dataItem);
        }
    }

}
