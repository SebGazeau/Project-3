import Voting from "@/contracts/Voting.json";
import Web3 from "web3";
import Proposal from "@/models/interface/Proposal";
const getDefaultState = (): any => {
	return {
		0:'Registering Voters',
		1:'Proposals Registration Started',
		2:'Proposals Registration Ended',
		3:'Voting Session Started',
		4:'Voting Session Ended',
		5:'Votes Tallied'
	};
};
const state = getDefaultState();
const getters = {
	getWorkflowStatus : (state: any) => (key: number) => state[key],
};

const actions = {
	async changeStatusSession({ commit, getters }: { commit: any, getters: any }, idSession: number) {
		console.log('idSession', idSession);
		const response = await getters.getContract.methods.nextWorkflowStatus(idSession).send({ from: getters.getAccount });
		console.log('response', response);
		const newStatus = response.events.WorkflowStatusChange.returnValues.newStatus;
		console.log('newStatus', newStatus);
		if(newStatus != undefined) {
			commit('UPDATE_STATUS', {id: idSession, newStatus: parseInt(newStatus)});
			return true;
		}
		return false;
	},
};
const mutations = {
};

export default {
	// namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
