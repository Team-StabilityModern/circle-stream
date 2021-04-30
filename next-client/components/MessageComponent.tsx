import React from "react"
import type { MessageArchitect, MessageTypeForClient } from "cs-sdk/types/MessageArchitect";

export interface MessageProps {
  messageReceived: MessageArchitect[]
}

export class Message extends React.Component<MessageProps> {
  render() {
    const { messageReceived } = this.props;

    return (
      <div className="container">
        <div className="message-box" ref="messageBox">
          {
            messageReceived.map(m => {
              const { as, type, data } = m;

              return (

              )
            })
          }
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
      <div className="container">
        <p>IP: {{ ipAddress }}</p>
        <p>As: {{ name }}</p>
        <p>Channel: {{ channel }}</p>
      </div>
      <div className="container">
        <div className="field is-grouped">
          <div className="control">
            <input
              className="input"
              id="message-to-sent"
              v-model.lazy="messageToSent"
              @keyup.enter="sendMessage()"
              placeholder="訊息"
            />
          </div>
          <div className="control">
            <input type="file" className="input" ref="file" />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link" @click="sendMessage()">傳送</button>
          </div>
        </div>
      </div>
    </div>
    );
  }
}