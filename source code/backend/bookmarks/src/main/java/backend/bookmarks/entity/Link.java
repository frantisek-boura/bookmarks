package backend.bookmarks.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.envers.Audited;

import java.awt.*;

@Entity
@Table(name = "links")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Link {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String url;

    @OneToOne
    private Image image;

    @Lob
    private String description;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private boolean availableChrome;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private boolean availableFirefox;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    private boolean active;

}
