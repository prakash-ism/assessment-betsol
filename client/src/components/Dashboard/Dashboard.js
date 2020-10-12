import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Switch, TextField } from "@material-ui/core";
import Navigation from "./Navigation";
import { blueGrey } from "@material-ui/core/colors";
import CustomizedTables from "./CustomTable";
import { baseService } from "../../services/base.service";
import { INSTANCE } from "../../utils/url-builder";
import Icon from "@mdi/react";
import { mdiCurrencyInr, mdiCurrencyUsd } from "@mdi/js";

const useStyles = makeStyles({
  root: {
    borderRadius: "1rem",
    // width: "100%",
    margin: "1rem 10%",
  },
  costDiv: {
    display: "grid",
    gridTemplateColumns: "20% 20% 60%",
    padding: "1rem",
    // borderRadius: "10rem !important",
  },
  costText: {
    display: "grid",
    gridTemplateRows: "50% 50% ",
  },
  instanceTable: {
    padding: "2rem",
  },
  // "&:hover, &:focus": {
  //   cursor: "pointer",
  //   backgroundColor: "#005A3C",
  // },
});

const customStyles = makeStyles({
  root: {
    padding: 7,
  },
  thumb: {
    width: 24,
    height: 24,
    backgroundColor: "#005a3C",
    boxShadow:
      "0 0 12px 0 rgba(0,0,0,0.08), 0 0 8px 0 rgba(0,0,0,0.12), 0 0 4px 0 rgba(0,0,0,0.38)",
  },
  switchBase: {
    color: "rgba(0,0,0,0.38)",
    padding: 7,
  },
  track: {
    borderRadius: 20,
    backgroundColor: "#7d9181",
  },
  checked: {
    "& $thumb": {
      backgroundColor: "#005a3c",
    },
    "& + $track": {
      opacity: "1 !important",
      backgroundColor: "#7d9181",
    },
  },
  focusVisible: {},
});

function Dashboard() {
  const [runningCostPrice, setRunCostPrice] = useState(0.19);
  const [stoppedCostPrice, setStopCostPrice] = useState(0.35);
  const [toggleINR, setToggelINR] = useState(false); // true if INR
  const classes = useStyles();
  const switchStyles = customStyles();
  const [instanceData, setInstanceData] = useState([]);

  useEffect(() => {
    fetchInstances();
  }, []);

  async function fetchInstances() {
    let url = INSTANCE.getInstances();
    let data = await baseService.makeGetRequest(url);
    setInstanceData(data.instances);
  }

  return (
    <>
      <Navigation />
      <Card className={classes.root}>
        <div className={classes.costDiv}>
          <div className={classes.costText}>
            <span style={{ fontWeight: "bold" }}>
              <Icon
                path={toggleINR === true ? mdiCurrencyInr : mdiCurrencyUsd}
                title="INR"
                size={0.6}
              />
              {toggleINR === true
                ? (runningCostPrice / 0.015).toFixed(2)
                : runningCostPrice}{" "}
              / hr
            </span>
            <span>Running Instances</span>
          </div>
          <div className={classes.costText}>
            <span style={{ fontWeight: "bold" }}>
              <Icon
                path={toggleINR === true ? mdiCurrencyInr : mdiCurrencyUsd}
                title="INR"
                size={0.6}
              />
              {toggleINR === true
                ? (stoppedCostPrice / 0.015).toFixed(2)
                : stoppedCostPrice}{" "}
              / hr
            </span>
            <span>Stopped Instances</span>
          </div>
          <div style={{ textAlign: "right", paddingRight: "2rem" }}>
            <span>INR</span>
            <Switch
              color="default"
              classes={switchStyles}
              checked={!toggleINR}
              onChange={(e) => setToggelINR(!e.target.checked)}
            />
            <span>USD</span>
          </div>
        </div>
      </Card>

      <Card className={classes.root}>
        <div className={classes.instanceTable}>
          <div
            style={{
              textAlign: "left",
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1rem",
            }}
          >
            {" "}
            Instances
          </div>

          <CustomizedTables
            instanceData={instanceData}
            toggleINR={toggleINR}
            fetchInstances={fetchInstances}
          />
        </div>
      </Card>
    </>
  );
}

export default Dashboard;
