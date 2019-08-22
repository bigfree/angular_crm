import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientAddComponent } from './clients/client-add/client-add.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { ClientsComponent } from './clients/clients.component';
import { HeaderSectionComponent } from './clients/header-section/header-section.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphQLModule } from './graphql.module';
import { HeaderNavComponent } from './header-nav/header-nav.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderNavComponent,
		ClientsComponent,
		DashboardComponent,
		HeaderSectionComponent,
		ClientDetailComponent,
		ClientAddComponent,
  	],
  	imports: [
		BrowserModule,
		AppRoutingModule,
		GraphQLModule,
		HttpClientModule,
		NgbAlertModule,
		ReactiveFormsModule,
  	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
