package org.LaunchCode.IT_Wizards_API.controllers;

import org.LaunchCode.IT_Wizards_API.exceptions.DuplicateItemException;
import org.LaunchCode.IT_Wizards_API.exceptions.ItemCategoryNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Image;
import org.LaunchCode.IT_Wizards_API.repository.ItemCategoryRepository;
import org.LaunchCode.IT_Wizards_API.repository.ItemRepository;
import org.LaunchCode.IT_Wizards_API.exceptions.ItemNotFoundException;
import org.LaunchCode.IT_Wizards_API.models.Item;
import org.LaunchCode.IT_Wizards_API.models.ItemCategory;
import org.LaunchCode.IT_Wizards_API.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("items")
//@CrossOrigin("http://localhost8080")
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private ItemCategoryRepository itemCategoryRepository;

    @Autowired
    private ImageService imageService;

    @PostMapping()
    public Item createItem(@RequestBody Item newItem) {
        Optional<Item> checkItem = itemRepository.findByName(newItem.getName());
        if (checkItem.isPresent()) {
            throw new DuplicateItemException(newItem.getName());
        } else {
            Optional<ItemCategory> checkCategory = itemCategoryRepository.findByName(newItem.getItemCategory().getName());
            if (checkCategory.isPresent()) {
                newItem.setItemCategory(checkCategory.get());
            } else {
                throw new ItemCategoryNotFoundException(newItem.getItemCategory().getName());
            }
        }
        return itemRepository.save(newItem);
    }

    @PostMapping("/add")
    public Item createItemWithImage(@RequestParam String name, MultipartFile imageFile, String description,
                                    String itemCategory, Double price, Double currentInventory) throws IOException, SQLException {
        ItemCategory newItemCategory = new ItemCategory(itemCategory);
        Item newItem = new Item(name, description, newItemCategory, price, currentInventory);
        Optional<Item> checkItem = itemRepository.findByName(newItem.getName());
        if (checkItem.isPresent()) {
            throw new DuplicateItemException(newItem.getName());
        } else {
            Optional<ItemCategory> checkCategory = itemCategoryRepository.findByName(newItem.getItemCategory().getName());
            if (checkCategory.isPresent()) {
                newItem.setItemCategory(checkCategory.get());
            } else {
                throw new ItemCategoryNotFoundException(newItem.getItemCategory().getName());
            }
        }
        byte[] bytes = imageFile.getBytes();
        Blob blob = new javax.sql.rowset.serial.SerialBlob(bytes);
        Image initImage = new Image();
        initImage.setImage(blob);
        Image newImage = imageService.create(initImage);
        newItem.setImageID(newImage.getId());
        return itemRepository.save(newItem);
    }

    @GetMapping()
    public Iterable<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @GetMapping("/{id}")
    public Item getItemByID(@PathVariable Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));
    }

    @GetMapping("/editItem/{id}")
    public Item getItemToEdit(@PathVariable Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new ItemNotFoundException(id));
    }

    @PutMapping("/editItem/{id}")
    Item editItem(@RequestBody Item editedItem, @PathVariable Long id) {
        Optional<ItemCategory> checkCategory = itemCategoryRepository.findByName(editedItem.getItemCategory().getName());
        if (checkCategory.isPresent()) {
            editedItem.setItemCategory(checkCategory.get());
        }
        return itemRepository.findById(id)
                .map(item -> {
                    item.setName(editedItem.getName());
                    item.setDescription(editedItem.getDescription());
                    item.setItemCategory(editedItem.getItemCategory());
                    item.setPrice(editedItem.getPrice());
                    item.setCurrentInventory(editedItem.getCurrentInventory());
                    item.setImageID(editedItem.getImageID());
                    return itemRepository.save(item);
                }).orElseThrow(() -> new ItemNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    String deleteItem(@PathVariable Long id) {
        if (!itemRepository.existsById(id)) {
            throw new ItemNotFoundException(id);
        }
        itemRepository.deleteById(id);
        return "Item with id " + id + " has been successfully deleted.";
    }

}
