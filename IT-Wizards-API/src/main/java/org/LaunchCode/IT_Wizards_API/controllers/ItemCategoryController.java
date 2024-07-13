package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.data.ItemCategoryRepository;
import org.LaunchCode.IT_Wizards_API.models.ItemCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ItemCategoryController {
    @Autowired
    private ItemCategoryRepository itemCategoryRepository;

    @PostMapping("/itemCategory")
    public ItemCategory createItem(@RequestBody ItemCategory newItemCategory){
        return itemCategoryRepository.save(newItemCategory);
    }

    @GetMapping("/itemCategory")
    public Iterable<ItemCategory> getItemCategories(){
        return itemCategoryRepository.findAll();
    }

}