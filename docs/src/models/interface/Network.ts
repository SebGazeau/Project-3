export default interface Network {
  [key: string]: {
    events: any;
    links: any;
    address: string;
    transactionHash: string;
  };
}
