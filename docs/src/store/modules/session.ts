import Voting from "@/contracts/Voting.json";
import Web3 from "web3";
import Session from "@/models/interface/Session";
import BN from "bn.js";
const getDefaultState = ():{listSession: Session[]} => {
	return{
		listSession: []
	};
};
const state = getDefaultState();
const getters = {
	getSessions : (state: {listSession: Session[]}): Session[] | null => (state.listSession.length > 0) ? state.listSession : null,
	getOneSessions : (state: {listSession: Session[]})=>(id:number): Session=> state.listSession[id],
};

const actions = {
	async callSession({ commit, getters }: { commit: any, getters: any }) {
		const lastIndex = await getters.getContract.methods.lastSession().call();
		const status = await getters.getContract.getPastEvents('WorkflowStatusChange', {fromBlock: 0,toBlock: 'latest'});
		for (let index = lastIndex; index >= 0; index--) {
			if(index != 0){
				const {startDate, startVoting, endDate} = await getters.getContract.methods.getVotingSession(index).call();
				let newState = 0;
				for(const ws of status){
					if(ws.returnValues.index == index){
						if(newState < parseInt(ws.returnValues.newStatus)){
							newState = parseInt(ws.returnValues.newStatus)
						}
					}
				}
				commit("SET_SESSION",{
					key: parseInt(index),
					startDate: new Date(parseInt(startDate)).toLocaleDateString(),
					startVoting: new Date(parseInt(startVoting)).toLocaleDateString(),
					endDate: new Date(parseInt(endDate)).toLocaleDateString(),
					status: newState,
				});
			}
		}
		return true;
	},
	async startNewSession({ commit, getters }: { commit: any, getters: any  }, session: any){
		const id = parseInt(getters.getSessions[0].key) + 1;
		const _session =  {
			startDate: new Date(session.startDate).getTime(),
			startVoting: new Date(session.startVoting).getTime(),
			endDate: new Date(session.endDate).getTime()
		}
		await getters.getContract.methods.startVoting(_session,new BN(id)).send({ from: getters.getAccount });
		const listAddress = await getters.getContract.getPastEvents('VotingStarted', {fromBlock: 0,toBlock: 'latest'});
		console.log('listAddress',listAddress)
		listAddress.map((el:any)=>{
			console.log(el.returnValues);
		})
		commit("SET_SESSION_UNSHIFT",{
			key: id,
			startDate: new Date(session.startDate).toLocaleDateString(),
			startVoting: new Date(session.startVoting).toLocaleDateString(),
			endDate: new Date(session.endDate).toLocaleDateString(),
			status: 0
		});
		return true;
	},
	async callTally({ commit, getters }: { commit: any, getters: any  }, id: number){
		const response = await getters.getContract.methods.tallyVotes(new BN(id)).send({ from: getters.getAccount });
		console.log("Tally call object", response)
		console.log('response', response);
		const newStatus = response.events.WorkflowStatusChange.returnValues.newStatus;
		console.log('newStatus', newStatus);
		if(newStatus != undefined) {
			commit('UPDATE_STATUS', {id: id, newStatus: parseInt(newStatus)});
			return true;
		}
	},
	async winnerSession({ commit, getters }: { commit: any, getters: any  }, id: number){
		const winningProposalsID = await getters.getContract.methods.getWinningProposalsID(id).call();
		const winningProposals = await getters.getContract.methods.getWinningProposals(id).call();
		console.log('winningProposalsID', winningProposalsID)
		console.log('winningProposals', winningProposals)
		if(winningProposalsID.length > 1){
			return {winningProposalID: winningProposalsID, winningProposals: winningProposals}
		}else{
			return {winningProposalID: winningProposalsID, description: winningProposals[0].description, voteCount: winningProposals[0].voteCount}
		}
	}
};
const mutations = {
	SET_SESSION: (state:{listSession: Session[]}, session: Session) => {
		if(state.listSession.length > 0){
			let exiting = false;
			for(const st of state.listSession){
				if(session.key === st.key){
					exiting = true;
				}
			}
			if(!exiting){
				state.listSession.push(session);
			}
		}else{
			state.listSession.push(session);
		}
	},
	SET_SESSION_UNSHIFT: (state:{listSession: Session[]}, session: Session) => {
		if(state.listSession.length > 0){
			let exiting = false;
			for(const st of state.listSession){
				if(session.key === st.key){
					exiting = true;
				}
			}
			if(!exiting){
				state.listSession.unshift(session);
			}
		}else{
			state.listSession.unshift(session);
		}
	},
	UPDATE_STATUS(state:{listSession: Session[]},{id, newStatus}: {id: number, newStatus: number}){
		console.log('state', state);
		console.log('newStatus', newStatus);
		console.log('id',id)
		for(const st of state.listSession){
			if(id === st.key){
				st.status = newStatus;
			}
		}
	},
	RESET_SESSION(state:{listSession: Session[]}) {
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
