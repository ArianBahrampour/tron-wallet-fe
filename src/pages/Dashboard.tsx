import React from "react";
import ApiKeyForm from "../components/ApiKeyForm";
import WalletDetails from "../components/WalletDetails";
import WithdrawalForm from "../components/WithdrawalForm";

const Dashboard: React.FC = () => {
    const apiKey = localStorage.getItem("apiKey");

    return (
        <div>
            <ApiKeyForm />
            {apiKey && (
                <>
                    <WalletDetails />
                    <WithdrawalForm />
                </>
            )}
        </div>
    );
};

export default Dashboard;
