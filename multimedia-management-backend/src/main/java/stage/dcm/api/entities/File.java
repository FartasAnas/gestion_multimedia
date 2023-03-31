package stage.dcm.api.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import stage.dcm.api.enums.FileCategory;
import stage.dcm.api.enums.FileState;
import stage.dcm.api.enums.FileType;
import stage.dcm.api.enums.FileVersion;

import javax.persistence.*;
import java.util.Date;

@Entity @Data @Table(name = "file")
@NoArgsConstructor @AllArgsConstructor
public class File {
    @Id
    private Long id;

    private String createdBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIncludeProperties(value = {"id","username","email"})
    private User user;

    private String fileName;

    @Temporal(TemporalType.TIMESTAMP) @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss.SSS") @CreationTimestamp
    private Date creationDate;

    private String description;

    private String size;

    private FileType type;
//    private String type;
    private FileVersion version;

    private FileState state;

    private FileCategory category;

    private String filepath;

}
