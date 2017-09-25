import { reducers } from './store/app.reducers';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import {AppRoutingModule} from './app-routing.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import {CoreModule} from './core/core.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
		BrowserModule,
		AppRoutingModule,
		HttpModule,
		SharedModule,
		ShoppingListModule,
		AuthModule,
		CoreModule,
		StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
