package stage.dcm.api.servicesImp;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
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

    public Role getRoleByName(String name) {
        return roleRepository.findByNameIgnoreCase(name);
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    //put Methods
    public Role updateRole(Long id, Role role) {
        Role roleToUpdate = roleRepository.findById(id).orElse(null);
        roleToUpdate.setName( role.getName()!=null ? role.getName() : roleToUpdate.getName() );
        roleToUpdate.setDescription(role.getDescription()!=null ? role.getDescription() : roleToUpdate.getDescription());
        roleToUpdate.setIsActive(role.getIsActive()!=null ? role.getIsActive() : roleToUpdate.getIsActive());
        if(role.getAction()!=null) {
            roleToUpdate.setAction(actionRepository.save(role.getAction()));
        }
        return roleRepository.save(roleToUpdate);
    }


    //delete Methods
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }
}
