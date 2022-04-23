import { WorkflowStatusChange } from './../../../types/truffle-contracts/Voting.d';
import router from "@/router";
import { createStore } from "vuex";
import auth from "./modules/auth";
import proposal from "./modules/proposal";
import session from "./modules/session";
import voter from "./modules/voter";
import voting from "./modules/voting";
import workflowStatus from './modules/workflowStatus';
export default createStore({
	actions: {
		resetAll({ commit }: { commit: any }){
			commit('RESET_AUTH')
			commit('RESET_PROPOSAL')
			commit('RESET_SESSION')
			commit('RESET_VOTING')
			commit('RESET_VOTER')
			router.push('/');
		},
	},
	modules: {
		auth,
		voting,
		session,
		proposal,
		voter,
		workflowStatus,
	},
});
