package backend.bookmarks.service;

import backend.bookmarks.dto.LinkDTO;
import backend.bookmarks.entity.Image;
import backend.bookmarks.entity.Link;
import backend.bookmarks.repository.LinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class LinkService {

    @Autowired
    private LinkRepository linkRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private RestTemplate linkTester;

    public Link uploadLink(LinkDTO linkDto) throws IOException {
        Image image = imageService.uploadImage(linkDto.getImage());

        return linkRepository.save(Link.builder()
                .name(linkDto.getName())
                .url(linkDto.getUrl())
                .image(image)
                .description(linkDto.getDescription())
                .availableFirefox(testLinkFirefox(linkDto.getUrl()))
                .availableChrome(testLinkChrome(linkDto.getUrl()))
                .active(testLinkActive(linkDto.getUrl()))
                .build());
    }

    public Optional<Link> updateLink(LinkDTO linkDto) throws IOException {
        Optional<Link> optionalLink = linkRepository.findById(linkDto.getId());
        if (optionalLink.isEmpty()) return Optional.empty();

        Link link = optionalLink.get();

        link.setName(linkDto.getName());
        link.setUrl(linkDto.getUrl());
        link.setDescription(linkDto.getDescription());
        if (linkDto.getImage() != null && !link.getImage().getName().equals(linkDto.getImage().getOriginalFilename())) {
            Image updatedImage = imageService.uploadImage(linkDto.getImage());
            link.setImage(updatedImage);
        }

        return Optional.of(linkRepository.save(link));
    }

    public void deleteLink(Long linkId) {
        linkRepository.deleteById(linkId);
    }

    public List<Link> getLinks() {
        return linkRepository.findAll();
    }

    public void purgeLinks() {
        linkRepository.deleteAll();
    }


    private boolean testLinkChrome(String url) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");

        try {
            ResponseEntity<String> response = linkTester.getForEntity(url, String.class);
            int statusCode = response.getStatusCode().value();
            return statusCode == 200;
        } catch (Exception e) {
            return false;
        }
    }

    private boolean testLinkFirefox(String url) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0");

        try {
            ResponseEntity<String> response = linkTester.getForEntity(url, String.class);
            int statusCode = response.getStatusCode().value();
            return statusCode == 200;
        } catch (Exception e) {
            return false;
        }
    }

    private boolean testLinkActive(String url) {
        try {
            ResponseEntity<String> response = linkTester.getForEntity(url, String.class);
            int statusCode = response.getStatusCode().value();
            return statusCode < 300;
        } catch (Exception e) {
            return false;
        }
    }

}
