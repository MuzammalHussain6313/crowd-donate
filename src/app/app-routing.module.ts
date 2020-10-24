import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./authentication/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./authentication/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./authentication/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./authentication/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'add-donation',
    loadChildren: () => import('./donor/add-donation/add-donation.module').then(m => m.AddDonationPageModule)
  },
  {
    path: 'admin-chat',
    loadChildren: () => import('./admin/admin-chat/admin-chat.module').then( m => m.AdminChatPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'add-project',
    loadChildren: () => import('./NGO/add-project/add-project.module').then( m => m.AddProjectPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./NGO/chat/chat.module').then( m => m.ChatPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
