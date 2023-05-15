import React, { useState, useEffect } from "react";
import Axios from "../../Components/Axios/Axios";
import axios from "axios";
import Box from "@mui/material/Box";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Divider,
  Checkbox,
  Skeleton,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import OtherSelect from "react-select";
import {
  IconArrowDown,
  IconArrowUp,
  IconSearch,
  Icon_View,
} from "../Icon/Icon";
import moment from "moment";
import PropTypes from "prop-types";
import { USER_KEY } from "../../Constants";
import { useHistory } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ManageTT from "./ManageTT";
import { ceil } from "lodash";

export default function ManageLoading() {
  return (
    <>
      <div className="manage-container">
        <div>
          <Grid
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Grid xs={6}>
              <div
                style={{
                  background: "#e2e2e2",
                  padding: "1.2rem 3.5rem",
                  borderRadius: "8px",
                }}
              ></div>
            </Grid>
            <Grid xs={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: ".5rem",
                }}
              >
                <div
                  style={{
                    background: "#e2e2e2",
                    padding: "1.2rem 3.5rem",
                    borderRadius: "8px",
                  }}
                ></div>
              </div>
            </Grid>
          </Grid>
        </div>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <div
              style={{
                marginTop: "1rem",
                background: "#f5f5f5",
                padding: "1.5rem 1.5rem",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  width: "50%",
                  background: "#E2E2E2",
                  padding: "1.2rem 2rem",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          </Grid>
          <Grid xs={12}>
            <div
              style={{
                marginTop: ".5rem",
                height: "40vh",
                background: "#f5f5f5",
                padding: "1.5rem 1.5rem",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  width: "150px",
                  background: "#E2E2E2",
                  padding: "1.2rem 2rem",
                  borderRadius: "8px",
                }}
              ></div>

              <div
                style={{
                  marginTop: "2rem",
                  background: "#E2E2E2",
                  padding: "1.2rem 2rem",
                  borderRadius: "8px",
                }}
              ></div>

              <div
                style={{
                  width: "70%",
                  marginTop: "2rem",
                  background: "#E2E2E2",
                  padding: "1.2rem 0rem",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
