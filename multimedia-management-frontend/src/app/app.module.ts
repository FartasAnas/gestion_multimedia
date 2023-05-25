import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {LoginComponentComponent} from './components/login-component/login-component.component';
import {FormsModule} from "@angular/forms";
import {HomePageComponent} from './layouts/home-page/home-page.component';
import {HttpClientModule} from "@angular/common/http";
import {SideBarComponent} from './components/side-bar/side-bar.component';
import {SidebarButtonComponent} from './components/sidebar-button/sidebar-button.component';
import {ImagesLayoutComponent} from './layouts/images-layout/images-layout.component';
import {UploadBtnComponent} from './components/upload/upload-btn/upload-btn.component';
import {
  UploadInterfaceStep1Component
} from './components/upload/upload-interface-step1/upload-interface-step1.component';
import {UploadProgressComponent} from './components/upload/upload-progress/upload-progress.component';
import {
  UploadInterfaceStep2Component
} from './components/upload/upload-interface-step2/upload-interface-step2.component';
import {UploadInterfaceComponent} from './components/upload/upload-interface/upload-interface.component';
import {PageTitleComponent} from './components/page-title/page-title.component';
import {HomeCardComponent} from './components/home-card/home-card.component';
import {KeywordsSelectorComponent} from './components/keywords-selector/keywords-selector.component';
import {StateTagComponent} from './components/state-tag/state-tag.component';
import {FileDetailsBarComponent} from './components/file-details-bar/file-details-bar.component';
import {FileDetailsLayoutComponent} from './layouts/file-details-layout/file-details-layout.component';
import {EditFileComponent} from './components/edit-file/edit-file.component';
import {VideosLayoutComponent} from './layouts/videos-layout/videos-layout.component';
import {FileCardComponent} from './components/file-card/file-card.component';
import {FileInterfaceComponent} from './components/file-interface/file-interface.component';
import {VideoPlayerComponent} from './components/video-player/video-player.component';
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import {FileVideoCardComponent} from './components/file-video-card/file-video-card.component';
import {DocumentsLayoutComponent} from './layouts/documents-layout/documents-layout.component';
import {FileDocumentCardComponent} from './components/file-document-card/file-document-card.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {PreviewUnavailableComponent} from './components/preview-unavailable/preview-unavailable.component';
import {DocumentViewerComponent} from './components/document-viewer/document-viewer.component';
import {PictosLayoutComponent} from './layouts/pictos-layout/pictos-layout.component';
import {LibraryInterfaceComponent} from './components/library-interface/library-interface.component';
import {CampagnesLayoutComponent} from './layouts/campagnes-layout/campagnes-layout.component';
import {ProfileLayoutComponent} from './layouts/profile-layout/profile-layout.component';
import {ButtonComponent} from './components/button/button.component';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {PaginationBarComponent} from './components/pagination-bar/pagination-bar.component';
import {InputSelectorComponent} from './components/input-selector/input-selector.component';
import {DateRangePickerComponent} from './components/date-range-picker/date-range-picker.component';
import {LibraryLayoutComponent} from './layouts/library-layout/library-layout.component';
import {
  CategoriesManagementLayoutComponent
} from './layouts/categories-management-layout/categories-management-layout.component';
import {TableListComponent} from './components/table-list/table-list.component';
import {SwitchInputComponent} from './components/switch-input/switch-input.component';
import {UpdateCategoryLayoutComponent} from './layouts/update-category-layout/update-category-layout.component';
import {
  ConfirmationPopupMessageComponent
} from './components/confirmation-popup-message/confirmation-popup-message.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ListActionButtonComponent} from './components/list-action-button/list-action-button.component';
import {RolesManagementLayoutComponent} from './layouts/roles-management-layout/roles-management-layout.component';
import {AddRoleComponent} from './components/add-role/add-role.component';
import {UpdateRoleLayoutComponent} from './layouts/update-role-layout/update-role-layout.component';
import {GoBackComponent} from './components/go-back/go-back.component';
import {RoleCategoryListComponent} from './components/role-category-list/role-category-list.component';
import {CreateRoleLayoutComponent} from './layouts/create-role-layout/create-role-layout.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { UserManagementLayoutComponent } from './layouts/user-management-layout/user-management-layout.component';
import { AddUserInterfaceComponent } from './components/add-user/add-user-interface/add-user-interface.component';
import { AddUserInterfaceStep1Component } from './components/add-user/add-user-interface-step1/add-user-interface-step1.component';
import { AddUserInterfaceStep2Component } from './components/add-user/add-user-interface-step2/add-user-interface-step2.component';
import { AddUserInterfaceStep3Component } from './components/add-user/add-user-interface-step3/add-user-interface-step3.component';
import { UpdateUserLayoutComponent } from './layouts/update-user-layout/update-user-layout.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { UpdatePasswordLayoutComponent } from './layouts/update-password-layout/update-password-layout.component';


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
    PictosLayoutComponent,
    LibraryInterfaceComponent,
    CampagnesLayoutComponent,
    ProfileLayoutComponent,
    ButtonComponent,
    SearchBarComponent,
    PaginationBarComponent,
    InputSelectorComponent,
    DateRangePickerComponent,
    LibraryLayoutComponent,
    CategoriesManagementLayoutComponent,
    TableListComponent,
    SwitchInputComponent,
    UpdateCategoryLayoutComponent,
    ConfirmationPopupMessageComponent,
    ListActionButtonComponent,
    RolesManagementLayoutComponent,
    AddRoleComponent,
    UpdateRoleLayoutComponent,
    GoBackComponent,
    RoleCategoryListComponent,
    CreateRoleLayoutComponent,
    ErrorMessageComponent,
    UserManagementLayoutComponent,
    AddUserInterfaceComponent,
    AddUserInterfaceStep1Component,
    AddUserInterfaceStep2Component,
    AddUserInterfaceStep3Component,
    UpdateUserLayoutComponent,
    UpdatePasswordComponent,
    UpdatePasswordLayoutComponent
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
    PdfViewerModule,
    BrowserAnimationsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
