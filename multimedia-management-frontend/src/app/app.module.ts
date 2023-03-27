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
import { UploadInterfaceComponent } from './components/upload/upload-interface/upload-interface.component';
import { UploadProgressComponent } from './components/upload/upload-progress/upload-progress.component';

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
    UploadInterfaceComponent,
    UploadProgressComponent
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
