import React from "react";

export interface SetupState {
  ip: string;
  channel: string;
  name: string;
}

export interface SetupProps {
  updateValue: (options: SetupState) => void;
}

export default class Setup extends React.Component<SetupProps, SetupState> {
  constructor(props: SetupProps) {
    super(props);
    this.state = {
      ip: "",
      channel: "",
      name: "",
    };
  }

  changeIP(ip: string) {
    this.setState({
      ip,
    });
  }

  changeChannel(channel: string) {
    this.setState({
      channel,
    });
  }

  changeName(name: string) {
    this.setState({
      name,
    });
  }

  render() {
    const { ip, channel, name } = this.context;

    return (
      <>
        <div className="container options">
          <div className="field">
            <div className="label">IP 地址</div>
            <div className="field">
              <div className="control">
                <input type="text" className="input" value={ip} onChange={(event) => this.changeIP(event.target.value)} />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="label">頻道名稱</div>
            <div className="field">
              <div className="control">
                <input type="text" className="input" value={channel} onChange={(event) => this.changeChannel(event.target.value)} />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="label">暱稱</div>
            <div className="field">
              <div className="control">
                <input type="text" className="input" value={name} onChange={(event) => this.changeName(event.target.value)} />
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary" onClick={() => this.props.updateValue(this.state)}>
                儲存並連線
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
