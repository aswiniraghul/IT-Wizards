package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.data.ItemCategoryRepository;
import org.LaunchCode.IT_Wizards_API.data.ItemRepository;
import org.LaunchCode.IT_Wizards_API.models.Item;
import org.LaunchCode.IT_Wizards_API.models.ItemCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemCategoryRepository itemCategoryRepository;

    @PostMapping("/items")
    public Item createItem(@RequestBody Item newItem){
        Optional<ItemCategory> checkCategory = itemCategoryRepository.findByName(newItem.getItemCategory().getName());
        if (checkCategory.isPresent()){
            newItem.setItemCategory(checkCategory.get());
        }
        return itemRepository.save(newItem);
    }

    @GetMapping("/items")
    public Iterable<Item> getItems(){
        return itemRepository.findAll();
    }

}
