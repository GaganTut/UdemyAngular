import { Component } from '@angular/core';
import { ServerService } from '../server/server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	constructor(private serverService: ServerService){}

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
}
