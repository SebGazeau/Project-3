import User from "@/models/interface/User";
import Voter from "@/models/interface/Voter";
import BN from "bn.js";
import Web3 from "web3";
const getDefaultState = (): User => {
	return {
		accounts: [],
		isLoggedIn: false,
		isOwner: false,
		isRegistered: [],
		hasVoted: [],
		votedProposalId: [],

	}
}
const state = getDefaultState();
const getters = {
	getAccount : (state: User): string | null => (state.accounts.length > 0) ? state.accounts[0] : null,
	getIsLog : (state: User): boolean => state.isLoggedIn,
	getIsOwner : (state: User): boolean => state.isOwner,
	getInfoVoter : (state: User): User => state,
}

const actions = {
	async connect({commit, dispatch}:{commit: any, dispatch: any}){
		let _web3: any;
		if (window.ethereum) {
			_web3 = new Web3(window.ethereum);
			const response = await window.ethereum.request({method:'eth_requestAccounts'});
			commit('SET_ACCOUNTS',response);
		} else if (window.web3) {
			_web3 = window.web3;
		} else {
			const provider = new Web3.providers.HttpProvider(
				"http://127.0.0.1:8545"
			);
			_web3 = new Web3(provider);
			console.log("No web3 instance injected, using Local web3.");
		}
		commit('SET_WEB3', _web3);
		const response2 = await dispatch('contractInstance');
		const owner: string = response2.toLowerCase();
		if(owner === state.accounts[0]){
			commit('SET_OWNER', true)
		}
		return true;
	},
	async canMakeProposal({commit, getters}:{commit: any, getters: any}, idSession: number){
		const listProposalRegistered = await getters.getContract.getPastEvents('ProposalRegistered', {fromBlock: 0,toBlock: 'latest'});
		const registered = listProposalRegistered.find((p: any) =>
			p.returnValues.proposalSender.toLowerCase() === state.accounts[0].toLowerCase() &&
			parseInt(p.returnValues.index) === idSession
		);
		const hasProposal = registered ? true : false;
		const voter = getters.getInfoVoter;
		const isRegistered = voter.isRegistered.find((el:any) => el.isSession === idSession);
		return {isRegistered: voter.isRegistered.property, hasProposal,};
	},
	async getOneVoter({commit, getters}:{commit: any, getters: any}, idSession: number){
		for(const session of getters.getSessions){
			const {isRegistered, hasVoted, votedProposalId} = await getters.getContract.methods.getVoter(state.accounts[0], new BN(session.key)).call();
			commit('SET_PROPERTY_IS_REGISTERED',{idSession: session.key, property:isRegistered});
			commit('SET_PROPERTY_HAS_VOTED',{idSession: session.key, property:hasVoted});
			commit('SET_PROPERTY_VOTED_PROPOSAL_ID',{idSession: session.key,property: parseInt(votedProposalId)});
		}
		return true;
	},
}
const mutations = {
	SET_ACCOUNTS: (state: User, accounts: string[]) => {
		state.accounts = accounts
		state.isLoggedIn = true;
	},
	SET_OWNER: (state: User, owner: boolean) => state.isOwner = owner,
	SET_PROPERTY_IS_REGISTERED: (state: User,{idSession, property}: {idSession: number;property: boolean;}) => {
		if(state.isRegistered.length > 0){
			let exiting = false;
			for(const st of state.isRegistered){
				if(idSession === st.idSession){
					exiting = true;
				}
			}
			if(!exiting){
				state.isRegistered.push({idSession, property});
			}
		}else{
			state.isRegistered.push({idSession, property})
		}
	},
	SET_PROPERTY_HAS_VOTED : (state: User,{idSession, property}: {idSession: number;property: boolean;}) => {
		console.log('{idSession, property}',{idSession, property})
		if(state.hasVoted.length > 0){
			let exiting = false;
			for(const st of state.hasVoted){
				if(idSession === st.idSession){
					exiting = true;
					Object.assign(st, {idSession, property});
				}
			}
			if(!exiting){
				state.hasVoted.push({idSession, property});
			}
		}else{
			state.hasVoted.push({idSession, property})
		}
	},
	SET_PROPERTY_VOTED_PROPOSAL_ID : (state: User,{idSession, property}: {idSession: number;property: number;}) => {
		if(state.votedProposalId.length > 0){
			let exiting = false;
			for(const st of state.votedProposalId){
				if(idSession === st.idSession){
					exiting = true;
				}
			}
			if(!exiting){
				state.votedProposalId.push({idSession, property});
			}
		}else{
			state.votedProposalId.push({idSession, property})
		}
	},
	// UPDATE_THIS_VOTER : (state: User, voter: Voter) => state.voter = voter,
	RESET_AUTH(state: User[]) {
		Object.assign(state, getDefaultState());
	},
}

export default {
	state,
	getters,
	actions,
	mutations
}
