package stage.dcm.api.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity @Data @Table(name = "category")
@NoArgsConstructor @AllArgsConstructor
public class Category {
    @Id
    private Long id;

    @Column(nullable = false,unique = true)
    private String label;

    private String iconPath;

    @Column(nullable = false,unique = true)
    private String path;


    private String description;

    @JsonProperty("isActive")
    private Boolean isActive;

    @Temporal(TemporalType.TIMESTAMP) @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss") @CreationTimestamp
    private Date creationDate;
}
