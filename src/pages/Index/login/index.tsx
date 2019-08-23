import React from "react";
import { connect } from "react-redux";
import styles from "./style.scss";
import { createPortal } from "react-dom";
import Input from "@src/component/input";
import Button from "@src/component/button";
import { login, reset } from "@src/store/action";
import { STATUS } from "@src/store/reducer";

enum InputType {
  UserName,
  Email,
  ConfirmEmail
}

interface IndexStates {
  visible: boolean;
  userNameTip: string;
  emailTip: string;
  confirmEmailTip: string;
}

interface IndexProps {
  status: number;
  login: Function;
  reset: Function;
  serverTip: string;
}

class Index extends React.Component<IndexProps, IndexStates> {
  form: {
    userName: any;
    email: any;
    confirmEmail: any;
  };
  node: HTMLDivElement;
  error: any[];
  constructor(props: Readonly<IndexProps>) {
    super(props);
    this.state = {
      userNameTip: ``,
      emailTip: ``,
      confirmEmailTip: ``,
      visible: false
    };
    this.form = {
      userName: {
        value: ``,
        check: false
      },
      email: {
        value: ``,
        check: false
      },
      confirmEmail: {
        value: ``,
        check: false
      }
    };
    this.node = window.document.createElement(`div`);
    this.node.setAttribute(`class`, styles.main);
    window.document.body.appendChild(this.node);
  }

  show() {
    this.setState({ visible: true });
  }

  inputBlurFn = (type, event) => {
    const value = event.target.value.trim();
    switch (type) {
      case InputType.UserName: {
        this.form.userName.check = false;
        if (value.length == 0) {
          this.setState({ userNameTip: `用户名不能为空` });
        } else if (value.length <= 3) {
          this.setState({ userNameTip: `用户名长度必须大于3` });
        } else {
          this.setState({ userNameTip: `` });
          this.form.userName.check = true;
        }
        this.form.userName.value = value;
        break;
      }
      case InputType.Email: {
        this.form.email.check = false;
        if (value.length == 0) {
          this.setState({ emailTip: `邮箱不能为空` });
        } else if (
          //!/^([a-zA-Z0-9._-])+@airwallex.com/.test(value)
          !/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(value)
        ) {
          this.setState({ emailTip: `邮箱格式错误` });
        } else {
          this.setState({ emailTip: `` });
          this.form.email.check = true;
          if (value == this.form.confirmEmail.value) {
            this.setState({ confirmEmailTip: `` });
          }
        }
        this.form.email.value = value;
        break;
      }
      case InputType.ConfirmEmail: {
        this.form.confirmEmail.check = false;
        if (value.length == 0) {
          this.setState({ confirmEmailTip: `请再次输入邮箱` });
        } else if (this.form.email.value != value) {
          this.setState({ confirmEmailTip: `两次邮箱输入不一致` });
        } else {
          this.setState({ confirmEmailTip: `` });
          this.form.confirmEmail.check = true;
        }
        this.form.confirmEmail.value = value;
        break;
      }
    }
  };

  sendFn = async () => {
    let success = true;
    if (!this.form.userName.check) {
      if (!this.form.userName.value.length) {
        this.setState({ userNameTip: `用户名不能为空` });
      }
      success = false;
    }
    if (!this.form.email.check) {
      if (!this.form.email.value.length) {
        this.setState({ emailTip: `邮箱不能为空` });
      }
      success = false;
    }
    if (!this.form.confirmEmail.check) {
      if (!this.form.confirmEmail.value.length) {
        this.setState({ confirmEmailTip: `请再次输入邮箱` });
      }
      success = false;
    }
    if (success) {
      this.props.login(this.form);
    }
  };

  okFn = () => {
    this.setState({
      userNameTip: ``,
      emailTip: ``,
      confirmEmailTip: ``,
      visible: false
    });
    this.form = {
      userName: {
        value: ``,
        check: false
      },
      email: {
        value: ``,
        check: false
      },
      confirmEmail: {
        value: ``,
        check: false
      }
    };
    this.props.reset();
  };

  render() {
    if (this.state.visible) {
      this.node.style.display = `block`;
      if (
        this.props.status == STATUS.Normal ||
        this.props.status == STATUS.Sending
      ) {
        return createPortal(
          <div className={styles.box}>
            <div className={styles.header}>Request an invite</div>
            <div className={styles.headerLine}></div>
            <Input
              className={styles.input}
              placeholder={`Full name`}
              blurFn={this.inputBlurFn.bind(this, InputType.UserName)}
              tip={this.state.userNameTip}></Input>
            <Input
              className={styles.input}
              placeholder={`Email`}
              blurFn={this.inputBlurFn.bind(this, InputType.Email)}
              tip={this.state.emailTip}></Input>
            <Input
              className={styles.input}
              placeholder={`Confirm email`}
              blurFn={this.inputBlurFn.bind(this, InputType.ConfirmEmail)}
              tip={this.state.confirmEmailTip}></Input>
            <Button
              className={styles.btn}
              enable={this.props.status == STATUS.Normal}
              clickFn={this.sendFn}
              text={
                this.props.status == STATUS.Normal
                  ? `Send`
                  : `Sending, please wait...`
              }
              tip={this.props.serverTip}></Button>
          </div>,
          this.node
        );
      } else if (this.props.status == STATUS.Success) {
        return createPortal(
          <div className={styles.box}>
            <div className={styles.header}>All done!</div>
            <div className={styles.headerLine}></div>
            <div className={styles.welcome}>
              You will be one of the first to experience
            </div>
            <div className={styles.welcome}>
              Brocoli &amp; Co. when we launch
            </div>
            <Button
              className={styles.btn}
              clickFn={this.okFn}
              text={`OK`}></Button>
          </div>,
          this.node
        );
      }
    } else {
      this.node.style.display = `none`;
      return <></>;
    }
  }
}

function mapStateToProps(state) {
  return {
    status: state.status,
    serverTip: state.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login(form: { userName: string; email: string }) {
      return dispatch(login(form));
    },
    reset() {
      return dispatch(reset());
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(Index);
