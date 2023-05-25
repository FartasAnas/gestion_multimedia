package stage.dcm.api.servicesImp;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import stage.dcm.api.entities.Role;
import stage.dcm.api.entities.User;
import stage.dcm.api.exceptions.NotFoundException;
import stage.dcm.api.repositories.RoleRepository;
import stage.dcm.api.repositories.UserRepository;
import stage.dcm.api.util.PasswordValidator;
import stage.dcm.api.util.RandomPasswordGenerator;
import stage.dcm.api.util.sendmail.EmailDetails;
import stage.dcm.api.util.sendmail.EmailService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service @Transactional @RequiredArgsConstructor
public class UserServices {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final RoleRepository roleRepository;

    private final RoleServices roleServices;

    private final EmailService emailService;

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
    public User updateUser(Long id, User user) {
        User userToUpdate = userRepository.findById(id).orElse(null);
        userToUpdate.setUsername( user.getUsername()!=null ? user.getUsername() : userToUpdate.getUsername() );
        userToUpdate.setEmail( user.getEmail()!=null ? user.getEmail() : userToUpdate.getEmail() );
        userToUpdate.setFunction( user.getFunction()!=null ? user.getFunction() : userToUpdate.getFunction() );
        userToUpdate.setFirstName( user.getFirstName()!=null ? user.getFirstName() : userToUpdate.getFirstName() );
        userToUpdate.setLastName( user.getLastName()!=null ? user.getLastName() : userToUpdate.getLastName() );
        userToUpdate.setIsActive( user.getIsActive()!=null ? user.getIsActive() : userToUpdate.getIsActive());
        userToUpdate.setForgotPassword(user.getForgotPassword()!=null ? user.getForgotPassword() : userToUpdate.getForgotPassword());

        if(!user.getRoles().isEmpty()){
            Collection<Role> newRoles=new ArrayList<>();
            for (Role role:user.getRoles()){
                if(roleServices.findRole(role)!=null){
                    newRoles.add(role);
                }
            }
            userToUpdate.setRoles(newRoles);
        }
        return userRepository.save(userToUpdate);
    }

    //delete Methods
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void forgotPassword(String email) throws NotFoundException {
        User user=userRepository.findByEmail(email);
        if(user==null){
            throw new NotFoundException("User not found");
        }
        String newPassword= RandomPasswordGenerator.generate();
        user.setForgotPassword(true);
        user.setPassword(passwordEncoder.encode(newPassword));
        emailService.sendSimpleMail(new EmailDetails(user.getEmail(), newPassword));
    }

    public void updatePassword(String email,String newPassword) throws NotFoundException {
        User user=userRepository.findByEmail(email);
        if(user==null){
            throw new NotFoundException("User not found");
        }
        if(user.getForgotPassword()){
            if(!PasswordValidator.isValid(newPassword)){
                throw new IllegalStateException("Password not Valid");
            }
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setForgotPassword(false);
        }
    }
}
