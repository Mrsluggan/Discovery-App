package com.Flyger.Sluggan.Airways;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SavedItemController {

    @Autowired
    private RemoveItemRepository removeItemRepository;

    @GetMapping()
    public String getIndex(Model model) {
        model.addAttribute("removedTodos", removeItemRepository.findAll());
        return "index";
    }

}
