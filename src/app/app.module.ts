import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
      countDuplicates: true
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
