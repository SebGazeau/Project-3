<template>
	<div :key="forReRender">
		<StartSession @addSession="uptView"/>
		<div class="row row-cols-1 row-cols-md-3 g-4">
			<div class="col" v-for="(session, _key) in sessions" :key="_key">
				<CardSession v-bind:id="parseInt(session.key)"
							v-bind:startDate="session.startDate"
							v-bind:startVoting="session.startVoting"
							v-bind:endDate="session.endDate"
							v-bind:status="session.status"
							@updateSession="uptView"/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters } from "vuex";
import CardSession from "@/components/session/CardSession.vue";
import router from "@/router";
import StartSession from "@/components/session/StartSession.vue";
@Options({
	components: {
		CardSession,
		StartSession,
	},
	methods: mapActions(["callSession"]),
	computed: mapGetters(['getSessions',]),
})
export default class ViewSession extends Vue {
	callSession!: () => void;
	forReRender = 0;
	arraySessions: any[]= [];
	get sessions(){
		return this.$store.getters.getSessions
	}
	arraySession(){
		this.callSession();
	}
	created(){
		this.arraySession();
	}
	uptView(){
		this.forReRender++;
	}
}
</script>
