<template>
	<div>
		<NavBar />
		<router-view />
	</div>
</template>
<script lang="ts">
import getWeb3 from "./getWeb3";
import Voting from "./contracts/Voting.json";
import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";
import Home from "./views/Home.vue";
import NavBar from "./views/nav/NavBar.vue";
@Options({
	components: {
		NavBar,
	},
})
export default class App extends Vue {}
</script>
<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
