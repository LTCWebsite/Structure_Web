import React, { useState, useEffect } from "react";
import { styled, Paper } from "@mui/material";
import { IconPk, IconMSISDN } from "../Icon/Icon";
import MyBarChart from "../../Components/MyBarChart";
import { USER_KEY } from "../../Constants/index";
import Axios from "../../Components/Axios/Axios";
import Grid from "@mui/material/Unstable_Grid2";
import { fadeIn } from "react-animations";
import Radium, { StyleRoot } from "radium";
import moment from "moment/moment";

const styles = {
  fadeIn: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeIn, "fadeIn"),
  },
};

function Dashboard() {
  const [getToken, setToken] = useState("");
  const [getUser, setUser] = useState("");

  const tokenData = JSON.parse(localStorage.getItem(USER_KEY));

  const headers = {
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem(USER_KEY))?.token
    }`,
  };

  useEffect(() => {
    if (tokenData) {
      setToken(tokenData.token);
      setUser(tokenData.user[0].value.substring(0, 6));
    }
  }, []);

  // Set Variable
  const [allNumber, setNumber] = useState("");
  const [getDateNumber, setDateNumber] = useState("");

  const [allPackage, setPackage] = useState("");
  const [getDatePackage, setDatePackage] = useState("");

  const [dataTable, setdataTable] = useState([]);
  const [loading, setloading] = useState(true);
  // Get Total Number and Uptodate

  const [myChartBar, setmyChartBar] = useState({});

  const [typePostpaid, setTypePostpaid] = useState([]);
  const [typeHSPA, setTypeHSPA] = useState([]);
  const [typeMphone, setTypeMphone] = useState([]);
  const [typeLTCInhouse, setTypeLTCInhouse] = useState([]);
  const [typeWinPhone, setTypeWinPhone] = useState([]);
  const [typeUndefine, setTypeUndefine] = useState([]);
  const [type, setType] = useState([]);

  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);

  const [datas, setDatas] = useState();

  function LoadData() {
    Axios.post(
      "/api/MsisdnVIP/GetMsisdnVIP?page=1&limit=10000",
      {},
      { headers: headers },
      { username: `${getUser}` }
    ).then((res) => {
      if (res.status === 200) {
        setdataTable(res.data.vipMsisdnList);
        setNumber(res.data?.vipMsisdnList.length);
        let lastArray = res.data.vipMsisdnList.length - 1;
        let dateValue = res.data.vipMsisdnList[lastArray].importDate;
        setDateNumber(dateValue);

        setTimeout(() => {
          setloading(false);
        }, 3000);
      }
    });
    Axios.post(
      "api/Package/GetPackage?page=1&limit=1000",
      {},
      { headers: headers },
      { username: `${getUser}` }
    ).then((response) => {
      if (response.status === 200) {
        setPackage(response.data.packageList.length);
        let lastArray = response.data.packageList.length - 1;
        let dateValue = response.data.packageList[lastArray].createDate;
        setDatePackage(dateValue);

        setTimeout(() => {
          setloading(false);
        }, 3000);
      }
    });
    Axios.post(
      `/api/TotalPhoneType/GetTotalPhoneType?username=${tokenData.user[0].value}`,
      {},
      { headers: headers }
    ).then((res) => {
      if (res.status === 200) {
        // console.log(res.data);
        setDatas(res.data);

        const data = res.data;
        let setcolor = [
          { color: "rgba(212,163,115,0.7)" },
          { color: "rgba(58,134,255,0.7)" },
          { color: "rgba(246,102,87,0.7)" },
          { color: "rgba(0,98,189,0.7)" },
          { color: "rgba(213,189,175,0.7)" },
          { color: "rgba(234,226,183,0.7)" },
          { color: "#fff" },
          { color: "#fff" },
          { color: "#fff" },
          { color: "#fff" },
        ];

        data.map((row, idx) => {
          row.color = setcolor[idx].color;
          return row;
        });

        let totalPhone = [];

        for (const dataObj of data) {
          let newA = {
            label: [dataObj.phoneType],
            data: [parseInt(dataObj.total)],
            backgroundColor: [dataObj.color],
            borderColor: ["#fff"],
            borderWidth: 1,
          };
          totalPhone.push(newA);
        }

        setTypePostpaid(data[0]["total"]);
        setTypeMphone(data[1]["total"]);
        setTypeUndefine(data[2]["total"]);
        setTypeLTCInhouse(data[3]["total"]);
        setTypeWinPhone(data[4]["total"]);
        setTypeHSPA(data[5]["total"]);

        setmyChartBar({
          labels: [""],
          datasets: totalPhone,
        });
        setTimeout(() => {
          setloading(false);
        }, 1000);
      }
    });
  }

  useEffect(() => {
    // LoadData()
    LoadData();
  }, []);

  // Variable For Use Grid
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    // textAlign: 'center',
    // color: theme.palette.text.secondary,
  }));

  // Variable For Use MyBarChart
  const [userData] = useState({
    labels: [""],
    datasets: [
      {
        label: "Chart",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        borderWidth: 1,
        barThickness: 50,
      },
    ],
  });

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const labelPhone = [
    "Post-paid",
    "M-Phone",
    "Undefine",
    "LTC-Inhouse",
    "Win-Phone",
    "HSPA",
  ];

  function componentLoading() {
    return (
      <span style={{ fontSize: "14px", color: "#a1a1aa" }}> loading... </span>
    );
  }

  return (
    <>
      <StyleRoot>
        <div style={styles.fadeIn} className="manage-container">
          <div className="home_header_title">ພາບລວມຂໍ້ມູນ</div>
          <Grid container>
            <h3
              style={{ marginBottom: ".5rem", color: "#777" }}
              className="title-h3"
            >
              ປະເພດເບີ
            </h3>
            <Grid xs={12}>
              <Grid container spacing={2}>
                <Grid xs={2}>
                  <div className="wapper-dasborad">
                    <div className="ds-box">
                      <div>
                        <p className={labelPhone[0]}>{labelPhone[0]}</p>
                        <div className="home_card_type">ເບີລາຍເດືອນ</div>
                      </div>
                      <div className="home_card_all">
                        {loading
                          ? componentLoading()
                          : typeMphone === undefined
                          ? "0"
                          : typePostpaid}
                      </div>
                    </div>
                    <div className="card-preview_postpaid"></div>
                  </div>
                </Grid>
                <Grid xs={2}>
                  <div className="wapper-dasborad">
                    <div className="ds-box">
                      <div>
                        <p className={labelPhone[1]}>{labelPhone[1]}</p>
                        <div className="home_card_type">ເບີຕື່ມເງີນ</div>
                      </div>
                      <div className="home_card_all">
                        {loading
                          ? componentLoading()
                          : typePostpaid === undefined
                          ? "0"
                          : typeMphone}
                      </div>
                    </div>
                    <div className="card-preview_mphone"></div>
                  </div>
                </Grid>
                <Grid xs={2}>
                  <div className="wapper-dasborad">
                    <div className="ds-box">
                      <div>
                        <div className={labelPhone[2]}>{labelPhone[2]}</div>
                        <div className="home_card_type">ບໍ່ພົບປະເພດເບີ</div>
                      </div>
                      <div className="home_card_all">
                        {loading
                          ? componentLoading()
                          : typeHSPA === undefined
                          ? "0"
                          : typeUndefine}
                      </div>
                    </div>
                    <div className="card-preview_undefine"></div>
                  </div>
                </Grid>
                <Grid xs={2}>
                  <div className="wapper-dasborad">
                    <div className="ds-box">
                      <div>
                        <div className={labelPhone[3]}>{labelPhone[3]}</div>
                        <div className="home_card_type">ເນັດບ້ານ</div>
                      </div>
                      <div className="home_card_all">
                        {loading
                          ? componentLoading()
                          : typeLTCInhouse === undefined
                          ? "0"
                          : typeLTCInhouse}
                      </div>
                    </div>
                    <div className="card-preview_LTCInhouse"></div>
                  </div>
                </Grid>
                <Grid xs={2}>
                  <div className="wapper-dasborad">
                    <div className="ds-box">
                      <div>
                        <div className={labelPhone[4]}>{labelPhone[4]}</div>
                        <div className="home_card_type">ມືຖືຕັ້ງໂຕະ</div>
                      </div>
                      <div className="home_card_all">
                        {loading
                          ? componentLoading()
                          : typeWinPhone === undefined
                          ? "0"
                          : typeWinPhone}
                      </div>
                    </div>
                    <div className="card-preview_WinPhone"></div>
                  </div>
                </Grid>
                <Grid xs={2}>
                  <div className="wapper-dasborad">
                    <div className="ds-box">
                      <div>
                        <div className={labelPhone[5]}>{labelPhone[5]}</div>
                        <div className="home_card_type">ເບີເນັດ</div>
                      </div>
                      <div className="home_card_all">
                        {loading
                          ? componentLoading()
                          : typeWinPhone === undefined
                          ? "0"
                          : typeHSPA}
                      </div>
                    </div>
                    <div className="card-preview_hspa"></div>
                  </div>
                </Grid>
                <Grid xs={12}>
                  <h3 style={{ color: "#777" }} className="title-h3">
                    ການເຄື່ອນໄຫວ
                  </h3>
                </Grid>
                <Grid xs={4}>
                  <div
                    className="wapper-dasborad"
                    style={{
                      paddingTop: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      className="num-boder"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="home_grid_text">ຈໍານວນເບີທັງໝົດ</div>
                      <div className="home_grid_icon">
                        <IconMSISDN />
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div>
                        <div className="home_grid_all">
                          {loading
                            ? componentLoading()
                            : allNumber.toLocaleString()}{" "}
                          <span>ເບີ</span>
                        </div>
                        <div className="home_grid_update">
                          ອັບເດດລ່າສຸດ:{" "}
                          {moment(getDateNumber).format("DD/MM/YYYY HH:mm")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="wapper-dasborad"
                    style={{
                      paddingTop: "1rem",
                    }}
                  >
                    <div
                      className="num-boder"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="home_grid_text">ຈໍານວນແພັກເກັດທັງໝົດ</div>
                      <div className="home_grid_icon">
                        <IconPk />
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div>
                        <div className="home_grid_all">
                          {loading
                            ? componentLoading()
                            : allPackage.toLocaleString()}{" "}
                          <span>ແພັກເກັດ</span>
                        </div>
                        <div className="home_grid_update">
                          ອັບເດດລ່າສຸດ:{" "}
                          {moment(getDatePackage).format("DD/MM/YYYY HH:mm")}
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid xs={8}>
                  <div className="wapper-dasborad">
                    <div
                      className="ds-title"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3 className="text-title">ການປຽບທຽບປະເພດເບີ</h3>
                      {/* <p className="showing">ສະແດງ: years</p> */}
                    </div>
                    <div className="wapper-graph">
                      <MyBarChart chartData={loading ? userData : myChartBar} />
                      {/* <MyBarChart chartData={userData} /> */}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </StyleRoot>
    </>
  );
}

export default Dashboard;
