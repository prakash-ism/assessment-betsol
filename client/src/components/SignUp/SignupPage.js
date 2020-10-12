import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import { baseService } from "../../services/base.service";
import { USER } from "../../utils/url-builder";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: "50%",
    margin: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "2rem",
    borderRadius: "1rem",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 30,
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
  },
  pos: {
    marginBottom: 12,
  },
  formElement: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  textField: {
    width: "100%",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  submitButton: {
    width: "100%",
    padding: "1rem",
    backgroundColor: "#005A3C",
    color: "white",
    marginTop: "1rem",
    marginBottom: "2rem",
    fontWeight: "bold",
    "&:hover, &:focus": {
      cursor: "pointer",
      backgroundColor: "#005A3C",
    },
  },
});

function SignUp(props) {
  const [pageState, setPageState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [errState, setErrState] = useState(false);

  const classes = useStyles();
  let history = useHistory();

  async function callRequest() {
    if (email.length === 0) {
      setErrMsg("Please enter a valid email");
      setErrState(true);
    } else if (password.length === 0) {
      setErrMsg("Please enter a password");
      setErrState(true);
    } else {
      let url = pageState === true ? USER.register() : USER.login();

      let res = await baseService.makePostRequest(url, {
        email,
        password,
      });
      if (!res.success) {
        setErrMsg(res.message);
        setErrState(true);
      } else {
        sessionStorage.setItem("authToken", res.token);
        history.push("/dashboard");
      }
    }
  }

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <div className={classes.title}>
            {!pageState ? `Sign in` : `Sign up`}
          </div>
          <div className={classes.formElement}>
            <label style={{ fontWeight: "bold" }}>EMAIL</label>
            <TextField
              className={classes.textField}
              id="standard-email"
              // label="Outlined"
              variant="outlined"
              // floatLabel="false"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={classes.formElement}>
            <label style={{ fontWeight: "bold" }}>PASSWORD</label>
            <TextField
              type="password"
              className={classes.textField}
              id="standard-password"
              // label="Outlined"
              variant="outlined"
              // floatLabel="false"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            size="small"
            className={classes.submitButton}
            onClick={callRequest}
          >
            {!pageState ? `Login` : `Create an account`}
          </Button>

          <div
            style={{ color: "#005A3c" }}
            onClick={() => {
              setPageState(!pageState);
              setEmail("");
              setPassword("");
            }}
          >
            {!pageState
              ? `Create an account`
              : `Have an account already? Login here`}
          </div>
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={errMsg}
        open={errState}
        onClose={() => {
          setErrState(false);
          setErrMsg("");
        }}
        autoHideDuration={2000}
      />
    </>
  );
}

export default SignUp;
