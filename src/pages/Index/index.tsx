import React from "react";
import Login from "./login";
import styles from "./style.scss";

export default class Index extends React.Component {
  loginRef: React.RefObject<any>;
  constructor(props: any) {
    super(props);
    this.loginRef = React.createRef();
  }

  inviteFn = () => {
    this.loginRef.current.show();
  };

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.header}>BROCCOLI & CO.</div>
        <div className={styles.noop}></div>
        <div className={styles.content}>
          <div className={styles.big}>A better way</div>
          <div className={styles.big}>to enjoy every day.</div>
          <div className={styles.small}>
            Be the first to know when we launch.
          </div>
          <div className={styles.btn} onClick={this.inviteFn}>
            Request an invite
          </div>
        </div>
        <div className={styles.noop}></div>
        <div className={styles.footer}>
          <div className={styles.item}>Made with &hearts; in Melbourne.</div>
          <div className={styles.item}>
            &copy; 2016 Broccoli & Co. All rights reserved.
          </div>
        </div>
        <Login ref={this.loginRef}></Login>
      </div>
    );
  }
}
