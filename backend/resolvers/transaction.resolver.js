import Transaction from "../models/transaction.model.js"

const transactionResolver={
    Query:{
        transactions:async(_,__,context)=>{
            try {
                if(!context.getUser()) throw new Error("Unauthorized user")
                const userId=await context.getUser()._id
            const transactions=await Transaction.find({userId:userId})  ;
            console.log("Transactions",transactions);
            return transactions;            
            } catch (error) {
                console.log("Error in getting transacions" , error);

                
                throw new Error(error.message ||"error getting transactions")
                
            }
        },
        transaction:async(_,{transactionId},)=>{
            try {
                const transacion=await Transaction.findById(transactionId);
                return transacion;
                
            } catch (error) {
                console.log("Error in getting transacion" , error);

                
                throw new Error(error.message ||"error getting transaction")

                
            }
        }
    },
    Mutation:{
        createTransaction:async(_,{input} ,context )=>{

            try {
                const newTransaction =new Transaction({
                    ...input, 
                    userId:context.getUser().id
                })
                await newTransaction.save();
                return newTransaction;
                
            } catch (error) {
                   console.log("Error while doing transaction " , error);
                    throw new Error(error.message ||"Internal Serval Error")
                
            }
        }
        ,
        updateTransaction:async(_,{input})=>{
            try {
                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input ,{new:true});
                return updatedTransaction;
            } catch (error) {
                
                console.log("Error while updating  transaction " , error);
                throw new Error(error.message ||"Internal Serval Error")
            
                
            }
        },

        deleteTransaction:async(_,{transactionId })=>{
            try {
                const deletedTransaction =await Transaction.findByIdAndDelete(transactionId);
                return deletedTransaction;
                
            } catch (error) {
                console.log("Error while deleting   transaction " , error);
                throw new Error(error.message ||"Internal Serval Error")
                
            }
        },

    }
}
export default transactionResolver;