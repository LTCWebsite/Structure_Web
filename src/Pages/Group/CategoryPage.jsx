import React, { useState, useEffect } from "react";
import Axios from "../../Components/Axios/Axios";
import Box from "@mui/material/Box";
import { Skeleton, Button, InputAdornment, TextField } from "@mui/material";
import {
  IconCompany,
  IconEmbassy,
  IconSearch,
  IconUnknow,
  LogoLTC,
  LogoMmoney,
  LogoTplus,
} from "../Icon/Icon";
import moment from "moment";
import { USER_KEY } from "../../Constants";
// import { toast } from "react-toastify";
import Grid from "@mui/material/Unstable_Grid2";
import { useHistory } from "react-router-dom";
import LoadingAnimat from "../../Image/loadAnimation.json";
import Lottie from "react-lottie-player";

export default function CategoryPage() {
  const tokenData = JSON.parse(localStorage.getItem(USER_KEY));

  const history = useHistory();

  const [dataTable, setdataTable] = useState([]);
  // const [open, setOpen] = useState({ edit: false, add: false, view: false });

  const header = {
    Authorization: `Bearer ${tokenData.token}`,
  };

  const [loading, setloading] = useState(true);

  // const [model, setmodel] = useState({
  //   groupName: "",
  //   groupStatus: "",
  //   createDate: "",
  //   createUser: "",
  //   modifyDate: "",
  //   modifyUser: "",
  //   remark: "",
  //   sequence: "",
  // });

  function LoadData() {
    Axios.post(
      `api/CategoriesVIP/QueryCategory?username=${tokenData.user[0].value}`,
      {},
      { headers: header }
    ).then((res) => {
      if (res.status === 200) {
        setdataTable(res.data);
        setTimeout(() => {
          setloading(false);
        }, 800);
        // console.log(res.data)
      }
    });
  }

  useEffect(() => {
    LoadData();
  }, []);

  // const enter = (e) => {
  //   if (e.key === "Enter") {
  //     SaveData();
  //   }
  // };

  // const OpenAddData = () => {
  //   setmodel({
  //     groupName: "",
  //     groupStatus: "",
  //     createDate: new Date(),
  //     createUser: "",
  //     modifyDate: new Date(),
  //     modifyUser: "",
  //     remark: "",
  //     sequence: "",
  //   });
  //   setOpen({ ...open, add: true });
  // };

  // const SaveData = () => {
  //   let sendData = model;
  //   model.groupName = model.groupName;
  //   model.groupStatus = Boolean(status.value);
  //   model.createUser = userName.substring(0, 6);
  //   model.createDate = moment(model.createDate).format(
  //     "YYYY-MM-DDTHH:mm:ss.000Z"
  //   );
  //   model.modifyUser = userName.substring(0, 6);
  //   model.modifyDate = moment(model.modifyDate).format(
  //     "YYYY-MM-DDTHH:mm:ss.000Z"
  //   );
  //   model.remark = model.remark;
  //   model.sequence = parseInt(seq.value);

  //   Axios.post("/api/VIPGroup/CreateVIPGroup", sendData, {
  //     headers: header,
  //   }).then((res) => {
  //     if (res.status === 200) {
  //       toast.success("ເພີ່ມຂໍ້ມູນໃຫມ່ສຳເລັດ", {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //       });

  //       setmodel({
  //         groupName: "",
  //         groupStatus: "",
  //         createDate: new Date(),
  //         createUser: "",
  //         modifyDate: new Date(),
  //         modifyUser: "",
  //         remark: "",
  //       });
  //       LoadData();
  //     }
  //   });
  //   setOpen({ ...open, add: false });
  // };

  // const OpenEdit = () => {
  //   setOpen({ ...open, edit: true });
  // };

  // const options_sort = [
  //   { value: "asc", label: "ASC" },
  //   { value: "dsc", label: "DSC" },
  // ];

  // const option_sequennce = [
  //   { value: "1", label: "1" },
  //   { value: "2", label: "2" },
  //   { value: "3", label: "3" },
  // ];

  // const customStyles = {
  //   menu: (provided, state) => ({
  //     ...provided,
  //     borderBottom: "1px dotted pink",
  //     color: state.selectProps.menuColor,
  //   }),

  //   singleValue: (provided, state) => {
  //     const opacity = state.isDisabled ? 0.5 : 1;
  //     const transition = "opacity 300ms";

  //     return { ...provided, opacity, transition };
  //   },
  //   control: (base) => ({
  //     ...base,
  //     borderRadius: "6px",
  //   }),
  // };

  const [query, setQuery] = useState("");

  const findId = (e) => {
    let data = dataTable.filter((x) => x.id === e);
    // console.log(id[0]);
    history.push({ pathname: "/home/category/group", state: data[0] });
  };

  if (loading)
    return (
      <div className="con-loading">
        <Grid sx={{ display: "flex", alignItems: "center" }}>
          <Grid xs={12}>
            <Grid xs={12}>
              <p>ກຳລັງໂຫລດຂໍ້ມູນ, ກະລຸນາລໍຖ້າ...</p>
            </Grid>
            <div className="animation">
              <Lottie
                loop
                animationData={LoadingAnimat}
                play
                style={{ width: 350 }}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );

  return (
    <>
      <div className="manage-container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <div>
              <Grid
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h2 className="header-title">ຂໍ້ມູນປະເພດໝວດໝູ່</h2>
              </Grid>
            </div>
            <Grid xs={12}>
              <div
                className="wapper-manage"
                style={{ display: "flex", padding: ".5rem" }}
              >
                <Grid xs={12}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ display: "flex" }}>
                      {/* <div style={{ width: "150px", marginRight: "1.5rem" }}>
                        <OtherSelect
                          options={options_sort}
                          defaultValue={{ label: "Sort by", value: 0 }}
                          styles={customStyles}
                        />
                      </div> */}
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
                        placeholder="ຊື່ກຸ່ມ... "
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>
                    <div>
                      {/* <Button variant='contained' className='btn-base'
                                                            onClick={OpenAddData}>
                                                            ເພີ່ມໃຫມ່
                                                       </Button> */}
                    </div>
                  </div>
                </Grid>
              </div>
            </Grid>
            <Grid xs={12}>
              <div className="my-body">
                <div
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h3 className="my-h3">ລາຍການ</h3>
                </div>
                <Grid container>
                  {loading ? (
                    <>
                      <Grid xs={4}>
                        <Skeleton animation="wave" width="100%" height={200} />
                      </Grid>
                      <Grid xs={4}>
                        <Skeleton animation="pulse" width="100%" height={200} />
                      </Grid>
                      <Grid xs={4}>
                        <Skeleton animation="pulse" width="100%" height={200} />
                      </Grid>
                    </>
                  ) : (
                    dataTable
                      .filter((x) => x.catename.includes(query))
                      .slice(0)
                      .sort((a, b) => (a.sequence > b.sequence ? 1 : -1))
                      .map((x, idx) => {
                        return (
                          <Grid key={idx} xs={4}>
                            <div className="my-card-list">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span style={{ fontSize: "12px" }}>
                                  {moment(x.createDate).format("DD-MM-YYYY")}
                                </span>
                                <div>
                                  <span
                                    className={
                                      x.cateStatus === true
                                        ? "status"
                                        : "status-dis"
                                    }
                                  >
                                    {x.cateStatus === true
                                      ? "Active"
                                      : "Disactive"}
                                  </span>
                                </div>
                              </div>
                              <div className="img-cate">
                                <sapn>
                                  {x.catename === "ລາວໂທລະຄົມ" ? (
                                    <LogoLTC />
                                  ) : x.catename === "ທີພາສ" ? (
                                    <LogoTplus />
                                  ) : x.catename === "ເອັມມັນນີ" ? (
                                    <LogoMmoney />
                                  ) : x.catename === "ລັດຖະບານ" ? (
                                    <img
                                      height={44}
                                      src={require("../../Image/cropped-na-logo.png")}
                                    />
                                  ) : x.catename === "ສະຖານທູດ" ? (
                                    <IconEmbassy />
                                  ) : x.catename === "ບໍລິສັດ ເອກະຊົນ" ? (
                                    <IconCompany />
                                  ) : x.catename === "ບໍ່ສາມາດຈັດໝວດໄດ້" ? (
                                    <IconUnknow />
                                  ) : (
                                    ""
                                  )}
                                </sapn>
                              </div>
                              <div className="bor-cate"></div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  marginTop: ".5rem",
                                }}
                              >
                                <h3 className="my-h3">{x.catename}</h3>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <Button
                                  onClick={() => findId(x.id)}
                                  className="btn-view-group"
                                >
                                  ເບິ່ງກຸ່ມ
                                </Button>
                              </div>
                            </div>
                          </Grid>
                        );
                      })
                  )}
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
