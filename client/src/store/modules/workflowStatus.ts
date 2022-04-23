import Voting from "@/contracts/Voting.json";
import Web3 from "web3";
import Proposal from "@/models/interface/Proposal";
const getDefaultState = (): any => {
	return {
		0:'RegisteringVoters',
		1:'ProposalsRegistrationStarted',
		2:'ProposalsRegistrationEnded',
		3:'VotingSessionStarted',
		4:'VotingSessionEnded',
		5:'VotesTallied'
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
