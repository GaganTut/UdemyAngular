import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
	declarations: [
		SigninComponent,
		SignupComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		AuthRoutingModule
	]

})
export class AuthModule {}
