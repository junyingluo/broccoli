import React from "react";
import styles from "./style.scss";

interface InputProps {
  clickFn: (event: React.MouseEvent<HTMLInputElement>) => void;
  enable?: boolean;
  tip?: string;
  className: string;
  text: string;
}

export default class Button extends React.Component<InputProps> {
  constructor(props: Readonly<InputProps>) {
    super(props);
  }

  static defaultProps = {
    enable: true,
    tip: ``
  };

  clickFn = event => {
    if (this.props.enable) {
      this.props.clickFn(event);
    }
  };

  render() {
    return (
      <div className={this.props.className}>
        <div
          className={styles.btn}
          style={{
            background: this.props.enable ? `#fff` : `#eee`
          }}
          onClick={this.props.clickFn}>
          {this.props.text}
        </div>
        <div
          className={styles.tip}
          style={{
            display: this.props.tip.length ? `block` : `none`
          }}>
          {this.props.tip}
        </div>
      </div>
    );
  }
}
