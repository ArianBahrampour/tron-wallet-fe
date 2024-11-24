import React, { useEffect } from "react";
import ApiKeyForm from "../components/ApiKeyForm";
import WalletDetails from "../components/WalletDetails";
import WithdrawalForm from "../components/WithdrawalForm";

const Dashboard: React.FC = () => {
    const [apiKey, setApiKey] = React.useState<string>(localStorage.getItem("apiKey") || "");

    return (
        <div>
            <ApiKeyForm setApiKey={setApiKey} apiKey={apiKey} />
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
