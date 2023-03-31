package stage.dcm.api.services;

import stage.dcm.api.entities.Keyword;
import stage.dcm.api.exceptions.NotFoundException;

import java.util.List;

public interface KeywordServices {
    public Keyword saveKeyword(Keyword keyword);
    public Keyword getKeywordById(Long id) throws NotFoundException;
    public List<Keyword> getAllKeywords();
    public Keyword getKeywordByName(String name);
    public Keyword updateKeyword(Long id, Keyword keyword) throws NotFoundException;
    public void deleteKeyword(Long id) throws NotFoundException;
}
