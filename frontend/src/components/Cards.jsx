import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER, GET_USER_AND_TRANSACTIONS } from "../graphql/queries/user.query";

const Cards = () => {
	// fetching all transactions for a logged in user
	const{data,loading ,error}=useQuery(GET_TRANSACTIONS);

	const{data:authUserData}=useQuery(GET_AUTHENTICATED_USER)
	const{data:userAndTransactions}=useQuery(GET_USER_AND_TRANSACTIONS ,
		{
			variables:{
				userId:authUserData?.authUser?._id ,
			} ,
		}
	);
	console.log("user and transactions" , userAndTransactions)

	// if(error)
	// 	{
	// 		return <p> Error</p>
	// 	}
	// 	if(loading)
	// 		{
	// 			return <p>Loading...</p>
	// 		}
			console.log("Transaction data" ,data);
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{!loading&& data.transactions.map(transaction=>(
					<Card key={transaction.id } transaction={transaction}/>
				))}
				{/* <Card cardType={"saving"} />
				<Card cardType={"expense"} />
				<Card cardType={"investment"} />
				<Card cardType={"investment"} />
				<Card cardType={"saving"} />
				<Card cardType={"expense"} /> */}
			</div>
			{!loading && data?.transactions?.length === 0 && (
				<p className='text-2xl font-bold text-center w-full'>No transaction history found.</p>
			)}
		</div>
	);
};
export default Cards;