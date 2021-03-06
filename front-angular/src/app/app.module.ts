import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//app
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';

//auth
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';

//pages
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent }      from './not-found/not-found.component';

//materialize
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzSidenavModule, MzButtonModule, MzCardModule, MzNavbarModule } from 'ngx-materialize';

//services
import { ExplorerService } from './explorer/explorer.service';
import { AccountService } from './account/account.service';
import { AuthService } from './auth/auth.service';

//tools
import { QRCodeModule } from 'angular2-qrcode';
import { ClipboardModule } from 'ngx-clipboard';

//partials
import { NavbarComponent } from './navbar/navbar.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MzSidenavModule,
    MzButtonModule,
    MzCardModule,
    MzNavbarModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    QRCodeModule,
    ClipboardModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    })
  ],
  providers: [
    ExplorerService,
    AccountService,
    AuthGuard,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
