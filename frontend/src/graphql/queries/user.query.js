import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
	query GetAuthenticatedUser {
		authUser {
			_id
			username
			name
			profilePicture
		}
	}
`;

export const GET_USER_AND_TRANSACTIONS = gql`
	query GetUserAndTransactions($userId: ID!) {
		user(userId: $userId) {
			_id
			name
			username
			profilePicture
			# relationships(FOR this we have added transaactions  in user.typedef in type User)
			# and in user resolver we have added  our own type "transactions"with the help of
			# this 3 together we are able to get transactions(of loged in user) and user detail in one graphql request
			#transactions here is a another graph first fetch user then fetch transactions
			transactions {
				_id
				description
				paymentType
				category
				amount
				location
				date
			}
		}
	}
`;
