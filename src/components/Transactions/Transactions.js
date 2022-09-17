import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function Transactions() {
    const {transactions,isLoading, isError} = useSelector(state=>state.transaction)
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(fetchTransactions())
    }, [dispatch]);
    
    //decide what to render
    let content=null;
    if(isLoading)content = <p>loading.......</p>
    if(!isLoading && isError) content = <p className="error">there is an error occured</p>
    if(!isLoading && !isError && transactions?.length===0)content=<p>transaction no found!!!</p>
    if(!isLoading && !isError && transactions?.length>0){
        content=transactions.map(transaction=><Transaction 
            key={transaction.id} transaction={transaction}/>)
    }
    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    );
}
