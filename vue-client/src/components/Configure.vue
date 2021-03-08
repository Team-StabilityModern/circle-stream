<template>
  <div class="container options">
    <div class="field">
      <div class="label">IP 地址</div>
      <div class="field">
        <div class="control">
          <input type="text" class="input" v-model="ipAddress" />
        </div>
      </div>
    </div>
    <div class="field">
      <div class="label">頻道名稱</div>
      <div class="field">
        <div class="control">
          <input type="text" class="input" v-model="channel" />
        </div>
      </div>
    </div>
    <div class="field">
      <div class="label">暱稱</div>
      <div class="field">
        <div class="control">
          <input type="text" class="input" v-model="name" />
        </div>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-primary" @click="saveOptions()">選擇</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  emits: {
    saved: (ipAddress: string, channel: string, name: string) => {
      if (ipAddress.length <= 0) {
        alert("IP 地址必須長於一個字元。");
      } else if (channel.length <= 0) {
        alert("頻道名稱必須長於一個字元。");
      } else if (name.length <= 0) {
        alert("暱稱必須長於一個字元。");
      } else {
        return true;
      }

      return false;
    },
  },
})
export default class Configure extends Vue {
  ipAddress: string = "127.0.0.1";
  channel: string = "default";
  name: string = `User${Math.round(Math.random() * 100000)}`;

  saveOptions() {
    const prompt = confirm(
      `是否用 ${this.name} 連線到位於 ${this.ipAddress} 的 ${this.channel} 頻道？`
    );
    if (prompt) this.$emit("saved", this.ipAddress, this.channel, this.name);
  }
}
</script>
