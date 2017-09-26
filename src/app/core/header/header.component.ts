import { SignOut } from './../../store/auth/auth.actions';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../server/server.service';
import * as app from '../../store/app.reducers';
import * as auth from '../../store/auth/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	authState: Observable<auth.State>;

	constructor(
		private serverService: ServerService,
		private store: Store<app.AppState>
	) {}

	ngOnInit() {
		this.authState = this.store.select('auth');
	}

	onSaveData() {
		this.serverService.storeData()
			.subscribe(
				res => console.log(res),
				error => console.log(error)
			);
	}

	onFetchData() {
		this.serverService.fetchData();
	}

	onLogout() {
		this.store.dispatch(new SignOut());
	}
}
