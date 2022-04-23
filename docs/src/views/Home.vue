<template>
	<div class="home">
		<!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
		<HelloWorld msg="Welcome to Voting Project in Solidity" />
		<!-- <div v-for="(session,key) of sessionInProgress" :key="key">{{session}}</div> -->
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Session from "@/models/interface/Session";

@Options({
	components: {
		HelloWorld,
	},
})
export default class Home extends Vue {
	// today = new Date().getTime();
	// get sessionInProgress(){
	// 	const sessions: Session[] = [];
	// 	for (const session of this.$store.getters.getSessions){
	// 		// const dateSession = new Date(session.startDate).getTime();
	// 		console.log('today', this.today)
	// 		// console.log(dateSession)
	// 		// console.log(session);
	// 		// if(session <= this.today){
	// 		// 	sessions.push(session);
	// 		// }
	// 	}
	// 	return sessions
	// }
}
</script>
