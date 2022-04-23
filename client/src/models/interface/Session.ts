export default interface Session {
	key: number;
	startDate: Date | null;
	startVoting: Date | null;
	endDate: Date | null;
	status: number,
}
