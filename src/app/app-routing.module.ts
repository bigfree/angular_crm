import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientAddComponent } from './clients/client-add/client-add.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { ClientsComponent } from './clients/clients.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'clients', component: ClientsComponent },
	{ path: 'clients/add', component: ClientAddComponent },
	{ path: 'clients/:id', component: ClientDetailComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
  	exports: [RouterModule],
})
export class AppRoutingModule { }
