import Voting from "@/contracts/Voting.json";
import Web3 from "web3";
import Proposal from "@/models/interface/Proposal";
import BN from "bn.js";
import Voter from "@/models/interface/Voter";
const getDefaultState = ():{listProposals: Proposal[]} => {
	return {
		listProposals:[]
	};
};
const state = getDefaultState();
const getters = {
	getProposals : (state:{listProposals: Proposal[]}): Proposal[] | null => (state.listProposals.length > 0) ? state.listProposals : null,
};

const actions = {
	async callProposals({ commit, getters }: { commit: any, getters: any }, idSession: number) {
		commit('RESET_PROPOSAL')
		const proposals = await getters.getContract.methods.getAllProposal(idSession).call();
		console.log('proposals',proposals);
		for (const proposal of proposals) {
			if(proposal.description != ''){
				commit("SET_PROPOSAL",{key:idSession, description:proposal.description,voteCount: parseInt(proposal.voteCount)});
			}
		}
	},
	async addProposal({ commit, getters }: { commit: any, getters: any }, {proposal, id}: {proposal: string, id: number}) {
		const object = await getters.getContract.methods.setProposal(new BN(id), proposal).send({ from: getters.getAccount });
		console.log('object', object);
		if(object.events.ProposalRegistered.returnValues.proposalSender.toLowerCase() === getters.getAccount.toLowerCase()){
			return true;
		}
	},
	async setVoted({ commit, getters }: { commit: any, getters: any },{vote, id}: {vote: number, id: number}){
		const object = await getters.getContract.methods.setVoted(new BN(id), vote).send({ from: getters.getAccount });
		console.log('object', object);
		if(object.events.Voted.returnValues.voter.toLowerCase() === getters.getAccount.toLowerCase()){
			// const voter: Voter = getters.getInfoVoter;
			// voter.hasVoted = true;
			commit('SET_PROPERTY_HAS_VOTED', {idSession: id, property: true});
			return true;
		}
	}
};
const mutations = {
	SET_PROPOSAL: (state:{listProposals: Proposal[]}, proposal: Proposal) => {
		console.log('SET_PROPOSAL')
		console.log('SET_PROPOSAL', proposal)
		// if(state.listProposals.length > 0){
		// 	let exiting = false;
		// 	for(const st of state.listProposals){
		// 		if(proposal.key === st.key){
		// 			exiting = true;
		// 		}
		// 	}
		// 	if(!exiting){
		// 		state.listProposals.push(proposal);
		// 	}
		// }else{
		// }
		state.listProposals.push(proposal);
	},
	RESET_PROPOSAL(state: Proposal[]) {
		Object.assign(state, getDefaultState());
	},
};

export default {
	// namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
