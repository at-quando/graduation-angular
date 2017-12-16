import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { globalRoutes } from './global/global.routing';
import { accountRoutes } from './account/account.routing';
import { ConfirmEmailComponent } from './authenticate/confirm-email/confirm-email.component';

const routes: Routes = [
  {
    path: 'confirm_email/:token/:uid/:provider',
    component: ConfirmEmailComponent
  },
  ...accountRoutes,
  ...globalRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [RouterModule]
})

export class AppRoutingModule { }
