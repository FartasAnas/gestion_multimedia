package stage.dcm.api.controllers;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import stage.dcm.api.entities.Keyword;
import stage.dcm.api.exceptions.NotFoundException;
import stage.dcm.api.services.KeywordServices;

import java.util.List;

@RestController @RequestMapping("/keywords") @AllArgsConstructor
public class KeywordControllers {
    @Autowired
    private final KeywordServices keywordServices;

    @PostMapping("/add")
    public ResponseEntity<Keyword> saveKeyword(@RequestBody Keyword keyword) {
        Keyword savedKeyword = keywordServices.saveKeyword(keyword);
        return new ResponseEntity<>(savedKeyword, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Keyword> getKeywordById(@PathVariable Long id) throws NotFoundException {
        Keyword keyword = keywordServices.getKeywordById(id);
        return new ResponseEntity<>(keyword, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<Keyword>> getAllKeywords() {
        List<Keyword> keywords = keywordServices.getAllKeywords();
        return new ResponseEntity<>(keywords, HttpStatus.OK);
    }

    @GetMapping("/search/{name}")
    public ResponseEntity<Keyword> getKeywordByName(@PathVariable String name) throws NotFoundException {
        Keyword keyword = keywordServices.getKeywordByName(name);
        return new ResponseEntity<>(keyword, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Keyword> updateKeyword(@PathVariable Long id, @RequestBody Keyword keyword) throws NotFoundException {
        Keyword updatedKeyword = keywordServices.updateKeyword(id, keyword);
        return new ResponseEntity<>(updatedKeyword, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteKeyword(@PathVariable Long id) throws NotFoundException {
        keywordServices.deleteKeyword(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
