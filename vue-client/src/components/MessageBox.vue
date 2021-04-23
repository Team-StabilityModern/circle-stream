<template>
  <div class="container">
    <div class="container">
      <div class="message-box" ref="messageBox">
        <div v-for="m of messageReceived" :key="m.id">
          <p v-if="m.type === 'plain'">
            <b>{{ m.as }}</b
            >: {{ m.data }}
          </p>
          <p v-else-if="m.type === 'data_uri'">
            <b>{{ m.as }}</b
            ><br />
            <img :src="`${m.data}`" :alt="`Picture from ${m.as}`" />
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
      <div class="field is-grouped">
        <div class="control">
          <input
            class="input"
            id="message-to-sent"
            v-model.lazy="messageToSent"
            @keyup.enter="sendMessage()"
            placeholder="訊息"
          />
        </div>
        <div class="control">
          <input type="file" class="input" ref="file" />
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

// eslint-disable-next-line no-unused-vars
import type { MessageArchitect } from "@/utilities/ServerSDK/types/MessageArchitect";

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

  private reset(element: HTMLInputElement): void {
    element.value = "";
  }

  private getFile(): File | null {
    const file = this.$refs.file as HTMLInputElement;
    let fileList: File | null = null;

    if (file.files?.length && file.files.length > 0) {
      fileList = file.files[0];
    }

    this.reset(file);
    return fileList;
  }

  private toBase64(file: File): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString());
      reader.onerror = (error) => reject(error);
    });
  }

  async sendMessage(): Promise<void> {
    const file = this.getFile();
    let messageArchitect: MessageArchitect | undefined = undefined;

    if (file) {
      console.debug(`Uploading file: ${file}`);
      const fileBase64 = await this.toBase64(file);

      if (fileBase64) {
        messageArchitect = CreateMessageArchitect(
          MessageType.DATA_URI,
          fileBase64
        );
      }
    } else if (this.messageToSent.length > 0) {
      messageArchitect = CreateMessageArchitect(
        MessageType.PLAIN,
        this.messageToSent
      );
    }

    if (messageArchitect) this.sdk?.sendMessage(messageArchitect);
    this.messageToSent = "";

    this.scrollToTopWithDelay();
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
      console.log(`Received a message from ${resp.as}`);
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
