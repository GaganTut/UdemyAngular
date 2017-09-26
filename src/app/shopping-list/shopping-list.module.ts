import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
	declarations: [
		ShoppingEditComponent,
		ShoppingListComponent
	],
	imports: [
		CommonModule,
		SharedModule
	]
})
export class ShoppingListModule {}
