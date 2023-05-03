import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import FileObject from "../../../entities/FileObject";
import FileInput from "../../../entities/FileInput";
import {FileService} from "../../../services/file/file.service";
import {UploadInterfaceStep1Component} from "../upload-interface-step1/upload-interface-step1.component";
import KeywordObject from "../../../entities/KeywordObject";
import Category from "../../../entities/Category";
import {CategoryService} from "../../../services/category/category.service";

@Component({
  selector: 'app-upload-interface',
  templateUrl: './upload-interface.component.html',
  styleUrls: ['./upload-interface.component.css']
})
export class UploadInterfaceComponent implements OnInit{
  @Input() fileType?:string
  @Input() showInterface?:boolean
  @Input() text?:String
  @Input() categoryId?:number
  @Output() closeUploadEvent=new EventEmitter<boolean>();
  @Output() fileUploaded = new EventEmitter();
  @ViewChild (UploadInterfaceStep1Component) step1Component?: UploadInterfaceStep1Component;
  selectedKeywords:KeywordObject[] = [];

  fileObjectInitialValue:FileObject={
    createdBy:"",
    fileName:"",
    description:"",
    type:"",
    version:"VF",
    state:"PUBLISHED"
  }
  fileObject:FileObject={ ...this.fileObjectInitialValue };
  categoryObject:Category={
    label:"",
    description:"",
    path:"",
    isActive:true,
  }
  selectedFile?: FileInput | undefined;
  currentStep:String="Step1"
  constructor(private fileService:FileService,private categoryService:CategoryService) {
  }

  ngOnInit(): void {
    this.fileObject.type=this.fileType
    if(this.fileType==='PICTOGRAM'){
      this.fileObject.version=this.fileObjectInitialValue.version=undefined
      this.fileObject.state=this.fileObjectInitialValue.state=undefined
      this.fileObjectInitialValue.type=this.fileType
    }
  }

  handelCloseInterfaceClick() {
    this.showInterface = false;
    this.closeUploadEvent.emit(this.showInterface);
    this.selectedFile=undefined
    this.currentStep="Step1"
    this.step1Component?.clearInputValue()
    this.fileObject={ ...this.fileObjectInitialValue };
  }
  handleFileEvent(fileInput: FileInput) {
    this.selectedFile=fileInput;
  }
  handleUploadFile() {
    if(this.selectedFile?.file && this.fileType){
        this.fileObject.keywords=Object.values(this.selectedKeywords)
        this.fileObject.type = this.fileType
        if(this.fileType==='Category'){
          this.categoryService.saveCategory(this.selectedFile?.file,this.categoryObject).subscribe(
            data=>{
              this.handelCloseInterfaceClick()
                this.fileUploaded.emit()
            },
            error => {
              console.error('Upload error:', error);
            }
            )
        }else {
          this.fileObject.category= {id:this.categoryId,label:"",description:"",path:"",isActive:true}
          this.fileService.saveFile(this.selectedFile?.file,this.fileObject).subscribe(
            data=>{
              this.handelCloseInterfaceClick()
              this.fileUploaded.emit()
            },
            error => {
              console.error('Upload error:', error);
            }
          )
        }

      }
  }
  handleDisableUploadBtn(): boolean {
    return (
      this.fileObject.state === '' &&
      this.fileObject.version === '' &&
      (
        this.fileObject.type !== 'PICTOGRAM' ||
        this.fileObject.fileName === ''
      )
    );
  }
  handleSwitchStep(): void {
    this.currentStep = this.currentStep === "Step1" ? "Step2" : "Step1";
  }

  handleFileObjectChange(newFileObject: FileObject) {
    this.fileObject= {...newFileObject};
  }

  handleSelectedKeywords(newSelectedKeywords:KeywordObject[]) {
    this.selectedKeywords={...newSelectedKeywords}
  }


}
