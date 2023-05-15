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

    @OneToOne()
    @JsonIncludeProperties(value = {"id","label","path","isActive"})
    private Category category;

    private boolean image;
    private boolean video;
    private boolean pictogram;
    private boolean document;
}
