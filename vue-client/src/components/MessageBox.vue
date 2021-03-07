<template>
  <div class="container" style="max-width: 50vw; margin: 0 auto;">
    <div class="container">
      <div class="message-box" style="white-space: pre-line;" ref="messageBox">
        {{ messageReceived }}
      </div>
    </div>
    <div class="container">
      <p>IP: {{ ip }}</p>
      <p>As: {{ sender }}</p>
    </div>
    <div class="container">
      <div class="field">
        <div class="control">
          <input
            class="input"
            id="message-to-sent"
            v-model.lazy="messageToSent"
            @keyup.enter="sendMessage()"
            placeholder="訊息"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-link" @click="sendMessage()">傳送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ServerSdk from "@/utilities/ServerSDK";
import {
  CreateMessageArchitect,
  MessageType
} from "@/utilities/ServerSDK/types/MessageArchitect";
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    sender: String,
    ip: String
  }
})
export default class MessageBox extends Vue {
  messageBoxScrollTop: number = 0;
  messageReceived: string = "";
  messageToSent: string = "";
  sdk: ServerSdk | undefined;
  sender!: string;
  ip!: string;

  sendMessage() {
    if (this.messageToSent.length > 0) {
      const messageBox = this.$refs.messageBox as HTMLDivElement;

      this.sdk?.sendMessage(
        CreateMessageArchitect(MessageType.PLAIN, this.messageToSent)
      );
      this.messageToSent = "";

      setTimeout(() => {
        messageBox.scrollTop = messageBox.scrollHeight;
      }, 500);
    }
  }

  mounted() {
    this.sdk = new ServerSdk(this.ip, this.sender);
    this.sdk.onClosedListeners.push(closeCode => {
      this.messageReceived += `對端已關閉，關閉碼：${closeCode}。\n`;
    });
    this.sdk.onMessageListeners.push(({ as, ip, type, data }) => {
      const prefix = `${as} (${ip}):`;
      const output = (message: string) => {
        this.messageReceived += message + "\n";
      };

      switch (type) {
        case MessageType.PLAIN:
          output(`${prefix} ${data}`);
          break;
        case MessageType.BINARY:
          output(`${prefix} 傳送了二進位資料。`);
          break;
        case MessageType.USER_JOIN:
          output(`>> ${prefix} 進來了！`);
          break;
        case MessageType.USER_LEFT:
          output(`>> ${prefix} 離開了。`);
          break;
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#message-to-sent {
  max-width: 30vw;
}

.message-box {
  height: 10em;
  border-radius: 3px;
  border: 2px solid black;
  margin: 20px 1px;
  padding: 3px 10px;
  overflow: scroll;
}

.container {
  max-width: 70vw;
  padding-bottom: 10px;
}
</style>
