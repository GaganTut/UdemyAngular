import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

import {Ingrediant} from '../../shared/ingrediant.model'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
	@ViewChild('nameInput') nameInputRef: ElementRef;
	@ViewChild('amountInput') amountInputRef: ElementRef;
	@Output() ingrediantAdded = new EventEmitter<Ingrediant>();

  constructor() { }

  ngOnInit() {
	}
	
	onAddItem() {
		const newIngrediant = new Ingrediant(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
		this.ingrediantAdded.emit(newIngrediant);
	}

}
