import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

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
export class SharedModule {}
