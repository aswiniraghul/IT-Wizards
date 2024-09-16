package org.LaunchCode.IT_Wizards_API.services;

import org.LaunchCode.IT_Wizards_API.models.Image;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface ImageService {
    public Image create(Image image);
    public List<Image> viewAll();
    public Image viewById(long id);
}
