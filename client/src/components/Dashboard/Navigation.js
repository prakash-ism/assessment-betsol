import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { baseService } from "../../services/base.service";
import { USER } from "../../utils/url-builder";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    // width: "100%",
    margin: 0,
    padding: "1rem 10%",
    backgroundColor: "#005A3C",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    // borderRadius: "1rem",
  },
  navText: {
    marginLeft: "auto",
    cursor: "pointer",
  },
});

function Navigation() {
  const classes = useStyles();

  let history = useHistory();

  const logout = async () => {
    let url = USER.logout();
    await baseService.makePostRequest(url);
    sessionStorage.removeItem("authToken");
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <span style={{ fontWeight: "bold", fontSize: "1.135rem" }}>
        Dashboard
      </span>
      <span className={classes.navText} onClick={logout}>
        logout
      </span>
    </div>
  );
}

export default Navigation;
