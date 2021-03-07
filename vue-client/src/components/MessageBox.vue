<template>
  <div class="container">
    <div class="container">
      <div class="message-box" ref="messageBox">
        <div v-for="m of messageReceived" :key="m.id">
          <p v-if="m.type === 'plain'">
            <b>{{ m.as }}</b
            >: {{ m.data }}
          </p>
          <p v-else-if="m.type === 'user_join'">
            <i
              ><b>{{ m.as }}</b> 加入了。</i
            >
          </p>
          <p v-else-if="m.type === 'user_left'">
            <i
              ><b>{{ m.as }}</b> 離開了。</i
            >
          </p>
          <p v-else-if="m.type === 'connection_closed'">
            <i>連線中斷。代碼：{{ getHumanReadableCloseCode(m.data) }}</i>
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <p>IP: {{ ipAddress }}</p>
      <p>As: {{ name }}</p>
      <p>Channel: {{ channel }}</p>
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
// eslint-disable-next-line no-unused-vars
import type { IResponse } from "@/utilities/ServerSDK/types/IResponse";
import {
  CreateMessageArchitect,
  MessageType,
} from "@/utilities/ServerSDK/types/MessageArchitect";
import { Options, Vue } from "vue-class-component";
import { getHumanReadableCloseCode } from "@/utilities/ServerSDK/types/CustomCloseCode";

interface Id {
  id: number;
}

@Options({
  props: {
    name: String,
    ipAddress: String,
    channel: String,
  },
})
export default class MessageBox extends Vue {
  // Props
  name!: string;
  ipAddress!: string;
  channel!: string;

  messageBoxScrollTop: number = 0;
  messageReceived: (IResponse & Id)[] = [];
  messageToSent: string = "";

  private sdk: ServerSdk | undefined;
  private id: number = 1;

  scrollToTop() {
    const messageBox = this.$refs.messageBox as HTMLDivElement;
    messageBox.scrollTop = messageBox.scrollHeight;
  }

  scrollToTopWithDelay(ms: number = 500) {
    setTimeout(this.scrollToTop, ms);
  }

  sendMessage() {
    if (this.messageToSent.length > 0) {
      this.sdk?.sendMessage(
        CreateMessageArchitect(MessageType.PLAIN, this.messageToSent)
      );
      this.messageToSent = "";

      this.scrollToTopWithDelay();
    }
  }

  getHumanReadableCloseCode(code: number): string {
    return getHumanReadableCloseCode(code);
  }

  mounted() {
    this.sdk = new ServerSdk(this.ipAddress, this.channel, this.name);
    this.sdk.onClosedListeners.push((closeCode) => {
      this.messageReceived.push({
        id: this.id++,
        as: "Server",
        type: MessageType.CONNECTION_CLOSED,
        data: closeCode.toString(),
      });
    });
    this.sdk.onMessageListeners.push((resp) => {
      this.messageReceived.push({ ...resp, id: this.id++ });
      this.scrollToTopWithDelay();
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
  border: 1px solid black;
  margin: 20px 1px;
  padding: 3px 10px;
  overflow: scroll;
}

.container {
  padding-bottom: 10px;
}
</style>
