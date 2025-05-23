import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routes.module';
import { ItemComponent } from './item/item.component';
import { TarefasComponent } from './tarefas/tarefas.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form.component';
import { LogoutComponent } from './login/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    LoginComponent,
    LogoutComponent,
    TarefasComponent,
    UsersComponent,
    UserFormComponent,
  ],
  providers: [
    provideClientHydration(withEventReplay()),
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
