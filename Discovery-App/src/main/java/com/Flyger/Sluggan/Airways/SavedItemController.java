package com.Flyger.Sluggan.Airways;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SavedItemController {

    @GetMapping()
    public String getIndex( ) {
        return "index";
    }

}
