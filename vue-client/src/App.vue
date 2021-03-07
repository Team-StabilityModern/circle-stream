<template>
  <section class="section">
    <div class="field">
      <div class="control">
        <input type="text" class="input" v-model="channelName" />
      </div>
    </div>
    <MessageBox :sender="this.sender" ip="127.0.0.1" :channel="channelName" />
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import MessageBox from "./components/MessageBox.vue";
import "bulma";

@Options({
  components: {
    MessageBox,
  },
})
export default class App extends Vue {
  sender: string = `Client${Math.round(Math.random() * 1000)}`;
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
