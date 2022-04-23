import Voting from "@/contracts/Voting.json";
import Web3 from "web3";
import Voter from "@/models/interface/Voter";
import BN from "bn.js";
const getDefaultState = (): {listVoter:Voter[]} => {
	return {
		listVoter:[],
	};
};
const state = getDefaultState();
const getters = {
	getListVoters : (state: {listVoter:Voter[]}): Voter[] | null => (state.listVoter.length > 0) ? state.listVoter : null,
};

const actions = {
	async addVoter({ commit, getters }: { commit: any, getters: any }, {addrVoter, id}: {addrVoter: string, id: number}) {
		const response = await getters.getContract.methods.voterRegistered(addrVoter, new BN(id)).send({ from: getters.getAccount });
		if(response.events.VoterRegistered.returnValues.voterAddress === addrVoter) {
			const {isRegistered, hasVoted, votedProposalId} = await getters.getContract.methods.getVoter(addrVoter,id).call();
			commit('SET_VOTER', {address: addrVoter, isRegistered: isRegistered,hasVoted:hasVoted ,votedProposalId: parseInt(votedProposalId)})
			return true;
		}
		return false;
	},
	async addVoters({ commit, getters }: { commit: any, getters: any }, {addrVoter, id}: {addrVoter: string[], id: number}) {
		const response = await getters.getContract.methods.votersRegistered(addrVoter, new BN(id)).send({ from: getters.getAccount });
		if(JSON.stringify(response.events.VotersRegistered.returnValues.votersAddress) === JSON.stringify(addrVoter)) {
			for(const add of addrVoter){
				const {isRegistered, hasVoted, votedProposalId} = await getters.getContract.methods.getVoter(add,id).call();
				commit('SET_VOTER', {address: add, isRegistered: isRegistered,hasVoted:hasVoted ,votedProposalId: parseInt(votedProposalId)})
			}
			return true;
		}
		return false;
	},
	async excludedVoter({ commit, getters }: { commit: any, getters: any }, {addrVoter, id}: {addrVoter: string, id: number}) {
		console.log('callSession', getters.getContract);
		console.log('addrVoter', addrVoter);
		console.log('id', id);
		await getters.getContract.methods.voterExcluded(addrVoter, new BN(id)).send({ from: getters.getAccount });
		const listAddress = await getters.getContract.getPastEvents('VoterExcluded', {fromBlock: 0,toBlock: 'latest'});
		console.log('listAddress',listAddress)
		listAddress.map((el:any)=>{
			console.log(el.returnValues);
		})
		return true;
	},
	async excludedVoters({ commit, getters }: { commit: any, getters: any }, {addrVoter, id}: {addrVoter: string[], id: number}) {
		console.log('callSession', getters.getContract);
		console.log('addrVoter', addrVoter);
		console.log('id', id);
		await getters.getContract.methods.votersExcluded(addrVoter, new BN(id)).send({ from: getters.getAccount });
		const listAddress = await getters.getContract.getPastEvents('VotersExcluded', {fromBlock: 0,toBlock: 'latest'});
		console.log('listAddress',listAddress)
		listAddress.map((el:any)=>{
			console.log(el.returnValues);
		})
		return true;
	},
	async findVoters({ commit, getters }: { commit: any, getters: any }, id: number) {
		commit('RESET_VOTER')
		const listAddress = await getters.getContract.getPastEvents('VoterRegistered', {fromBlock: 0,toBlock: 'latest'});
		const listAddressArray = await getters.getContract.getPastEvents('VotersRegistered', {fromBlock: 0,toBlock: 'latest'});
		console.log('listAddress',listAddress)
		console.log('listAddressArray',listAddressArray)
		let arrayAddrVoter: string[] = [];
		listAddress.map((el:any)=>{
			if(el.returnValues.index == id){
				arrayAddrVoter.push(el.returnValues.voterAddress)
			}
		});
		listAddressArray.map((el:any)=>{
			if(el.returnValues.index == id){
				arrayAddrVoter = arrayAddrVoter.concat(el.returnValues.votersAddress)
			}
		});
		console.log(arrayAddrVoter)
		console.log('out if', state)
		if(arrayAddrVoter.length > 0){
			console.log('in if', state )
			for(const address of arrayAddrVoter){
				const {isRegistered, hasVoted, votedProposalId} = await getters.getContract.methods.getVoter(address,id).call();
				commit('SET_VOTER', {address: address, isRegistered: isRegistered,hasVoted:hasVoted ,votedProposalId: parseInt(votedProposalId)})
			}
		}
	}
};
const mutations = {
	SET_VOTER: (state: {listVoter:Voter[]}, voter: Voter) => {
		console.log('SET_VOTER')
		if(state.listVoter.length > 0){
			let exiting = false;
			for(const st of state.listVoter){
				if(voter.address === st.address){
					exiting = true;
				}
			}
			if(!exiting){
				state.listVoter.push(voter);
			}
		}else{
			state.listVoter.push(voter);
		}
	},
	RESET_VOTER(state: Voter[]) {
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
