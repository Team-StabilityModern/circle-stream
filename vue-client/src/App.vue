<template>
  <section class="section" style="max-width: 50vw; margin: 0 auto">
    <div class="field" v-if="channelName === null">
      <div class="label">頻道名稱</div>
      <div class="field is-grouped">
        <div class="control">
          <input type="text" class="input" v-model="newChannelName" />
        </div>
        <div class="control">
          <button class="button is-primary" @click="applyChannelName()">
            選擇
          </button>
        </div>
      </div>
    </div>
    <MessageBox
      v-if="channelName !== null"
      :sender="this.sender"
      ip="127.0.0.1"
      :channel="channelName"
    />
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
  newChannelName: string = "default";
  channelName: string | null = null;

  applyChannelName() {
    const prompt = confirm(`是否連線到 ${this.newChannelName} 頻道？`);
    if (prompt) this.channelName = this.newChannelName;
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
