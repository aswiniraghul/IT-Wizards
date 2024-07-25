package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.repository.ItemCategoryRepository;
import org.LaunchCode.IT_Wizards_API.repository.ItemRepository;
import org.LaunchCode.IT_Wizards_API.exceptions.ItemNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Item;
import org.LaunchCode.IT_Wizards_API.models.ItemCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("items")
//@CrossOrigin("http://localhost8080")
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemCategoryRepository itemCategoryRepository;

    @PostMapping()
    public Item createItem(@RequestBody Item newItem){
        Optional<ItemCategory> checkCategory = itemCategoryRepository.findByName(newItem.getItemCategory().getName());
        if (checkCategory.isPresent()){
            newItem.setItemCategory(checkCategory.get());
        }
        return itemRepository.save(newItem);
    }

    @GetMapping()
    public Iterable<Item> getAllItems(){
        return itemRepository.findAll();
    }

    @GetMapping("/{id}")
    public Item getItemByID(@PathVariable Long id){
        return itemRepository.findById(id)
                .orElseThrow(()->new ItemNotFoundException(id));
    }

    @GetMapping("/editItem/{id}")
    public Item getItemToEdit(@PathVariable Long id){
        return itemRepository.findById(id)
                .orElseThrow(()->new ItemNotFoundException(id));
    }
    @PutMapping("/editItem/{id}")
    Item editItem(@RequestBody Item editedItem, @PathVariable Long id){
        return itemRepository.findById(id)
                .map(item->{
                    item.setName(editedItem.getName());
                    item.setDescription(editedItem.getDescription());
                    item.setItemCategory(editedItem.getItemCategory());
                    item.setPrice(editedItem.getPrice());
                    item.setCurrentInventory(editedItem.getCurrentInventory());
                    return itemRepository.save(item);
        }).orElseThrow(()->new ItemNotFoundException(id));
    }
    @DeleteMapping("/{id}")
    String deleteItem(@PathVariable Long id){
        if(!itemRepository.existsById(id)){
            throw new ItemNotFoundException(id);
        }
        itemRepository.deleteById(id);
        return "Item with id " +id+ " has been successfully deleted.";
    }

}
