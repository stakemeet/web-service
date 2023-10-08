import { ethers } from "ethers";

import contractData from "../internal/smart-contracts/assets/StakeMeet_ABI.json"

export async function createMeetContract(stake, attendeesEmail, address) {
    // Get accounts
    console.log("!!!")
    const signer = new ethers.VoidSigner(address);

    // Instantiate StakeMeet contract
    const contractAddress = process.env.STAKEMEET_CONTRACT_ADDRESS ?? "";
    const stakeMeet_contract = await new ethers.Contract(contractData.abi, contractAddress, signer);
    
    // Create meet
    const date = Date.now();
    const _addHours = 3600 * 2;
    const _meetDate = date + _addHours;
    const _attendeesEmail = [attendeesEmail];
    const _minStake = ethers.parseEther(stake);

    let tx = await stakeMeet_contract.createMeet(_meetDate, _attendeesEmail, { value: _minStake });
    await tx.wait();

    // Check meet index
    const _meetIndex = await stakeMeet_contract.meetIndex();

    if(_meetIndex > 0) {
        return 1
    }
    else {
        throw console.error("-- Meet has not been created")
    }
}
