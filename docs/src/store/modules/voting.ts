import CurrentWeb3 from "@/models/interface/CurrentWeb3";
import Voting from "@/contracts/Voting.json";
import Network from "@/models/interface/Network";
const getDefaultState = (): CurrentWeb3 => {
	return {
		web3: null,
		isInjected: false,
		contract: "",
		networkId: "",
	};
};
const state = getDefaultState();
const getters = {
	isSameAddress: (state: CurrentWeb3)=>(addr:string): boolean => state.contract._address.toLowerCase() === addr.toLowerCase(),
	getContract: (state: CurrentWeb3): string | null =>
		state.contract ? state.contract : null,
	getNetworkId: (state: CurrentWeb3): string | null =>
		state.networkId ? state.networkId : null,
	getWeb3: (state: CurrentWeb3): any | null => (state.web3 ? state.web3 : null),
};

const actions = {
	async contractInstance({ commit }: { commit: any }) {
		const someObj: Network = Voting.networks;
		state.networkId = await state.web3.eth.net.getId();
		const deployedNetwork = someObj[state.networkId];
		const instance = new state.web3.eth.Contract(
			Voting.abi,
			deployedNetwork && deployedNetwork.address
		);
		commit("SET_CONTRACT", instance);
		return await instance.methods.owner().call();
	},
};
const mutations = {
	SET_WEB3: (state: CurrentWeb3, web3: any) =>{
		state.web3 = web3;
		localStorage.setItem('Web3', web3);
	},
	SET_CONTRACT: (state: CurrentWeb3, contract: any) => (state.contract = contract),
	RESET_VOTING(state: CurrentWeb3) {
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
