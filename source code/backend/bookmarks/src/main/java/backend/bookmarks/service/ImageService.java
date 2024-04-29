package backend.bookmarks.service;

import backend.bookmarks.entity.Image;
import backend.bookmarks.repository.ImageRepository;
import backend.bookmarks.util.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public Image uploadImage(MultipartFile image) throws IOException {
        Image savedImage = imageRepository.save(Image.builder()
                .name(image.getOriginalFilename())
                .type(image.getContentType())
                .data(ImageUtils.compressImage(image.getBytes())).build());
        return savedImage;
    }

    public Optional<Image> getImageById(Long imageId) {
        Optional<Image> optionalImage = imageRepository.findById(imageId);
        if (optionalImage.isEmpty()) return Optional.empty();

        optionalImage.get().setData(ImageUtils.decompressImage(optionalImage.get().getData()));

        return optionalImage;
    }

}
