package stage.dcm.api.services;

import stage.dcm.api.entities.Action;

import java.util.List;

public interface ActionServices {
    Action createAction(Action action);
    Action updateAction(Action actionToUpdate, Action newAction);
    void deleteAction(Long actionId);
    Action getActionById(Long actionId);
    List<Action> getAllActions();
}
