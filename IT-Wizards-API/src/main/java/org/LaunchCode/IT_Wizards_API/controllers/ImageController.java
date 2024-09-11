package org.LaunchCode.IT_Wizards_API.controllers;


import jakarta.servlet.http.HttpServletRequest;
import org.LaunchCode.IT_Wizards_API.models.Image;
import org.LaunchCode.IT_Wizards_API.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialException;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("images")
public class ImageController {
    @Autowired
    private ImageService imageService;

    // display image
    @GetMapping("/display")
    public ResponseEntity<byte[]> displayImage(@RequestParam("id") long id) throws IOException, SQLException
    {
        Image image = imageService.viewById(id);
        byte [] imageBytes = null;
        imageBytes = image.getImage().getBytes(1,(int) image.getImage().length());
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
    }

@GetMapping("/imageList")
public ArrayList<Long> imageList() {
     List<Image> imageList;
     imageList = imageService.viewAll();
    ArrayList<Long> imageIdList = new ArrayList<>();
    for (int i = 0; i < imageList.size(); i++){
         imageIdList.add(imageList.get(i).getId());
     }
    return imageIdList;
}

    // add image - post
//    @PostMapping("/add")
//    public String addImagePost(HttpServletRequest request,@RequestParam("image") MultipartFile file) throws IOException, SerialException, SQLException
//    {
//        byte[] bytes = file.getBytes();
//        Blob blob = new javax.sql.rowset.serial.SerialBlob(bytes);
//
//        Image image = new Image();
//        image.setImage(blob);
//        imageService.create(image);
//        return "redirect:/";
//    }
}