import Voter from "./Voter";

export default interface User {
	accounts: string[];
	isLoggedIn: boolean;
	isOwner: boolean;
	isRegistered: Property[],
	hasVoted: Property[],
	votedProposalId: Property[],
}
type Property = {
	idSession: number;
	property: boolean | number;
}
