package stage.dcm.api.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stage.dcm.api.entities.Action;
import stage.dcm.api.entities.Role;
import stage.dcm.api.exceptions.NotFoundException;
import stage.dcm.api.repositories.ActionRepository;
import stage.dcm.api.servicesImp.RoleServices;

import java.util.List;

@RestController @RequestMapping("/roles") @Slf4j
public class RoleControllers {
    @Autowired
    private RoleServices roleServices;

    @Autowired
    private ActionRepository actionRepository;

    @PostMapping("/add")
    public Role saveRole(@RequestBody Role role) throws NotFoundException {
        return roleServices.saveRole(role);
    }

    @GetMapping("/{id}")
    public Role getRoleById(@PathVariable Long id) {
        return roleServices.getRoleById(id);
    }

    @GetMapping("/name/{name}")
    public Role getRoleByName(@PathVariable String name) {
        return roleServices.getRoleByName(name);
    }

    @GetMapping("")
    public List<Role> getAllRoles() {
        return roleServices.getAllRoles();
    }

    @GetMapping("/actions")
    public List<Action> getAllActions() {
        return actionRepository.findAll();
    }

    @PutMapping("/update/{id}")
    public Role updateRole(@PathVariable Long id, @RequestBody Role role) throws NotFoundException {
        return roleServices.updateRole(id, role);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteRole(@PathVariable Long id) {
        roleServices.deleteRole(id);
    }
}
