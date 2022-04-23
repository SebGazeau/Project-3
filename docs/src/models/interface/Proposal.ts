import BN from "bn.js";

export default interface Proposal {
	key: number,
	description: string,
	voteCount: number | BN,
}
