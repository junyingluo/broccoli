import React from "react";
import styles from "./style.scss";

interface InputProps {
  placeholder: string;
  blurFn: (event: React.FocusEvent<HTMLInputElement>) => void;
  tip: string;
  className: string;
}

export default class Input extends React.Component<InputProps> {
  constructor(props: Readonly<InputProps>) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.className}>
        <input
          className={styles.input}
          placeholder={this.props.placeholder}
          onBlur={this.props.blurFn}
        />
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
