import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { fbKey } from './KEYS';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	loadedFeature = 'recipe';

	onNavigate(feature: string) {
		this.loadedFeature = feature;
	}

	ngOnInit() {
		firebase.initializeApp({
			apiKey: fbKey,
			authDomain: "ngularprac.firebaseapp.com",
		})
	}

}
