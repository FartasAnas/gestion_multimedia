package stage.dcm.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stage.dcm.api.entities.Role;
import stage.dcm.api.servicesImp.RoleServices;

import java.util.List;

@RestController @RequestMapping("/roles")
public class RoleControllers {
    @Autowired
    private RoleServices roleServices;

    @PostMapping("/add")
    public Role saveRole(@RequestBody Role role) {
        return roleServices.saveRole(role);
    }

    @GetMapping("/{id}")
    public Role getRoleById(@PathVariable Long id) {
        return roleServices.getRoleById(id);
    }

    @GetMapping("")
    public List<Role> getAllRoles() {
        return roleServices.getAllRoles();
    }

    @PutMapping("/update/{id}")
    public Role updateRole(@PathVariable Long id, @RequestBody Role role) {
        return roleServices.updateRole(id, role);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRole(@PathVariable Long id) {
        roleServices.deleteRole(id);
    }
}
