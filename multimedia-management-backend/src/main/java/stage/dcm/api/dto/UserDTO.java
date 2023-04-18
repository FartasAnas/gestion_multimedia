package stage.dcm.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor @NoArgsConstructor @Data
public class UserDTO {
    private long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String function;
}
