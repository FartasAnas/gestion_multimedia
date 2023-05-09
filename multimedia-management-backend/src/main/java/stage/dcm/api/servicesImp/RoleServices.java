package stage.dcm.api.servicesImp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import stage.dcm.api.entities.Role;
import stage.dcm.api.repositories.ActionRepository;
import stage.dcm.api.repositories.RoleRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service @Transactional @RequiredArgsConstructor
public class RoleServices {
    private final RoleRepository roleRepository;
    private final ActionRepository actionRepository;

    //post Methods
    public Role saveRole(Role role) {
        if(role.getAction()!=null){
            role.setAction(actionRepository.save(role.getAction()));
        }
        return roleRepository.save(role);
    }

    //get Methods
    public Role getRoleById(Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    //put Methods
    public Role updateRole(Long id, Role role) {
        Role roleToUpdate = roleRepository.findById(id).orElse(null);
        roleToUpdate.setName( role.getName()!=null ? role.getName() : roleToUpdate.getName() );
        return roleRepository.save(roleToUpdate);
    }


    //delete Methods
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }
}
