import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import * as app from '../store/app.reducers';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private store: Store<app.AppState>) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.store.select('auth').map(auth => auth.authenticated);
	}
}
