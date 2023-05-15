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
import { IconSearch, Icon_View } from "../Icon/Icon";
import moment from "moment";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { USER_KEY } from "../../Constants";

// import { header, userName } from '../../Components/Auth/Token';

export default function DataPage() {
  const [loading, setloading] = useState(true);
  const [dataPackage, setDataPackage] = useState([]);

  const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  const userName = tokenData.user[0].value;
  const header = { Authorization: `Bearer ${tokenData.token}` };

  const history = useHistory();

  function LoadData() {
    Axios.post(
      "/api/Package/GetPackage?page=1&limit=1000",
      {},
      { headers: header },
      { username: `${userName}` }
    ).then((res) => {
      if (res.status === 200) {
        setDataPackage(res.data.packageList);
        // console.log(res.data);
        setTimeout(() => {
          setloading(false);
        }, 3000);
      }
    });
  }

  useEffect(() => {
    LoadData();
  }, []);

  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState("");

  const HandleSearch = () => {
    setQuery(search);
  };

  const HandleBack = (e) => {
    if (search === "") {
      HandleSearch();
    }
  };

  return (
    <>
      <Grid
        style={{ display: "flex", padding: ".5rem" }}
        className="wapper-cate"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
          className="content-cate"
        >
          <div style={{ display: "flex" }}>
            <div>
              <p className="manage-ft-text">ຄົ້ນຫາ</p>
              <TextField
                sx={{
                  width: { sm: 200, md: 300 },
                  "& .MuiInputBase-root": {
                    height: 38,
                    borderRadius: "7px",
                    fontFamily: "Poppins, Noto Sans Lao",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch />
                    </InputAdornment>
                  ),
                }}
                id="standard-basic"
                variant="outlined"
                placeholder="ໝາຍເລກ, ປະເພດກຸ່ມ... "
                onKeyUp={HandleBack}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div style={{ marginLeft: "1.5rem", marginTop: "1.5rem" }}>
              <Button
                variant="contained"
                className="btn-search"
                onClick={HandleSearch}
              >
                ຄົ້ນຫາ
              </Button>
            </div>
          </div>
        </div>
      </Grid>
      <div className="container-pk">
        <h3 className="my-h3" style={{ paddingBottom: "1rem" }}>
          ລາຍການລ່າສຸດ
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "1rem",
          }}
        >
          <div style={{ display: "flex" }}>
            <TextField
              sx={{
                width: { sm: 200, md: 300 },
                "& .MuiInputBase-root": {
                  height: 38,
                  borderRadius: "7px",
                  fontFamily: "Poppins, Noto Sans Lao",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconSearch />
                  </InputAdornment>
                ),
              }}
              id="standard-basic"
              variant="outlined"
              placeholder="ໄອດີ, ຊື່ແພັກເກັດ "
            />
            <div style={{ marginLeft: "1.5rem" }}>
              <Button variant="contained" className="btn-search">
                ຄົ້ນຫາ
              </Button>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ display: "flex" }}>
              {/* <p style={{ padding: '.5rem' }}>ສະແດງ</p>
                                   <OtherSelect options={showRow} defaultValue={{ value: '10', label: '10' }} /> */}
            </div>

            <div style={{ paddingTop: ".25rem" }}>
              <Stack spacing={1}>
                <Pagination
                  count={10}
                  defaultPage={1}
                  siblingCount={0}
                  shape="rounded"
                />
              </Stack>
            </div>
          </div>
        </div>
        <table className="list-pk">
          <tr>
            <th align="center"></th>
            <th style={{ textAlign: "left" }}>ຊື່ແພັກເກັດ</th>
            <th>ປະເພດເບີ</th>
            <th>ໄອດີແພັກເກັດ</th>
            <th>ສະຖານະ</th>
            {/* <th align="center">ຈັດການ</th> */}
          </tr>
          <tbody>
            {dataPackage.map((x, idx) => {
              return (
                <tr key={idx}>
                  <td align="center"></td>
                  <td>{x.packageName}</td>
                  <td>{x.packageType}</td>
                  <td>{x.packageCode}</td>
                  <td>
                    <span
                      className={
                        x.packageStatus === true ? "status" : "status-dis"
                      }
                    >
                      {x.packageStatus === true ? "Active" : "Disactive"}
                    </span>
                  </td>
                  {/* <td align="center">
                    <Button
                      variant="contained"
                      size="small"
                      className="btn-view"
                    >
                      <Icon_View />
                    </Button>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
