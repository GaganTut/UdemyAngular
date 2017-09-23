import { Component } from '@angular/core';
import { ServerService } from '../../server/server.service';

import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	constructor(
		private serverService: ServerService,
		private authService: AuthService
	){}

	onSaveData() {
		this.serverService.storeData()
			.subscribe(
				res => console.log(res),
				error => console.log(error)
			)
	}

	onFetchData() {
		this.serverService.fetchData();
	}

	onLogout() {
		this.authService.logout();
	}
}
