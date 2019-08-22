import { Component, OnDestroy, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';

import { AllClientsGQL, Client } from '../generated/graphql';
import { NewClientGQL } from '../generated/graphql';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit, OnDestroy {

	public clientSubscription: Subscription;
	public clientItems: Client[] = [];
	private clientQuery: QueryRef<any>;

	constructor(
		private allClientsGQL: AllClientsGQL,
		private newClientGQL: NewClientGQL,
	) {
	}

	ngOnInit() {
		this.clientQuery = this.allClientsGQL.watch({}, {
			fetchPolicy: 'network-only',
		});

		this.clientSubscription = this.clientQuery.valueChanges.subscribe(({ data }) => {
			this.clientItems = [...data.clients];
		});

		this.setupSubscription();
	}

	ngOnDestroy() {
		this.clientSubscription.unsubscribe();
	}

	setupSubscription() {
		this.clientQuery.subscribeToMore({
			document: this.newClientGQL.document,
			updateQuery: (prev, { subscriptionData }) => {
				if (!subscriptionData.data) {
					return prev;
				}

				const newClient = subscriptionData.data.clientAdded;

				return Object.assign({}, prev, {
					clients: [newClient, ...prev.clients],
				});
			},
		});
	}

}
