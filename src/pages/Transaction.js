import { useSelector } from "react-redux";
import AuthenticatedLayout from "../components/AuthenticatedLayout";
import { useGetTransactionHistoryQuery } from "../utils/services/transaction";
import TransactionCard from "../components/TransactionCard";
import { useState } from "react";

const Transaction = () => {
    const user = useSelector((state) => state.user.data)
    const [limit, setLimit] = useState(5)
    const { data, error, isLoading, refetch } = useGetTransactionHistoryQuery({
        offset: 0,  
        limit,
    })
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading transaction history.</div>;

    return ( 
        <AuthenticatedLayout
            users={user}
            balance={user.balance}
        >
            <div className="flex flex-col px-20 mt-10">
                <p className="mb-4 text-lg font-semibold">Semua Transaksi</p>
                {data.data.records.map((record) => (
                    <TransactionCard 
                        type={record.transaction_type}
                        description={record.description}
                        amount={record.total_amount}
                        created={record.created_on}
                    />
                ))}
                <span 
                    className="text-center w-full py-5 nav-link"
                    onClick={() => {
                        setLimit(limit + 5)
                        refetch()
                        console.log(limit)
                    }}
                >
                    Show More
                </span>
            </div>
        </AuthenticatedLayout>
    );
}
 
export default Transaction;