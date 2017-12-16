import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { AuthGuard } from '../service/auth/auth-guard';
import { CanDeactivateGuard } from '../service/auth/can-deactivate-guard';

const AUTH_PROVIDERS = [
  AuthService,
  AuthGuard,
  CanDeactivateGuard
];

@NgModule({
  imports: [],
  declarations: [],
  exports: []
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [AUTH_PROVIDERS]
    };
  }
}
