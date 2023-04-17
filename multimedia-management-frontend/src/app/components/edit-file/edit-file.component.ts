import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import FileObject from "../../entities/FileObject";
import KeywordObject from "../../entities/KeywordObject";
import {FileService} from "../../services/file/file.service";
import {NgForm} from "@angular/forms";
import {FileVideoCardComponent} from "../file-video-card/file-video-card.component";

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.css']
})
export class EditFileComponent implements OnInit, OnChanges {
  isVisible = false;
  readonly hostname = window.location.hostname;
  @Input() fileObject?: FileObject;
  fileObjectCopy?: FileObject;
  @Output() fileObjectChange = new EventEmitter<FileObject>();
  selectedKeywords: KeywordObject[] = [];
  fileUrl = '';

  @ViewChild(FileVideoCardComponent) videoCard?: FileVideoCardComponent;

  ngOnInit(): void {
    this.fileObjectCopy = { ...this.fileObject };
    this.selectedKeywords = [...this.fileObject?.keywords ?? []];
    this.fileUrl = `http://${this.hostname}:8100/files/object/${this.fileObject?.id}/`;
  }

  constructor(private readonly fileService: FileService) {}

  toggleVisibility(toggle: boolean): void {
    if (!toggle) {
      this.fileObjectCopy = { ...this.fileObject };
    }
    this.isVisible = toggle;
  }

  handleSubmit(form: NgForm) {
    const fileObjectCopy = { ...this.fileObjectCopy };
    if (fileObjectCopy && fileObjectCopy.type === 'PICTOGRAM') {
      fileObjectCopy.fileName = form.value.name + '.' + (fileObjectCopy.fileName?.split('.')[1] ?? '');
    }
    this.fileObject = {
      ...fileObjectCopy,
      keywords: [...this.selectedKeywords],
    };
    const fileId = this.fileObject?.id;
    if (fileId && this.fileObject) {
      this.fileService.updateFile(fileId, this.fileObject).subscribe(
        () => {
          console.log(`File with ID ${fileId} deleted successfully`);
          this.fileObjectChange.emit(this.fileObject);
          this.toggleVisibility(false);
        },
        (error) => console.error(`Error deleting file with ID ${fileId}: ${error}`)
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('fileObject' in changes) {
      this.updateEditInterface();
    }
  }

  updateEditInterface() {
    this.fileObjectCopy = { ...this.fileObject };
    this.fileUrl = `http://${this.hostname}:8100/files/object/${this.fileObject?.id}/`;
    this.selectedKeywords = [...this.fileObject?.keywords ?? []];
  }

  getFileExtension(): string {
    return this.fileObject?.fileName?.split('.')[1] as string;
  }
}
