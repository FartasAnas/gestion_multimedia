package stage.dcm.api.servicesImp;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import stage.dcm.api.entities.Keyword;
import stage.dcm.api.exceptions.NotFoundException;
import stage.dcm.api.repositories.KeywordRepository;
import stage.dcm.api.services.KeywordServices;

import javax.transaction.Transactional;
import java.util.List;

@Service @Transactional @RequiredArgsConstructor
public class KeywordServicesImp implements KeywordServices {

    private final KeywordRepository keywordRepository;

    @Override
    public Keyword saveKeyword(Keyword keyword) {
        return keywordRepository.save(keyword);
    }

    @Override
    public Keyword getKeywordById(Long id) throws NotFoundException {
        return keywordRepository.findById(id).orElseThrow(() -> new NotFoundException("Keyword not found"));
    }

    @Override
    public List<Keyword> getAllKeywords() {
        return keywordRepository.findAll();
    }

    @Override
    public Keyword getKeywordByName(String name){
        return keywordRepository.findByName(name);
    }

    @Override
    public Keyword updateKeyword(Long id, Keyword keyword) throws NotFoundException {
        Keyword keywordToUpdate = keywordRepository.findById(id).orElseThrow(() -> new NotFoundException("Keyword not found"));
        keywordToUpdate.setName(keyword.getName() != null ? keyword.getName() : keywordToUpdate.getName());
        return keywordRepository.save(keywordToUpdate);
    }

    @Override
    public void deleteKeyword(Long id) throws NotFoundException {
        keywordRepository.deleteById(id);
    }
}
