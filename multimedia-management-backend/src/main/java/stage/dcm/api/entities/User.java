package stage.dcm.api.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity @Data @Table(name = "_user")
@NoArgsConstructor @AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,unique = true)
    private String username;

    @Column(nullable = false,unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String function;

    @ManyToMany(fetch = FetchType.EAGER)
    @AttributeOverride(name = "isActive", column = @Column(name = "role_is_active"))
    private Collection<Role> roles=new ArrayList<>();

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY,cascade=CascadeType.ALL)
    @JsonIncludeProperties(value = {"id","fileName","type","filepath"})
    @JsonIgnore
    private Collection<File> files=new ArrayList<>();

    @JsonProperty("isActive")
    private Boolean isActive;

    @JsonProperty("forgotPassword")
    private Boolean forgotPassword=false;
}
