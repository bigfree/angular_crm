import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const uriHttp = 'http://localhost:8000/graphql';
const uriWS = 'ws://localhost:8000/graphql';

export function createApollo(httpLink: HttpLink) {

	const http = httpLink.create({
		uri: uriHttp
	});

	const ws = new WebSocketLink({
		uri: uriWS,
		options: {
			reconnect: true
		}
	});

	const link = split(
		({ query }) => {
			const { kind, operation } = getMainDefinition(query);
			// console.log({ query, kind, operation });
			return kind === 'OperationDefinition' && operation === 'subscription';
		},
		ws,
		http
	);

	return {
		link,
		cache: new InMemoryCache(),
	};
}

@NgModule({
	exports: [ApolloModule, HttpLinkModule],
	providers: [
		{
			provide: APOLLO_OPTIONS,
			useFactory: createApollo,
			deps: [HttpLink],
		},
	],
})
export class GraphQLModule {}
