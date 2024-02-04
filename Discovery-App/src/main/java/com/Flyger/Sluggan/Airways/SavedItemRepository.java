package com.Flyger.Sluggan.Airways;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SavedItemRepository extends CrudRepository<SavedItem, Long> {
    
}
