import { useSelector } from "react-redux";
import AuthenticatedLayout from "../components/AuthenticatedLayout";
import { useGetTransactionHistoryQuery } from "../utils/services/transaction";
import TransactionCard from "../components/TransactionCard";
import { useState, useEffect } from "react";

const Transaction = () => {
    const user = useSelector((state) => state.user.data);
    const [limit] = useState(5)
    const [offset, setOffset] = useState(0)
    const [transactions, setTransactions] = useState([])
    const { data, error, isLoading, refetch } = useGetTransactionHistoryQuery({
        offset,
        limit,
    })

    useEffect(() => {
        if (data?.data?.records) {
            setTransactions((prevTransactions) => [
                ...prevTransactions,
                ...data.data.records,
            ])
        }
    }, [data])

    if (isLoading && offset === 0) return <div>Loading...</div>
    if (error) return <div>Error loading transaction history.</div>

    return (
        <AuthenticatedLayout
            users={user}
            balance={user.balance}
        >
            <div className="flex flex-col px-20 mt-10">
                <p className="mb-4 text-lg font-semibold">Semua Transaksi</p>
                {transactions.map((record) => (
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
                        setOffset((prevOffset) => prevOffset + limit)
                        refetch()
                    }}
                >
                    Show More
                </span>
            </div>
        </AuthenticatedLayout>
    );
};

export default Transaction;
