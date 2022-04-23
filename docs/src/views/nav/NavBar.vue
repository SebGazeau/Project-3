<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark" :key="forReRender">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">Voting</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
				<ul class="navbar-nav mb-2 mb-lg-0">
					<li class="nav-item" v-if="$store.getters.getAccount">
						<button class="btn btn-outline-warning" disabled>{{$store.getters.getAccount}}</button>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" aria-current="page" :to="'/'">Home</router-link>
					</li>
					<li class="nav-item" v-if="isLog && isOwner">
						<router-link class="nav-link" :to="'/admin/session'">Admin</router-link>
					</li>
					<li class="nav-item" v-if="isLog && !isOwner">
						<router-link class="nav-link" :to="'/voting/session'">Voter</router-link>
					</li>
					<li class="nav-item">
						<ButtonLogin :msg="logText" @click="login"/>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters } from "vuex";
import ButtonLogin from "@/components/auth/ButtonLogin.vue"
import router from "@/router";
@Options({
	components: {
		ButtonLogin,
	},
	methods: mapActions(["connect"]),
	computed: mapGetters(['getIsLog', 'getIsOwner']),
})
export default class NavBar extends Vue {
	connect!: () => Promise<boolean>;
	getIsLog!: boolean;
	getIsOwner!: boolean;
	forReRender = 0;
	get isOwner(): boolean {
		return this.getIsOwner;
	}
	get isLog(): boolean {
		return this.getIsLog
	}
	get logText(){
		return this.getIsLog ? 'Connected' : 'Connexion';
	}
	async login(){
		if(!this.$store.getters.getIsLog){
			const res = await this.connect();
			if(res){
				this.uptView();
			}
		}
	}
	mounted(){
		if(this.isLog){
			this.uptView();
		}
	}
	uptView(){
		this.forReRender++;
	}
}
</script>
