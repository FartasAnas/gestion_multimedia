package stage.dcm.api.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Embeddable @NoArgsConstructor @AllArgsConstructor @Data
public class Access {
    @JsonProperty("isActive")
    private Boolean isActive;

    private boolean read;
    private boolean write;

}
