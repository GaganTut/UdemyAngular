import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { RecipeService } from '../recipes/recipe.service';
import { ServerService } from '../server/server.service';

@NgModule({
	declarations: [
		HeaderComponent,
		HomeComponent
	],
	imports: [
		SharedModule,
		AppRoutingModule,
	],
	exports: [
		AppRoutingModule,
		HeaderComponent
	],
	providers: [
		RecipeService,
		ServerService
	]
})
export class CoreModule {}
