import React from 'react';
import { BlurText } from '../blurText';
import './profileInfo.css';

export default function ProfileInfo({ userData, walletData }) {
    const [index, setIndex] = React.useState(0);
    
    const isLoaded = walletData && walletData[index];
    const wallet = isLoaded ? walletData[index] : {};

    return (
        <div className="structure">
            <div className="column">
                <h2>Profile Information</h2>
                <div className="row">
                    <p><strong>Username:</strong> <div className="profileInfo">{userData.username}</div></p>
                    <p><strong>First Name:</strong> <div className="profileInfo name">{userData.first_name}</div></p>
                    <p><strong>Last Name:</strong> <div className="profileInfo name">{userData.last_name}</div></p>
                </div>
                
                <div className="details">
                    <div>
                        <h2>Wallet Information</h2>
                        <div>
                            <select 
                                value={index} 
                                onChange={(e) => setIndex(Number(e.target.value))}
                                className='selectWallet'
                            >
                                {walletData && walletData.map((w, idx) => (
                                    <option key={w.id} value={idx} className='walletOption'>
                                        {w.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className='row'>
                            <div>
                                <strong>Wallet Balance: </strong> 

                                <div className="balance">
                                    <BlurText 
                                        isLoading={!isLoaded}
                                        value={`${wallet.balance} ${wallet.coin}`}
                                        placeholder="0000.00 USD"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <p>
                                    <strong>All time expenses: </strong>
                                    
                                    <div className="otherValues">
                                        <BlurText 
                                            isLoading={!isLoaded}
                                            value={`${wallet.alltimeExpenses} ${wallet.coin}`}
                                            placeholder="000.00 USD"
                                        />
                                    </div>
                                </p>
                                <p>
                                    <strong>All time income: </strong> 
                                    <div className="otherValues">
                                        <BlurText 
                                            isLoading={!isLoaded}
                                            value={`${wallet.alltimeIncome} ${wallet.coin}`}
                                            placeholder="000.00 USD"
                                        />
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}