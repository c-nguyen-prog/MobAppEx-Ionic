import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SlidesGuard } from './guards/slides.guard';

const routes: Routes = [
  { path: 'tabs', redirectTo: 'tabs/tab1', pathMatch: 'full' },
  { path: 'slides', loadChildren: './slides/slides.module#SlidesPageModule' },
  { path: '', loadChildren: './homepage/homepage.module#HomepagePageModule', canActivate: [SlidesGuard] },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' }, // when path isn't '', the whole app breaks????
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
