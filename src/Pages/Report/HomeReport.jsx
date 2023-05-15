import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import MyBarChartHorizontal from "../../Components/MyBarChartHorizontal";
import MyDoughnutChart from "../../Components/MyDoughnutChart";
import { Icon_View } from "../Icon/Icon";
import { Button } from "@mui/material";
import { USER_KEY } from "../../Constants";
import Axios from "../../Components/Axios/Axios";
import { BarChart } from "@mui/icons-material";

export default function HomeReport() {
  const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  const header = { Authorization: `Bearer ${tokenData.token}` };

  const [loading, setloading] = useState(true);
  const [countActive, setCountActive] = useState([])

  const [ChartBar, setChartBar] = useState([])
  const [countType, setCountType] = useState([])

  const [ChartDoughnut, setChartDoughnut] = useState([])
  const [countCate, setCountCate] = useState([])

  const [dataTable, setDataTable] = useState([])

  // const [demoLabel, setdemoLabel] = useState([])

  function LoadData() {
    Axios.post(
      `/api/CountMsisdnActiveAndDeactive`,
      {},
      { headers: header }
    ).then((res) => {
      if (res.status === 200) {
        setCountActive(res.data);
        setTimeout(() => {
          setloading(false);
        }, 800);
      }
    })
    Axios.post(
      `/api/CountVIPType`,
      {},
      { headers: header }
    ).then((res) => {
      if (res.status === 200) {
        setDataTable(res.data)

        const data = res.data?.sort((a, b) => a.active > b.active ? -1 : 1)
        let count = res.data?.length
        setCountType(count)

        const dataActive = []
        const dataDeactive = []
        let BarLabel = []

        for (const x of data) {
          dataActive.push(parseInt(x.active));
          dataDeactive.push(parseInt(x.deactive));
          BarLabel.push(x.vipType);
        }

        // setdemoLabel(BarLabel)
        // console.log(data.sort((a, b) => a.active > b.active ? -1 : 1))

        setChartBar({
          labels: BarLabel,
          datasets: [
            {
              label: 'Active',
              data: dataActive,
              backgroundColor: [
                "rgba(255, 223, 143, 1)",
              ],
              borderColor: [
                "rgb(255, 255, 255)",
              ],
              barThickness: 15,
              borderWidth: 1,
            },
            {
              label: 'Deactive',
              data: dataDeactive,
              backgroundColor: [
                "rgba(255, 195, 182, 1)",
              ],
              borderColor: [
                "rgb(255, 255, 255)",
              ],
              barThickness: 15,
              borderWidth: 1,
            },
          ]
        })

      }
    });
    Axios.post(
      `/api/CountCateAmount`,
      {},
      { headers: header }
    ).then((res) => {
      if (res.status === 200) {
        let count = res.data?.length
        setCountCate(count)

        const dougData = res.data
        let dougLabel = []
        const dougValue = []

        for (const x of dougData) {
          dougValue.push(parseInt(x.totalMsisdn));
          dougLabel.push(x.cateName);
        }

        setChartDoughnut({
          labels: dougLabel,
          datasets: [{
            label: '',
            data: dougValue,
            backgroundColor: [
              "rgba(39, 174, 96, 0.8)",
              "rgba(188, 198, 251, 0.8)",
              "rgba(246, 140, 147, 0.8)",
              "rgba(52, 152, 219, 0.8)",
              "rgba(88, 214, 141, 0.8)",
              "rgba(81, 90, 90, 0.8)",
              "rgba(213, 216, 220, 0.8)"
            ],
            hoverOffset: 4,
          }]
        })

      }
    });
  }

  useEffect(() => {
    LoadData();
  }, []);


  // for (const dataObj of dataTable) {
  //   BarLabel.push(dataObj.vipType);
  // }
  // console.log(demoLabel);

  const [userData] = useState({
    labels: [, "Top VIP"
      , "VIP4"
      , "VIP1"
      , "VIP9"
      , "VIP5"
      , "VIP3"
      , "VIP6"
      , "VIP7"
      , "VIP8"
      , "VIP"
      , "VIP10"
      , "Top VIP&VIP1"
      , "VIP2"
      , "None"
      , ""
      , "VIP1 5M"
      , "ບໍ່ແກ້ໄຂໃຫ້"
      , "VIP ທົ່ວໄປ"
      , "ເປິດ IR ໄປປະເທດສະເປນ"
      , "MVB999"
      , "01 User"
      , "50%"
      , "GSM_VIP"],
    datasets: [
      {
        label: ["Loading..."],
        data: [],
        backgroundColor: [
          "rgba(241, 77, 88, 0.8)",
          // "rgba(188, 198, 251, 0.8)",
          // "rgba(246, 140, 147, 0.8)",
          // "rgba(99, 123, 246, 0.8)",
          // "rgba(88, 214, 141, 0.8)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          // "rgb(255, 159, 64)",
          // "rgb(255, 205, 86)",
          // "rgb(75, 192, 192)",
          // "rgb(54, 162, 235)",
        ],
        barThickness: 20,
      },
    ],
  });

  const [DoughnutData] = useState({
    labels: [
      "ລັດຖະບານ",
      "ສະຖານທູດ",
      "ລາວໂທລະຄົມ",
      "ເອັມມັນນີ",
      "ທີພາສ",
      "ບໍລິສັດເອກະຊົນ",
      "ບໍ່ສາມາດຈັດໝວດໄດ້",
    ],
    datasets: [
      {
        label: "Chart",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "rgba(39, 174, 96, 0.8)",
          "rgba(188, 198, 251, 0.8)",
          "rgba(246, 140, 147, 0.8)",
          "rgba(52, 152, 219, 0.8)",
          "rgba(88, 214, 141, 0.8)",
          "rgba(81, 90, 90, 0.8)",
          "rgba(213, 216, 220, 0.8)",
        ],
      },
    ],
  });

  function componentLoading() {
    return (
      <span style={{ fontSize: "14px", color: "#a1a1aa" }}> loading... </span>
    );
  }

  return (
    <>
      <Grid>
        <Grid xs={12} container spacing={2}>
          <Grid xs={8}>
            <div className="wapper-dasborad">
              <div className="wapper-graph">
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3 className="title-h3">ໝວດໝູ່ກຸ່ມ</h3>
                    <div className="report-update">
                      <p>
                        ຈຳນວນ
                        <span
                          style={{
                            color: "#ffffff",
                            fontWeight: "bold",
                            padding: "0 .5rem",
                          }}
                        >
                          {countCate}
                        </span>
                        ປະເພດ
                      </p>
                    </div>
                  </div>
                  <p className="text-des" style={{ visibility: 'hidden' }}>
                    h
                  </p>
                </div>

                <MyDoughnutChart chartData={loading ? DoughnutData : ChartDoughnut} />
              </div>
            </div>
          </Grid>
          <Grid xs={4}>
            <div className="wapper-dasborad">
              <div className="wapper-graph">
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3 className="title-h3">ລວມສະຖານະເບີ</h3>
                    {/* <div className="report-update">
                      <p>Dec, 2022</p>
                    </div> */}
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <table className="list-report">
                      <tr>
                        <th width={200} style={{ textAlign: "left" }}>
                          ສະຖານະ
                        </th>
                        <th width={100}>ຈຳນວນເບີ</th>
                      </tr>
                      <tbody>
                        <tr>
                          <td>ຮັບນະໂຍບາຍ</td>
                          <td>
                            {
                              loading
                                ? componentLoading()
                                : <span style={{ fontSize: '1rem' }}>
                                  {countActive[0]['active'].toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </span>
                            }
                          </td>
                        </tr>
                        <tr>
                          <td>ໃກ້ຈະໝົດນະໂຍບາຍ</td>
                          <td>-</td>
                        </tr>
                        <tr>
                          <td>ໝົດນະໂຍບາຍ</td>
                          <td>
                            {
                              loading
                                ? componentLoading()
                                : <span style={{ fontSize: '1rem' }}>
                                  {countActive[0]['deactive'].toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                </span>
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid xs={12}>
            <div className="wapper-dasborad">
              <div className="wapper-graph">
                <div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3 className="title-h3">ລາຍງານປະເພດໝວດໝູ່ VIP</h3>
                    <div className="report-update">
                      <p>
                        ຈຳນວນ
                        <span style={{ color: "#ffffff", fontWeight: "bold", padding: "0 .5rem", }}>
                          {countType}
                        </span>
                        ປະເພດ
                      </p>
                    </div>
                  </div>
                </div>
                <Grid xs={11} sx={{ marginLeft: '2rem' }}>
                  <MyBarChartHorizontal chartData={loading ? userData : ChartBar} />
                </Grid>
              </div>
            </div>
          </Grid>
          <Grid xs={12}>
            <div className="wapper-dasborad">
              <div className="wapper-graph">
                <h3 className="title-h3">ປຽບທຽບໝວດໝູ່ປະເພດ VIP</h3>
                <p className="text-des" style={{ marginBottom: '1rem' }}>
                  ຈຳນວນປຽບທຽບຈາກກຣາຟດ້ານເທິງ
                </p>
                <table className="list-type">
                  <tr>
                    <th rowspan="2" className="title-re">ສະຖານະ</th>
                    <th colspan="23" className="title-re2">ປະເພດ VIP</th>
                  </tr>
                  <tr>
                    {
                      dataTable.map((x) => (
                        <>
                          <th className="header"><span>{x.vipType}</span></th>
                        </>
                      ))
                    }
                  </tr>
                  <tr>
                    <td>ຮັບນະໂຍບາຍ</td>
                    {
                      dataTable.map((x) => (
                        <td>{x.active}</td>
                      ))
                    }
                  </tr>
                  <tr>
                    <td>ໝົດນະໂຍບາຍ</td>
                    {
                      dataTable.map((x) => (
                        <td>{x.deactive}</td>
                      ))
                    }
                  </tr>
                </table>
              </div>
            </div>

          </Grid>

          {/* <Grid xs={12}>
            <Grid className="container-cate">
              <Grid
                container
                className="wapper-cate"
                style={{ padding: ".5rem" }}
              >
                <Grid xs={12} className="content-cate">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3 className="my-h3" style={{ padding: "1em" }}>
                      ລາຍການລ່າສຸດ
                    </h3>
                    <div style={{ display: "flex", padding: "1em" }}>
                      <div style={{ paddingTop: ".25rem" }}></div>
                    </div>
                  </div>

                  <table className="list-cate">
                    <tr>
                      <th width={5} style={{ textAlign: "center" }}></th>
                      <th width={200} style={{ textAlign: "left" }}>
                        ໝາຍເລກ
                      </th>
                      <th width={100} style={{ textAlign: "left" }}>
                        ປະເພດ
                      </th>
                      <th width={150}>ໝວດໝູ່</th>
                      <th width={150}>ປະເພດກຸ່ມ</th>
                      <th width={150}>ວັນທີຮັບນະໂຍບາຍ</th>
                      <th width={150}>ວັນທີສິ້ນສຸດນະໂຍບາຍ</th>
                      <th width={100}>ສະຖານະ</th>
                      <th width={150} style={{ textAlign: "center" }}>
                        ລາຍລະອຽດ
                      </th>
                    </tr>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>2055514496</td>
                        <td>VIP7</td>
                        <td>ບໍ່ສາມາດຈັດໝວດໄດ້</td>
                        <td>ບໍ່ສາມາດຈັດໝວດໄດ້</td>
                        <td>14-03-2022</td>
                        <td>14-03-2023</td>
                        <td>
                          <span className="status">Active</span>
                        </td>
                        <td align="center">
                          <Button
                            variant="contained"
                            size="small"
                            className="btn-view"
                          >
                            <Icon_View />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Grid>
    </>
  );
}
