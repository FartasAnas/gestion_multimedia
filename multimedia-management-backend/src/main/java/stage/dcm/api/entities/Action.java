package stage.dcm.api.entities;


import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.CascadeType;

@Entity @Data @Table(name = "action")
@NoArgsConstructor @AllArgsConstructor
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JsonIncludeProperties(value = {"id","label","path","isActive"})
    @AttributeOverride(name = "isActive", column = @Column(name = "category_is_active"))
    private Category category;


//    private Boolean image;
//    private Boolean video;
//    private Boolean pictogram;
//    private Boolean document;


    @Embedded
    @AttributeOverride(name = "isActive", column = @Column(name = "image_is_active"))
    @AttributeOverride(name = "read", column = @Column(name = "image_read"))
    @AttributeOverride(name = "write", column = @Column(name = "image_write"))
    private Access image;

    @Embedded
    @AttributeOverride(name = "isActive", column = @Column(name = "video_is_active"))
    @AttributeOverride(name = "read", column = @Column(name = "video_read"))
    @AttributeOverride(name = "write", column = @Column(name = "video_write"))
    private Access video;

    @Embedded
    @AttributeOverride(name = "isActive", column = @Column(name = "pictogram_is_active"))
    @AttributeOverride(name = "read", column = @Column(name = "pictogram_read"))
    @AttributeOverride(name = "write", column = @Column(name = "pictogram_write"))
    private Access pictogram;

    @Embedded
    @AttributeOverride(name = "isActive", column = @Column(name = "document_is_active"))
    @AttributeOverride(name = "read", column = @Column(name = "document_read"))
    @AttributeOverride(name = "write", column = @Column(name = "document_write"))
    private Access document;
}
