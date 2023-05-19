package stage.dcm.api.servicesImp;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import stage.dcm.api.entities.Role;
import stage.dcm.api.entities.User;
import stage.dcm.api.repositories.RoleRepository;
import stage.dcm.api.repositories.UserRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service @Transactional @RequiredArgsConstructor
public class UserServices {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final RoleRepository roleRepository;

    //post Methods
    public User saveUser(User user){
        user.setEmail(user.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    public void addRoleToUser(String username, String roleName)  {
        User User = userRepository.findByUsername(username.toLowerCase());
        Role role = roleRepository.findByNameIgnoreCase(roleName);

        if(User == null || role == null) {
            throw new RuntimeException();
        }
        else if(User.getRoles().contains(role)) {
            throw new RuntimeException();
        }
        User.getRoles().add(role);
    }

    //get Methods
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    //put Methods
    public User updateUser(Long id, User User) {
        User userToUpdate = userRepository.findById(id).orElse(null);
        userToUpdate.setUsername( User.getUsername()!=null ? User.getUsername() : userToUpdate.getUsername() );
        userToUpdate.setEmail( User.getEmail()!=null ? User.getEmail() : userToUpdate.getEmail() );
        userToUpdate.setFunction( User.getFunction()!=null ? User.getFunction() : userToUpdate.getFunction() );
        userToUpdate.setFirstName( User.getFirstName()!=null ? User.getFirstName() : userToUpdate.getFirstName() );
        userToUpdate.setLastName( User.getLastName()!=null ? User.getLastName() : userToUpdate.getLastName() );
        return userRepository.save(userToUpdate);
    }

    //delete Methods
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
