package stage.dcm.api.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity @Data @Table(name = "keyword")
@NoArgsConstructor @AllArgsConstructor
public class Keyword {
    @Id
    private Long id;

    @Column(nullable = false,unique = true)
    private String name;
}
