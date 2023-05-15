import {
  Button,
  Dialog,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  InputAdornment,
  Skeleton,
  TextField,
  Stack,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Axios from "../../Components/Axios/Axios";
import { USER_KEY } from "../../Constants";
import {
  IconArrowBack,
  IconSearch,
  Icon_Delete,
  Icon_Edit,
  Icon_View,
} from "../Icon/Icon";
import moment from "moment";
import { toast } from "react-toastify";
import { ceil } from "lodash";
import PageEmptyPage from "../Manage/PageEmptyPage";


export default function GroupPage() {
  const local = useLocation();
  const [localData, setlocalData] = useState(local.state);
  // console.log(localData)

  const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  const userName = tokenData.user[0].value;
  const header = { Authorization: `Bearer ${tokenData.token}` };
  const [loading, setloading] = useState(true);

  const [dataModel, setdataModel] = useState([]);
  const history = useHistory();

  const [open, setOpen] = useState({ add: false, edit: false, del: false });

  const [perPage] = useState(15);
  const [alldata, setAlldata] = useState([]);
  const [allpage, setAllpage] = useState(0);

  const [emptyPage, setEmptyPage] = useState(false);

  const [savePage, setSavePage] = useState(1)

  const LoadDataNew = (page, limit) => {
    setAlldata([]);
    setloading(true);
    Axios.post(
      `/api/Group/QueryGroupByCategoryId?username=${userName}&categoryId=${localData.id}&page=${page}&limit=${limit}`,
      {},
      { headers: header }
    ).then((res) => {
      if (res.status === 200) {
        setSavePage(page)
        setEmptyPage(false);
        setdataModel(res.data.valueList);

        setloading(false);
        setAllpage(ceil(res.data.total / perPage));
      }
    })
  };

  const LoadDataNorefresh = (page, limit) => {
    setAlldata([]);
    Axios.post(
      `/api/Group/QueryGroupByCategoryId?username=${userName}&categoryId=${localData.id}&page=${page}&limit=${limit}`,
      {},
      { headers: header }
    ).then((res) => {
      if (res.status === 200) {
        setSavePage(page)
        setEmptyPage(false);
        setdataModel(res.data.valueList);
        setloading(false);
        setAllpage(ceil(res.data.total / perPage));
      }
    })
  };

  function LoadData() {
    LoadDataNew(1, perPage);
  }

  useEffect(() => {
    if (local.state === 1) {
      LoadData(1, perPage);
    } else {
      LoadData(local.state, perPage);
    }
  }, []);

  const [query, setQuery] = useState("");
  const [con, setCon] = useState(false)
  const [data1, setData1] = useState([])

  const [search, setSearch] = useState('');

  const HandleSearch = () => {
    if (search === '') {
      LoadData()
    } else {
      setdataModel([])
      setloading(false)
      Axios.post(
        `/api/SearchGroup?page=1&limit=1&groupName=${search}`,
        {},
        { headers: header }
      ).then((res) => {
        if (res.status === 200) {
          setEmptyPage(false);
          let count = res.data?.vipGroupList?.length;
          if (count > 0) {
            setdataModel(res.data.vipGroupList);
            setloading(false);
            setAllpage(ceil(res.data?.total / perPage));
          } else {
            setEmptyPage(true);
          }
        }
      })
    }
  };


  const HandleBack = (e) => {
    if (search === '') {
      LoadData();
    }
  };

  const [modelGroup, setModelGroup] = useState({
    groupName: "",
    groupStatus: "",
    createDate: "",
    createUser: "",
    modifyDate: "",
    modifyUser: "",
    remark: "",
    cateID: "",
  });

  const OpenAdd = () => {
    setModelGroup({
      groupName: "",
      groupStatus: "",
      createDate: new Date(),
      createUser: "",
      modifyDate: new Date(),
      modifyUser: "",
      remark: "",
      cateID: "",
    });
    setOpen({ ...open, add: true });
  };

  const SaveData = () => {
    let catetoryId = localData.id;
    let sendData = modelGroup;
    modelGroup.groupName = modelGroup.groupName;
    modelGroup.groupStatus = true;
    modelGroup.createDate = moment(modelGroup.createDate).format(
      "YYYY-MM-DDTHH:mm:ss.000Z"
    );
    modelGroup.createUser = userName.substring(0, 6);
    modelGroup.modifyDate = moment(modelGroup.modifyDate).format(
      "YYYY-MM-DDTHH:mm:ss.000Z"
    );
    modelGroup.modifyUser = userName.substring(0, 6);
    modelGroup.remark = modelGroup.remark;
    modelGroup.cateID = catetoryId;

    // console.log(sendData);

    Axios.post("/api/Group/CreateVIPGroup", sendData, {
      headers: header,
    }).then((res) => {
      if (res.status === 200) {
        toast.success("ເພີ່ມຂໍ້ມູນໃຫມ່ສຳເລັດ", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });

        LoadDataNorefresh(savePage, perPage);

      } else {
        toast.error("ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    });
    setOpen({ ...open, add: false });
  };

  const find_editId = (e) => {
    let getId = dataModel.filter((x) => x.id === e);
    setModelGroup(getId[0]);
    // console.log(getId[0])
    setOpen({ ...open, edit: true });
  };

  const SaveDataEdit = () => {
    let sendData = modelGroup;
    sendData.modifyDate = moment(modelGroup.modifyDate).format(
      "YYYY-MM-DDTHH:mm:ss.000Z"
    );
    sendData.modifyUser = userName.substring(0, 6);
    sendData.remark = modelGroup.remark;

    Axios.put("/api/Group/UpdateGroup?id=" + modelGroup.id, sendData, {
      headers: header,
    }).then((res) => {
      if (res.status === 200) {
        toast.success("ແກ້ໄຂ້ຂໍ້ມູນໃຫມ່ສຳເລັດ", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setOpen({ ...open, edit: false });
        LoadData();
      } else {
        toast.error("ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    });
  };

  const enterKey = (e, type) => {
    if (e.key === "Enter") {
      if (type == "add") {
        if (modelGroup.groupName === "") {
          toast.warning("ກະລຸນາປ້ອນຂໍ້ມູນ!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          SaveData();
        }
      } else if (type == "edit") {
        if (modelGroup.groupName === "") {
          toast.warning("ກະລຸນາປ້ອນຂໍ້ມູນ!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        } else {
          SaveDataEdit();
        }
      }
    }
  };

  const handlePage = (x) => {
    LoadDataNew(x, perPage);
  };

  const [dataDel, setDataDel] = useState([]);

  const find_delId = (e) => {
    let getId = dataModel.filter((x) => x.id === e);
    setModelGroup(getId[0]);
    // console.log(getId[0])
    setDataDel(getId[0]);
    setOpen({ ...open, del: true });
  };

  const testID = (e) => {
    let find = dataModel.filter(x => x.id === e)
    console.log(find);
  }

  const SubmitDelete = () => {
    Axios.delete(
      `/api/Group/DeleteGroup?username=${tokenData.user[0].value}&id=${dataDel["id"]}`,
      {
        headers: header,
      }
    ).then((res) => {
      if (res.status === 200) {
        toast.success("ລົບຂໍ້ມູນອອກຈາກລະບົບສຳເລັດ.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        LoadDataNorefresh(savePage, perPage);


      } else {
        toast.error("ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    });
    setOpen({ ...open, del: false });
  };

  return (
    <>
      <Grid className="container-cate">
        <div>
          <Grid
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <Grid
              xs={6}
            >
              <a className="btn-back" href="/home/category">
                <span>
                  <IconArrowBack /> ກັບຄືນ
                </span>
              </a>
              <h2 className="header-title">ຂໍ້ມູນກຸ່ມ{localData.catename}</h2>
            </Grid>
            <Grid xs={6}></Grid>
          </Grid>
        </div>
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
                  // autoComplete='off'
                  id="standard-basic"
                  variant="outlined"
                  placeholder="ຄົ້ນຫາດ້ວຍຊື່ກຸ່ມ... "
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
            <Button
              variant="contained"
              className="btn-base"
              style={{
                height: "36.5px",
                marginTop: "1.5rem",
                boxShadow: "none",
              }}
              onClick={OpenAdd}
            >
              ເພີ່ມໃຫມ່
            </Button>
          </div>
        </Grid>

        {
          emptyPage
            ? (
              <PageEmptyPage />
            )
            : (
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
                            page={savePage}
                            defaultPage={1}
                            siblingCount={0}
                            shape="rounded"
                            onChange={(e, x) => handlePage(x)}
                          />
                        </Stack>
                      </div>
                    </div>
                  </div>
                  {loading && emptyPage === false ? (
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
                    <table className="list-cate">
                      <tr>
                        <th width={5} style={{ textAlign: "center" }}>

                        </th>
                        <th width={350} style={{ textAlign: "left" }}>
                          ຊື່ກຸ່ມ
                        </th>
                        <th width={300} style={{ textAlign: "left" }}>
                          ຄຳອະທິບາຍ
                        </th>

                        <th width={150}>ສະຖານະ</th>
                        <th width={250} style={{ textAlign: "center" }}>
                          ຈັດການ
                        </th>
                      </tr>
                      <tbody>
                        {
                          dataModel
                            .map((x, idx) => {
                              return (
                                <tr key={idx}>
                                  <td align="center">{ }</td>
                                  <td align="left">{x.groupName}</td>
                                  <td align="left">{x.remark}</td>
                                  <td>
                                    <span
                                      className={
                                        x.status === true ? "status" : "status-dis"
                                      }
                                    >
                                      {x.status === true ? "Active" : "Disactive"}
                                    </span>
                                  </td>
                                  <td align="center">
                                    <Button
                                      variant="contained"
                                      size="small"
                                      className="btn-edit"
                                      onClick={() => find_editId(x.id)}
                                    >
                                      <Icon_Edit />
                                    </Button>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      className="btn-edit"
                                      onClick={() => find_delId(x.id)}
                                    >
                                      <Icon_Delete />
                                    </Button>
                                  </td>
                                </tr>
                              )
                            })
                        }
                      </tbody>
                    </table>
                  )}
                </Grid>
              </Grid>
            )
        }


      </Grid>

      <Dialog
        open={open.add}
        onClose={() => setOpen({ ...open, add: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        PaperProps={{
          style: {
            overflowY: "visible",
            position: "absolute",
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="header-dialog"
          style={{ borderRadius: "8px 8px 0px 0px" }}
        >
          <p>ການເພີ່ມກຸ່ມໃຫມ່</p>
        </DialogTitle>
        <Divider />
        <DialogContent
          style={{
            padding: "1.5em",
            width: "650px",
            height: "250px",
            justifyItems: "center",
            overflowY: "visible",
          }}
        >
          <>
            <Grid container style={{ marginTop: "1rem" }}>
              <Grid
                xs={2}
                style={{
                  paddingTop: ".7rem",
                  paddingRight: "2rem",
                  textAlign: "right",
                }}
              >
                <p>ຊື່ກຸ່ມ:</p>
              </Grid>
              <Grid xs={10}>
                <TextField
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 38,
                      borderRadius: "7px",
                    },
                  }}
                  autoComplete='off'
                  fullWidth
                  id="standard-basic"
                  variant="outlined"
                  onKeyDown={(e) => enterKey(e, "add")}
                  onChange={(e) =>
                    setModelGroup({ ...modelGroup, groupName: e.target.value })
                  }
                />
              </Grid>
              <Grid
                xs={2}
                style={{
                  marginTop: "1rem",
                  paddingTop: ".7rem",
                  paddingRight: "2rem",
                  textAlign: "right",
                }}
              >
                <p>ຄຳອະທິບາຍ:</p>
              </Grid>
              <Grid xs={10} style={{ marginTop: "1rem" }}>
                <TextField
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "7px",
                    },
                  }}
                  autoComplete='off'
                  fullWidth
                  multiline
                  rows={5}
                  id="standard-basic"
                  variant="outlined"
                  onKeyUp={(e) => enterKey(e, "add")}
                  onChange={(e) =>
                    setModelGroup({ ...modelGroup, remark: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </>
        </DialogContent>
        <Divider />
        <DialogActions
          style={{
            backgroundColor: "#F3F5F7",
            height: "40px",
            paddingRight: "2em",
            borderRadius: "0px 0px 8px 8px",
          }}
        >
          <Button
            variant="contained"
            className="btn-cancel"
            onClick={() => setOpen({ ...open, add: false })}
          >
            ຍົກເລີກ
          </Button>
          <Button variant="contained" className="btn-save" onClick={SaveData}>
            ບັນທຶກ
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open.edit}
        onClose={() => setOpen({ ...open, edit: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        PaperProps={{
          style: {
            overflowY: "visible",
            position: "absolute",
            borderRadius: "8px",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="header-dialog"
          style={{ borderRadius: "8px 8px 0px 0px" }}
        >
          <p>ແກ້ໄຂຂໍ້ມູນໃຫມ່</p>
        </DialogTitle>
        <Divider />
        <DialogContent
          style={{
            padding: "1.5em",
            width: "650px",
            height: "250px",
            justifyItems: "center",
            overflowY: "visible",
          }}
        >
          <>
            <Grid container style={{ marginTop: "1rem" }}>
              <Grid
                xs={2}
                style={{
                  paddingTop: ".7rem",
                  paddingRight: "2rem",
                  textAlign: "right",
                }}
              >
                <p>ຊື່ກຸ່ມ:</p>
              </Grid>
              <Grid xs={10}>
                <TextField
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 38,
                      borderRadius: "7px",
                    },
                  }}
                  fullWidth
                  autoComplete='off'
                  id="standard-basic"
                  variant="outlined"
                  onKeyDown={(e) => enterKey(e, "edit")}
                  value={modelGroup.groupName}
                  onChange={(e) =>
                    setModelGroup({ ...modelGroup, groupName: e.target.value })
                  }
                />
              </Grid>
              <Grid
                xs={2}
                style={{
                  marginTop: "1rem",
                  paddingTop: ".7rem",
                  paddingRight: "2rem",
                  textAlign: "right",
                }}
              >
                <p>ຄຳອະທິບາຍ:</p>
              </Grid>
              <Grid xs={10} style={{ marginTop: "1rem" }}>
                <TextField
                  sx={{
                    "& .MuiInputBase-root": {
                      borderRadius: "7px",
                    },
                  }}
                  fullWidth
                  autoComplete='off'
                  multiline
                  rows={5}
                  id="standard-basic"
                  variant="outlined"
                  onKeyUp={(e) => enterKey(e, "edit")}
                  value={modelGroup.remark}
                  onChange={(e) =>
                    setModelGroup({ ...modelGroup, remark: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </>
        </DialogContent>
        <Divider />
        <DialogActions
          style={{
            backgroundColor: "#F3F5F7",
            height: "40px",
            paddingRight: "2em",
            borderRadius: "0px 0px 8px 8px",
          }}
        >
          <Button
            variant="contained"
            className="btn-cancel"
            onClick={() => setOpen({ ...open, edit: false })}
          >
            ຍົກເລີກ
          </Button>
          <Button
            variant="contained"
            className="btn-save"
            onClick={SaveDataEdit}
          >
            ແກ້ໄຂ
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open.del}
        onClose={() => setOpen({ ...open, del: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        PaperProps={{
          style: {
            overflowY: "visible",
            position: "absolute",
            borderRadius: "8px",
          },
        }}
      >
        <Divider />
        <DialogContent
          style={{
            padding: "1.5em",
            width: "500px",
            height: "100px",
            justifyItems: "center",
            overflowY: "visible",
          }}
        >
          <>
            <Grid container style={{ marginTop: "1rem" }}>
              <Grid>
                <div>
                  <h3
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      paddingBottom: "1rem",
                    }}
                  >
                    ກວດສອບຂໍ້ມູນ
                  </h3>
                  <p style={{ color: "#777", lineHeight: "1.5" }}>
                    ທ່ານຕ້ອງການລົບຂໍ້ມູນ
                    <span
                      style={{
                        fontWeight: "bold",
                        padding: "0 .5rem",
                        color: "#000",
                      }}
                    >
                      "{dataDel.groupName}"
                    </span>{" "}
                    ນີ້ອອກຈາກລະບົບຫລືບໍ?{" "}
                    <span> ການປ່ຽນແປງຈະສົ່ງຜົນຕໍ່ຂໍ້ມູນທັນທີ.</span>
                  </p>
                </div>
              </Grid>
            </Grid>
          </>
        </DialogContent>
        <Divider />
        <DialogActions
          style={{
            backgroundColor: "#F3F5F7",
            height: "40px",
            paddingRight: "2em",
            borderRadius: "0px 0px 8px 8px",
          }}
        >
          <Button
            variant="contained"
            className="btn-cancel"
            onClick={() => setOpen({ ...open, del: false })}
          >
            ຍົກເລີກ
          </Button>
          <Button
            variant="contained"
            className="btn-save"
            onClick={SubmitDelete}
          >
            ຢືນຢັນ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
