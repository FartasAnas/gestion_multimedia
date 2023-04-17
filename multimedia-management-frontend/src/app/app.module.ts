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
import { WebLayoutComponent } from './layouts/web-layout/web-layout.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { KeywordsSelectorComponent } from './components/keywords-selector/keywords-selector.component';
import { StateTagComponent } from './components/state-tag/state-tag.component';
import { FileDetailsBarComponent } from './components/file-details-bar/file-details-bar.component';
import { FileDetailsLayoutComponent } from './layouts/file-details-layout/file-details-layout.component';
import { EditFileComponent } from './components/edit-file/edit-file.component';
import { VideosLayoutComponent } from './layouts/videos-layout/videos-layout.component';
import { FileCardComponent } from './components/file-card/file-card.component';
import { FileInterfaceComponent } from './components/file-interface/file-interface.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { FileVideoCardComponent } from './components/file-video-card/file-video-card.component';
import { DocumentsLayoutComponent } from './layouts/documents-layout/documents-layout.component';
import { FileDocumentCardComponent } from './components/file-document-card/file-document-card.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import { PreviewUnavailableComponent } from './components/preview-unavailable/preview-unavailable.component';
import { DocumentViewerComponent } from './components/document-viewer/document-viewer.component';
import { PictosLayoutComponent } from './layouts/pictos-layout/pictos-layout.component';


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
    WebLayoutComponent,
    PageTitleComponent,
    HomeCardComponent,
    KeywordsSelectorComponent,
    StateTagComponent,
    FileDetailsBarComponent,
    FileDetailsLayoutComponent,
    EditFileComponent,
    VideosLayoutComponent,
    FileCardComponent,
    FileInterfaceComponent,
    VideoPlayerComponent,
    FileVideoCardComponent,
    DocumentsLayoutComponent,
    FileDocumentCardComponent,
    PreviewUnavailableComponent,
    DocumentViewerComponent,
    PictosLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    VgCoreModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgControlsModule,
    PdfViewerModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
