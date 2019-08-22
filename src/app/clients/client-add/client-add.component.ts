import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AddClientGQL, ClientResponseMutation } from '../../generated/graphql';

@Component({
	selector: 'app-client-add',
	templateUrl: './client-add.component.html',
	styleUrls: ['./client-add.component.scss'],
})
export class ClientAddComponent implements OnInit {

	public response: ClientResponseMutation;
	public addClientForm = this.fb.group({
		name: ['', Validators.required],
		description: [''],
		company: [''],
		street: [''],
		city: [''],
		psc: [''],
		country: [''],
		ico: [''],
		dic: [''],
		icdph: [''],
		post_company: [''],
		post_street: [''],
		post_city: [''],
		post_psc: [''],
		post_country: [''],
	});

	constructor(
		private addClientGQL: AddClientGQL,
		private fb: FormBuilder,
	) { }

	ngOnInit() {
	}

	onSubmit() {
		console.log(this.addClientForm.value);
		this.addClientGQL
			.mutate({ input: this.addClientForm.value })
			.subscribe(({data}) => {
				this.response = data.addClient;
			});
	}

}
