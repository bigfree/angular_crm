import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Client, GetClientGQL } from '../../generated/graphql';

@Component({
	selector: 'app-client-detail',
	templateUrl: './client-detail.component.html',
	styleUrls: ['./client-detail.component.scss'],
})
export class ClientDetailComponent implements OnInit {

	private taskID: any;
	public client: Observable<Client>;
	public clientJSON: Client;

	constructor(
		private route: ActivatedRoute,
		private getClientGQL: GetClientGQL,
	) { }

	ngOnInit() {
		this.route.params.subscribe((params) => this.taskID = params.id);

		this.client = this.getClientGQL.fetch({ id: this.taskID }).pipe(
			map(({ data }) => data.client),
		);

		this.client.subscribe((res) => {
			this.clientJSON = res;
		});
	}
}
