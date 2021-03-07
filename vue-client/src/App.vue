<template>
  <section class="section" style="max-width: 50vw; margin: 0 auto">
    <Configure v-if="!changeSaved" @saved="changeSavedEvent" />
    <MessageBox
      v-if="changeSaved"
      :channel="channel"
      :name="name"
      :ipAddress="ipAddress"
    />
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { defineAsyncComponent } from "vue";
import Configure from "@/components/Configure.vue";
import "bulma";

@Options({
  components: {
    Configure,
    MessageBox: defineAsyncComponent(
      () => import("./components/MessageBox.vue")
    ),
  },
})
export default class App extends Vue {
  ipAddress: string | null = null;
  channel: string | null = null;
  name: string | null = null;
  changeSaved: boolean = false;

  changeSavedEvent(ipAddress: string, channel: string, name: string) {
    this.ipAddress = ipAddress;
    this.channel = channel;
    this.name = name;
    this.changeSaved = true;
  }
}
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
