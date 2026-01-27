import React, { useEffect, useState } from "react"; // Fixed import
import "./generalProfileSetUp.css"
import ProfileForm from "./profileForm";
import WalletForm from "./walletForm";

export default function GeneralProfileSetUp() { // Fixed: PascalCase component name
    const [currState, setCurrState] = useState(0);
    const [done, setDone] = useState(true); // Fixed: should start as false

    const states = {
        0: <h2>Set up your profile!</h2>,
        1: <ProfileForm setDone={setDone}/>,
        2: <WalletForm key="2" setDone={setDone}/> 
    }

    return(
        <div>
            {states[currState]} {/* Fixed: added curly braces */}
            <div>
                <button 
                    onClick={() => {
                        setDone(false)
                        setCurrState(currState + 1)
                    }}
                    disabled={!done || currState >= states.length - 1} // Fixed: logic and placement
                >
                    {currState === states.length - 1 ? "End" : "Next"} {/* Fixed: comparison */}
                </button>
            </div>
        </div>
    );
}