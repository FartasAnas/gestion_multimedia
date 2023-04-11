package stage.dcm.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor @NoArgsConstructor @Data
public class NextPreviousFilesDTO {
    private Long nextFileId;
    private Long previousFileId;
}
