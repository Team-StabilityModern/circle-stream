<template>
  <section class="section" style="max-width: 50vw; margin: 0 auto">
    <div class="options" v-if="!changeSaved">
      <div class="field">
        <div class="label">IP 地址</div>
        <div class="field">
          <div class="control">
            <input type="text" class="input" v-model="newIPAddress" />
          </div>
        </div>
      </div>
      <div class="field">
        <div class="label">頻道名稱</div>
        <div class="field">
          <div class="control">
            <input type="text" class="input" v-model="newChannelName" />
          </div>
        </div>
      </div>
      <div class="field">
        <div class="label">暱稱</div>
        <div class="field">
          <div class="control">
            <input type="text" class="input" v-model="newName" />
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" @click="saveOptions()">選擇</button>
        </div>
      </div>
    </div>
    <MessageBox
      v-if="changeSaved"
      :sender="name"
      :channel="channelName"
      :ip="ipAddress"
    />
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import "bulma";
import { defineAsyncComponent } from "vue";

@Options({
  components: {
    MessageBox: defineAsyncComponent(
      () => import("./components/MessageBox.vue")
    ),
  },
})
export default class App extends Vue {
  newChannelName: string = "default";
  channelName: string | null = null;
  newName: string = `Client${Math.round(Math.random() * 1000)}`;
  name: string | null = null;
  newIPAddress: string = "127.0.0.1";
  ipAddress: string | null = null;

  get changeSaved() {
    return (
      this.channelName !== null && this.name !== null && this.ipAddress !== null
    );
  }

  saveOptions() {
    const prompt = confirm(
      `是否用 ${this.newName} 連線到位於 ${this.newIPAddress} 的 ${this.newChannelName} 頻道？`
    );
    if (prompt) {
      this.channelName = this.newChannelName;
      this.name = this.newName;
      this.ipAddress = this.newIPAddress;
    }
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
