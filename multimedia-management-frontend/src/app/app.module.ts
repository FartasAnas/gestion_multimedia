import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import {FormsModule} from "@angular/forms";
import { HomePageComponent } from './layouts/home-page/home-page.component';
import {HttpClientModule} from "@angular/common/http";
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SidebarButtonComponent } from './components/sidebar-button/sidebar-button.component';
import { ImagesLayoutComponent } from './layouts/images-layout/images-layout.component';
import { UploadBtnComponent } from './components/upload/upload-btn/upload-btn.component';
import { UploadInterfaceStep1Component } from './components/upload/upload-interface-step1/upload-interface-step1.component';
import { UploadProgressComponent } from './components/upload/upload-progress/upload-progress.component';
import { UploadInterfaceStep2Component } from './components/upload/upload-interface-step2/upload-interface-step2.component';
import { UploadInterfaceComponent } from './components/upload/upload-interface/upload-interface.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { WebLayoutComponent } from './layouts/web-layout/web-layout.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { KeywordsSelectorComponent } from './components/keywords-selector/keywords-selector.component';
import { StateTagComponent } from './components/state-tag/state-tag.component';
import { FileDetailsBarComponent } from './components/file-details-bar/file-details-bar.component';
import { FileDetailsLayoutComponent } from './layouts/file-details-layout/file-details-layout.component';
import { EditFileComponent } from './components/edit-file/edit-file.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    LoginComponentComponent,
    HomePageComponent,
    SideBarComponent,
    SidebarButtonComponent,
    ImagesLayoutComponent,
    UploadBtnComponent,
    UploadInterfaceStep1Component,
    UploadProgressComponent,
    UploadInterfaceStep2Component,
    UploadInterfaceComponent,
    ImageCardComponent,
    WebLayoutComponent,
    PageTitleComponent,
    HomeCardComponent,
    KeywordsSelectorComponent,
    StateTagComponent,
    FileDetailsBarComponent,
    FileDetailsLayoutComponent,
    EditFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
