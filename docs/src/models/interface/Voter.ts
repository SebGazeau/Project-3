import BN from "bn.js";

export default interface Voter {
	address: string,
	isRegistered: boolean,
	hasVoted: boolean,
	votedProposalId: number | BN,
}
