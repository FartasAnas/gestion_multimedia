package stage.dcm.api.servicesImp;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import stage.dcm.api.entities.Action;
import stage.dcm.api.entities.Role;
import stage.dcm.api.exceptions.NotFoundException;
import stage.dcm.api.repositories.ActionRepository;
import stage.dcm.api.repositories.RoleRepository;
import stage.dcm.api.services.ActionServices;
import stage.dcm.api.services.CategoryServices;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service @Transactional @RequiredArgsConstructor @Slf4j
public class RoleServices {
    private final RoleRepository roleRepository;
    private final ActionRepository actionRepository;

    private final CategoryServices categoryServices;

    private final ActionServices actionServices;
    //post Methods
    public Role saveRole(Role role) throws NotFoundException {
        if(!role.getActions().isEmpty()){
            List<Action> newActions = new ArrayList<>();
            for(Action action : role.getActions()){
                if(action!=null){
                    action.setCategory(categoryServices.getCategory(action.getCategory()));
                    newActions.add(actionServices.createAction(action));
                }
            }
            role.setActions(newActions);
        }
        return roleRepository.save(role);
    }


    //get Methods
    public Role getRoleById(Long id) {
        return roleRepository.findById(id).orElse(null);
    }

    public Role getRoleByName(String name) {
        Role role=roleRepository.findByNameIgnoreCase(name);
        role.getActions().sort(Comparator.comparing(a -> a.getCategory().getCreationDate()));
        return role;
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public Role findRole(Role role){
        if(role.getId()!=null){
            return roleRepository.findById(role.getId()).orElse(null);
        } else if (role.getName()!=null) {
            return roleRepository.findByNameIgnoreCase(role.getName());
        }
        return null;
    }

    //put Methods
    public Role updateRole(Long id, Role role) throws NotFoundException {
        Role roleToUpdate = roleRepository.findById(id).orElse(null);
        if(roleToUpdate==null){
            throw new NotFoundException("Role not found");
        }
        roleToUpdate.setName(role.getName() != null ? role.getName() : roleToUpdate.getName());
        roleToUpdate.setDescription(role.getDescription() != null ? role.getDescription() : roleToUpdate.getDescription());
        roleToUpdate.setIsActive(role.getIsActive() != null ? role.getIsActive() : roleToUpdate.getIsActive());

        List<Action> actionsToRemove = roleToUpdate.getActions().stream().filter(actionToUpdate -> role.getActions().stream().noneMatch(action -> action.getId().equals(actionToUpdate.getId()))).collect(Collectors.toList());
        roleToUpdate.getActions().removeAll(actionsToRemove);
        log.info("Actions to remove: {}", actionsToRemove);
        actionRepository.deleteAll(actionsToRemove);

        if (!role.getActions().isEmpty()) {
            for (Action action : role.getActions()) {
                Action actionToUpdate = actionRepository.findById(action.getId()).orElse(null);
                if (actionToUpdate != null) {
                    actionServices.updateAction(actionToUpdate,action);
                } else {
                    if (action.getCategory() == null) {
                        throw new NotFoundException("Category not found");
                    }
                    action.setCategory(categoryServices.getCategory(action.getCategory()));
                    actionRepository.save(action);
                    roleToUpdate.getActions().add(action);
                }
            }
        } else {
            roleToUpdate.getActions().clear();
            actionRepository.deleteAll(roleToUpdate.getActions());
        }
        return roleRepository.save(roleToUpdate);
    }


    //delete Methods
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }
}
