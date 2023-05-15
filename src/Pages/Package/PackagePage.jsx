import React, { useState, useEffect } from "react";
import Axios from "../../Components/Axios/Axios";
import {
  Button,
  TextField,
  Skeleton,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { IconSearch, Icon_View } from "../Icon/Icon";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { USER_KEY } from "../../Constants";
import { ceil } from "lodash";

export default function PackagePage() {
  const [loading, setloading] = useState(true);
  const [dataPackage, setDataPackage] = useState([]);

  const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  const userName = tokenData.user[0].value;
  const header = { Authorization: `Bearer ${tokenData.token}` };

  const [perPage] = useState(15);
  const [alldata, setAlldata] = useState([]);
  const [allpage, setAllpage] = useState(0);

  const LoadDataNew = (page, limit) => {
    setAlldata([]);
    setloading(true);
    Axios.post(
      `/api/Package/GetPackage?&page=${page}&limit=${limit}`,
      {},
      { headers: header },
      { username: `${userName}` }
    ).then((res) => {
      if (res.status === 200) {
        setDataPackage(res.data.packageList);
        setTimeout(() => {
          setloading(false);
        }, 800);
        setAllpage(ceil(res.data.total / perPage));
      }
    });
  };

  function LoadData() {
    LoadDataNew(1, perPage);
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

  const handlePage = (x) => {
    LoadDataNew(x, perPage);
  };




  return (
    <>
      <div className="manage-container">
        <Grid
          xs={12}
          sx={{
            marginBottom: "1rem",
          }}
        >
          <h2 className="header-title">ຂໍ້ມູນແພັກເກັດ</h2>
        </Grid>
      </div>
      {/* <Grid
        style={{ display: "flex", padding: ".5rem", marginBottom: "1.5rem" }}
        className="container-pk wapper-cate"
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
                placeholder="ຊື່ແພັກເກັດ..."
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
      </Grid> */}
      <Grid
        container
        className="wapper-cate"
        style={{ marginTop: "1.5rem", padding: ".5rem" }}
      >
        <Grid xs={12} className="content-cate">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3 className="my-h3" style={{ padding: "1em" }}>
              ລາຍການລ່າສຸດ
            </h3>
            <div style={{ display: "flex", padding: "1em" }}>
              <div style={{ paddingTop: ".25rem" }}>
                <Stack spacing={1}>
                  <Pagination
                    count={allpage}
                    defaultPage={1}
                    siblingCount={0}
                    shape="rounded"
                    onChange={(e, x) => handlePage(x)}
                  />
                </Stack>
              </div>
            </div>
          </div>
          {loading ? (
            <>
              <Grid container>
                <Grid xs={12}>
                  <Skeleton animation="wave" width="100%" height={80} />
                  <Skeleton animation="pulse" width="40%" height={50} />
                  <Skeleton animation="pulse" width="80%" height={60} />
                  <Skeleton animation="pulse" width="70%" height={50} />
                  <Skeleton animation="pulse" width="90%" height={60} />
                </Grid>
              </Grid>
            </>
          ) : (
            <div style={{ padding: '0 1.5rem' }}>
              <table className="list-pk">
                <tr>
                  <th width={700} style={{ textAlign: "left" }}>ຊື່ແພັກເກັດ</th>
                  <th width={200}>ປະເພດເບີ</th>
                  <th width={200}>ໄອດີແພັກເກັດ</th>
                  <th width={100}>ສະຖານະ</th>
                  {/* <th align="center">ຈັດການ</th> */}
                </tr>
                <tbody>
                  {dataPackage.map((x, idx) => {
                    return (
                      <tr key={idx}>
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
          )}
        </Grid>
      </Grid>
    </>
  );
}
