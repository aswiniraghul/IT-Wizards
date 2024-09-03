package org.LaunchCode.IT_Wizards_API.controllers;


import org.LaunchCode.IT_Wizards_API.models.Image;
import org.LaunchCode.IT_Wizards_API.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import javax.sql.rowset.serial.SerialException;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("images")
public class ClientController {
    @Autowired
    private ImageService imageService;

    @GetMapping("/ping")
    @ResponseBody
    public String hello_world(){
        return "Hello World!";
    }

    // display image
    @GetMapping("/display")
    public ResponseEntity<byte[]> displayImage(@RequestParam("id") long id) throws IOException, SQLException
    {
        Image image = imageService.viewById(id);
        byte [] imageBytes = null;
        imageBytes = image.getImage().getBytes(1,(int) image.getImage().length());
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
    }


//    // view All images
//    @GetMapping("/viewAll")
//    public List<Image> allImages(){
////        ModelAndView mv = new ModelAndView("index");
//        //        mv.addObject("imageList", imageList);
//        return imageService.viewAll();
//    }
//
@GetMapping("/viewAll")
public ResponseEntity<ArrayList<byte[]>> displayAllImages() throws SQLException {
    List<Image> allImages = imageService.viewAll();
    byte [] imageBytes = null;
//    byte [] [] allImageBytes = null;
    ArrayList<byte []> allImageBytes = new ArrayList<>();
    for (int i = 0; i < allImages.size(); i++) {
        imageBytes = allImages.get(i).getImage().getBytes(1, (int) allImages.get(i).getImage().length());
        allImageBytes.add(imageBytes);
    }
    return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(allImageBytes);
}



//    // add image - get
//    @GetMapping("/add")
//    public ModelAndView addImage(){
//        return new ModelAndView("addimage");
//    }

    // add image - post
    @PostMapping("/add")
    public String addImagePost(HttpServletRequest request,@RequestParam("image") MultipartFile file) throws IOException, SerialException, SQLException
    {
        byte[] bytes = file.getBytes();
        Blob blob = new javax.sql.rowset.serial.SerialBlob(bytes);

        Image image = new Image();
        image.setImage(blob);
        imageService.create(image);
        return "redirect:/";
    }
}