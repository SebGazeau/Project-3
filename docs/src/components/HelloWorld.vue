<template>
	<div>
		<div class="hello">
			<h1>{{ msg }}</h1>
		</div>
		<div>
			<p>You can participate in a voting session by sending your eth address by email to the administrator!</p>
		</div>
		<div>
			<img class="w-50" src="../../public/img/Role-of-blockchain-in-voting.gif" alt="">
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapGetters } from "vuex";

@Options({
	computed: mapGetters(["getResponseLot"]),
	props: {
		msg: String,
	},
})
export default class HelloWorld extends Vue {
	msg!: string;
	// async getStatusWorkFlow(){
	//   await contract.methods.set(5).send({ from: accounts[0] });
	// }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
