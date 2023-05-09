package stage.dcm.api.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity @Data @Table(name = "action")
@NoArgsConstructor @AllArgsConstructor
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    boolean image;
    boolean video;
    boolean pictogram;
    boolean document;
}
