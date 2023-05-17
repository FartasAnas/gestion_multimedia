package stage.dcm.api.servicesImp;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import stage.dcm.api.entities.Access;
import stage.dcm.api.entities.Action;
import stage.dcm.api.repositories.ActionRepository;
import stage.dcm.api.services.ActionServices;

import javax.transaction.Transactional;
import java.util.List;

@Service @Transactional @RequiredArgsConstructor @Slf4j
public class ActionServicesImp implements ActionServices {

    private final ActionRepository actionRepository;

    @Override
    public Action createAction(Action action) {
        Access access = new Access(false, false, false);
        action.setImage(accessIfNotNull(action.getImage(), access));
        action.setVideo(accessIfNotNull(action.getVideo(), access));
        action.setDocument(accessIfNotNull(action.getDocument(), access));
        action.setPictogram(accessIfNotNull(action.getPictogram(), access));
        return actionRepository.save(action);
    }
    private Access accessIfNotNull(Access object, Access access) {
        return object == null ? access : object;
    }

    @Override
    public Action updateAction(Action actionToUpdate, Action newAction) {
        log.info("I Entered in updateAction the methode");
        actionToUpdate.setImage(updateAccess(newAction.getImage()!=null ? newAction.getImage() : actionToUpdate.getImage()));
        actionToUpdate.setVideo(newAction.getVideo()!=null ? newAction.getVideo() : actionToUpdate.getVideo());
        actionToUpdate.setPictogram(newAction.getPictogram()!=null ? newAction.getPictogram() : actionToUpdate.getPictogram());
        actionToUpdate.setDocument(newAction.getDocument()!=null ? newAction.getDocument() : actionToUpdate.getDocument());
        return actionRepository.save(actionToUpdate);
    }

    private Access updateAccess(Access access){
        log.info("I Entered in the updateAccess methode");
        if (access.getIsActive() && !access.isRead() && !access.isWrite()) {
            access.setRead(true);
            access.setWrite(true);
        }
        if(access.isRead() && !access.isWrite() && access.getIsActive()){
            access.setWrite(true);
            access.setIsActive(true);
        }
        if(access.isWrite() && !access.getIsActive() && !access.isRead()){
            access.setRead(true);
            access.setIsActive(true);
        }
        if(!access.getIsActive()){
            access.setRead(false);
            access.setWrite(false);
        }
        if (!access.isRead()) {
            access.setIsActive(false);
            access.setWrite(false);
        }
        return access;
    }

    @Override
    public void deleteAction(Long actionId) {
        actionRepository.deleteById(actionId);
    }

    @Override
    public Action getActionById(Long actionId) {
        return actionRepository.findById(actionId).orElseThrow(() -> new IllegalArgumentException("Action not found"));
    }

    @Override
    public List<Action> getAllActions() {
        return actionRepository.findAll();
    }
}
