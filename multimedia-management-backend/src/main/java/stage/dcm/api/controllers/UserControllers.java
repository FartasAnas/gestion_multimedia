package stage.dcm.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stage.dcm.api.entities.User;
import stage.dcm.api.services.UserServices;

import java.util.List;

@RestController @RequestMapping("/users")
public class UserControllers {
    @Autowired
    private UserServices userServices;

    @PostMapping("/add")
    public User saveUser(@RequestBody User User) {
        return userServices.saveUser(User);
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userServices.getUserById(id);
    }

    @GetMapping("/username/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userServices.getUserByUsername(username);
    }

    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userServices.getUserByEmail(email);
    }

    @GetMapping("")
    public List<User> getAllUsers() {
        return userServices.getAllUsers();
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User User) {
        return userServices.updateUser(id, User);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        userServices.deleteUser(id);
    }
}
