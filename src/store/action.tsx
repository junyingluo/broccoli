export enum ACTION {
  Send,
  Reset,
  Success,
  Failure
}

export function reset() {
  return async dispatch => {
    dispatch({ type: ACTION.Reset });
  };
}

export function login(form: { userName: string; email: string }) {
  return async dispatch => {
    dispatch({ type: ACTION.Send, message: `` });
    let resonseData: any = ``;
    try {
      const response = await fetch(
        `https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth`,
        {
          method: `POST`,
          body: JSON.stringify({
            name: form.userName,
            email: form.email
          }),
          headers: {
            "Accept": `application/json`,
            "Sec-Fetch-Mode": `cors`,
            "Content-Type": `application/json`
          }
        }
      );
      resonseData = await response.text();
    } catch (e) {
      console.error(e);
    } finally {
      if (resonseData == `"Registered"`) {
        dispatch({ type: ACTION.Success, message: `` });
      } else if (resonseData.indexOf(`errorMessage`) >= 0) {
        dispatch({
          type: ACTION.Failure,
          message: JSON.parse(resonseData).errorMessage
        });
      } else {
        dispatch({
          type: ACTION.Failure,
          message: `网络异常`
        });
      }
    }
  };
}
