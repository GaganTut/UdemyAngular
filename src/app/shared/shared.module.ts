import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
	declarations: [
		DropdownDirective
	],
	 exports: [
		 CommonModule,
		 DropdownDirective,
		 FormsModule
	 ]
})
export class SharedModule{}