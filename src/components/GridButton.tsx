import { Component } from "react";

export class GridButton extends Component {
  constructor(props: any) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }

  btnClickedHandler() {
    (this.props as any).clicked((this.props as any).data);
  }

  render() {
    const enabled =
      (this.props as any).type === "buy"
        ? ((this.props as any).data["totalShares"] as number) > 0
        : ((this.props as any).data["ownedShares"] as number) > 0;
    return (
      <button disabled={!enabled} onClick={this.btnClickedHandler}>
        {(this.props as any).type}
      </button>
    );
  }
}
