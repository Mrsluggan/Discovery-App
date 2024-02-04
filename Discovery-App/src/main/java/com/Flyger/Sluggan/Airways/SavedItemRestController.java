package com.Flyger.Sluggan.Airways;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SavedItemRestController {

    @Autowired
    private SavedItemRepository savedItemRepository;
    @Autowired
    private RemoveItemRepository removeItemRepository;

    @GetMapping("/getAllItems")
    public Iterable<SavedItem> getAllSavedItems() {
        return savedItemRepository.findAll();
    }

    @PostMapping("/saveItem")
    public SavedItem saveNewItem(@RequestBody SavedItem savedItem) {
        System.out.println("bajs");
        return savedItemRepository.save(savedItem);

    }

    @GetMapping("/allRemovedItems")
    public Iterable<RemovedItem> getAllRemovedItems() {
        return removeItemRepository.findAll();
    }


    @DeleteMapping("/removeItem/{id}")
    public ResponseEntity<?> deleteSavedItem(@PathVariable Long id, @RequestBody RemovedItem reviewData) {
        Optional<SavedItem> savedItemOptional = savedItemRepository.findById(id);

        if (savedItemOptional.isPresent()) {
            SavedItem savedItem = savedItemOptional.get();

            RemovedItem removedItem = new RemovedItem();
            removedItem.setId(savedItem.getId());
            removedItem.setName(savedItem.getName());
            removedItem.setReview(reviewData.getReview());
            removeItemRepository.save(removedItem);

            savedItemRepository.deleteById(id);

            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
