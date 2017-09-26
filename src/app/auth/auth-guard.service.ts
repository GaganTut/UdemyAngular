import * as app from '../store/app.reducers';

import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private store: Store<app.AppState>) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.store.select('auth')
			.take(1)
			.map(auth => !auth.authenticated);
	}
}
