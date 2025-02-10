import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
      path: 'tabs',
      component: TabsPage,
      children: [
        {
          path: 'home',
          loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
        },
        {
          path: 'inviteManagment',
          loadChildren: () => import('../invitation-list/invitation-list.module').then(m => m.InvitationListPageModule)
        },
        {
          path: 'configPage',
          loadChildren: () => import('../config-page/config-page.module').then(m => m.ConfigPagePageModule)
        },
        {
          path: 'tableManagement',
          loadChildren: () => import('../table-management/table-management.module').then(m => m.TableManagementPageModule)
        },
        {
          path: 'bugetManagement',
          loadChildren: () => import('../buget-management/buget-management.module').then(m => m.BugetManagementPageModule)
        },
        {
          path: '',
          redirectTo: '/tabs/home',
          pathMatch: 'full'
        }
      ]
    },
    {
      path: '',
      redirectTo: '/tabs/home',
      pathMatch: 'full'
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
