import React from "react";
import './walletWidget.css'

export default function WalletWidget({ walletInfo, selectedWallet, changeSelectedWallet }) {
    return(
        <button
            onClick={() => changeSelectedWallet(walletInfo.id)}
            className={`walletButton ${walletInfo.id == selectedWallet ? 'selected' : ''}`}
        >
            <p className="name">
                {walletInfo.name}
            </p>
            <p className="balance">
                {`${walletInfo.balance} ${walletInfo.coin}`}
            </p>
        </button>
    );
}