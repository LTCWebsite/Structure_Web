import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Axios from "../../Components/Axios/Axios";
import { USER_KEY } from "../../Constants";
import Grid from "@mui/material/Unstable_Grid2";
import { Avatar, Skeleton, Stack } from "@mui/material";
import moment from "moment/moment";
import { IconArrowBack, IconInfo } from "../Icon/Icon";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
});


export default function Profile() {
  const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  const header = {
    Authorization: `Bearer ${tokenData.token}`,
  };

  const location = useLocation();

  const [localData] = useState(location.state.data1);
  const [currentPage] = useState(location.state.data2);
  // console.log(localData)

  const [getBSS, setGetBSS] = useState([]);
  const [getSPNV, setGetSPNV] = useState([]);

  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [loading2, setloading2] = useState(true);
  const [loading3, setloading3] = useState(true);

  const load = () => {
    setloading(true);
    setloading2(true);
    setloading3(true);

    Axios.get(`api/GetlistDetail?Msisdn=${localData["msisdn"]}`, {
      headers: header,
    }).then((res) => {
      if (res.status === 200) {
        setdata(res.data);
        setTimeout(() => {
          setloading(false);
          console.log('object');
        }, 1000);
        // console.table(res.data);
      }
    });
    Axios.post(
      `/api/controller/QueryBSS?username=${tokenData.user[0].value}`,
      { msisdn: `${localData["msisdn"]}` },
      { headers: header }
    ).then((res) => {
      if (res.status === 200) {
        setGetBSS(res.data);
        setTimeout(() => {
          setloading2(false);
        }, 1000);
        // console.log(res.data);
      }
    });
    Axios.post(
      `/api/QueryPkSPNV?msisdn=${localData["msisdn"]}`,
      {},
      { headers: header }
    ).then((res) => {
      if (res.status === 200) {
        setGetSPNV(res.data);
        setTimeout(() => {
          setloading3(false);
        }, 1000);
        // console.log(res.data);
      }
    });
  };

  const his = useHistory();

  useEffect(() => {
    load();
  }, []);

  function infoSupperNova() {
    const longText = `ຂໍ້ມູນແພັກເກັດທີ່ດືງມາຈາກລະບົບ Supper Nova`;
    return (
      <div>
        <CustomWidthTooltip title={longText} placement="top-start" arrow
          componentsProps={{
            tooltip: {
              sx: {
                background: '#FDEDEC',
                lineHeight: '1.3',
                fontSize: '.85rem',
                fontFamily: 'Noto Sans Lao',
                color: '#6F6F6F',
                border: '1px solid #F1948A',
                '& .MuiTooltip-arrow': {
                  color: '#F1948A',
                },
              }
            }
          }}>
          <button className="info"><IconInfo /></button>
        </CustomWidthTooltip>
      </div>
    )
  }

  function infoBSS() {
    const longText = `ຂໍ້ມູນແພັກເກັດທີ່ດືງມາຈາກລະບົບ BSS`;
    return (
      <div>
        <CustomWidthTooltip title={longText} placement="top-start" arrow
          componentsProps={{
            tooltip: {
              sx: {
                background: '#FDEDEC',
                lineHeight: '1.3',
                fontSize: '.85rem',
                fontFamily: 'Noto Sans Lao',
                color: '#6F6F6F',
                border: '1px solid #F1948A',
                '& .MuiTooltip-arrow': {
                  color: '#F1948A',
                },
              }
            }
          }}>
          <button className="info"><IconInfo /></button>
        </CustomWidthTooltip>
      </div>
    )
  }

  function infoVIP() {
    const longText = `ຂໍ້ມູນແພັກເກັດທີ່ດືງມາຈາກລະບົບ VIP`;
    return (
      <div>
        <CustomWidthTooltip title={longText} placement="top-start" arrow
          componentsProps={{
            tooltip: {
              sx: {
                background: '#FDEDEC',
                lineHeight: '1.3',
                fontSize: '.85rem',
                fontFamily: 'Noto Sans Lao',
                color: '#6F6F6F',
                border: '1px solid #F1948A',
                '& .MuiTooltip-arrow': {
                  color: '#F1948A',
                },
              }
            }
          }}>
          <button className="info"><IconInfo /></button>
        </CustomWidthTooltip>
      </div>
    )
  }

  return (
    <>
      <div className="manage-container">
        <a
          className="btn-back"
          href="/home/manage"
          onClick={() => {
            his.push({ pathname: "/home/manage", state: currentPage })
          }}
        >
          <span>
            <IconArrowBack /> ກັບຄືນ
          </span>
        </a>
        <p className="p-h3" style={{ marginBottom: "1rem" }}>
          ຂໍ້ມູນໂປຣໄຟ
        </p>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <div className="wapper-manage">
              <div className="p-content">
                <div style={{ display: "flex", height: "88px" }}>
                  <div style={{ paddingTop: ".5rem" }}>
                    <Stack
                      className="home_drawer_userIcon"
                      direction="row"
                      sx={{ marginLeft: "auto" }}
                    >
                      <Avatar
                        alt="User"
                        src="/static/images/avatar/1.jpg"
                        sx={{ background: "#F14D58" }}
                      />
                    </Stack>
                  </div>
                  <div style={{ paddingLeft: ".5rem", width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="text-title">ໝາຍເລກ</p>
                      <p style={{ fontSize: "18px" }}>{data.msisdn}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: ".5rem",
                      }}
                    >
                      <p className="text-title">ປະເພດເບີ</p>
                      <span className={"phoneType-" + data.phoneType}>
                        {data.phoneType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid xs={6}>
            <div className="wapper-manage">
              <div className="p-content">
                <Grid container>
                  <Grid xs={4}>
                    <div className="text-title">
                      <div className="border-circle">ປະເພດກຸ່ມ</div>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div>{data.category}</div>
                      <div>{data.group}</div>
                    </div>
                  </Grid>
                  <Grid xs={4}>
                    <div className="text-title">
                      <div className="border-circle">ປະເພດ</div>
                    </div>
                    <div>{data.vipType}</div>
                  </Grid>
                  <Grid xs={4}>
                    <div className="text-title">
                      <div className="border-circle">ຕຳແໜ່ງ</div>
                    </div>
                    <div>
                      {localData.position === null ? "-" : localData.position}
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
          {/* -------- Get Supper Nova */}
          <Grid xs={12}>
            <div className="wapper-manage">
              <div className="p-content">
                <div style={{ display: "flex" }}>
                  <span className="suppernona-bor"></span>
                  <div className="p-h3">ຂໍ້ມູນແພັກເກັດ Supper Nova</div>
                  <span style={{ paddingLeft: '.3rem', paddingTop: '.3rem' }}>{infoSupperNova()}</span>
                </div>
                <div style={{ margin: "1rem 0rem" }}>
                  <table className="list-pro">
                    <tr>
                      <th width={450} style={{ textAlign: "left" }}>
                        ລາຍການແພັກເກັດ
                      </th>
                      <th width={140} style={{ textAlign: "left" }}>
                        ລະຫັດແພັກເກັດ
                      </th>
                      <th width={200} style={{ textAlign: "left" }}>
                        ວັນທີຮັບນະໂຍບາຍ
                      </th>
                      <th width={250} style={{ textAlign: "left" }}>
                        ວັນທີສິ້ນສຸດນະໂຍບາຍ
                      </th>
                      <th width={150}>ສະຖານະ</th>
                    </tr>
                    <tbody>
                      {
                        loading ?
                          <tr >
                            <th colspan="5" style={{ background: '#fff', border: 'none', padding: '4px 0px' }}>
                              <Skeleton animation="wave" width="90%" height={35} />
                              <Skeleton animation="wave" width="60%" height={35} />
                            </th>
                          </tr>
                          :
                          getSPNV?.map((x, idx) => {
                            return (
                              <tr key={idx}>
                                <td align="left">{x.detail}</td>
                                <td align="left">
                                  {x.prom_program_code === null
                                    ? "-"
                                    : x.prom_program_code}
                                </td>
                                <td align="left">
                                  {moment(x.registerDate).format("DD-MM-YYYY")}
                                </td>
                                <td align="left">
                                  {moment(x.stopDate).isValid() === true
                                    ? moment(x.stopDate).format("DD-MM-YYYY")
                                    : "-"}
                                </td>
                                <td>
                                  <span
                                    className={
                                      x.isActive === null ? "status-dis" : "status"
                                    }
                                  >
                                    {x.isActive === null ? "Deactive" : "Active"}
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                      }

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Grid>
          {/* -------- Get BSS */}
          <Grid xs={12}>
            <div className="wapper-manage">
              <div className="p-content">
                <div style={{ display: "flex" }}>
                  <span className="bss-bor"></span>
                  <div className="p-h3">ຂໍ້ມູນແພັກເກັດ BSS</div>
                  <span style={{ paddingLeft: '.3rem', paddingTop: '.3rem' }}>{infoBSS()}</span>
                </div>
                <div style={{ margin: "1rem 0rem" }}>
                  <table className="list-pro">
                    <tr>
                      <th width={550} style={{ textAlign: "left" }}>
                        ລາຍການແພັກເກັດ
                      </th>
                      <th width={140} style={{ textAlign: "left" }}>
                        ລະຫັດແພັກເກັດ
                      </th>
                      <th width={150} style={{ textAlign: "left" }}>
                        ວັນທີຮັບນະໂຍບາຍ
                      </th>
                      <th width={150} style={{ textAlign: "left" }}>
                        ວັນທີສິ້ນສຸດນະໂຍບາຍ
                      </th>
                      <th width={100}>ສະຖານະ</th>
                      <th width={250} style={{ textAlign: "left" }}>
                        ຊື່
                      </th>
                    </tr>
                    <tbody>
                      {
                        loading2 ?
                          <tr >
                            <th colspan="5" style={{ background: '#fff', border: 'none', padding: '4px 0px' }}>
                              <Skeleton animation="wave" width="90%" height={35} />
                              <Skeleton animation="wave" width="60%" height={35} />
                            </th>
                          </tr>
                          :
                          getBSS.map((x, idx) => {
                            return (
                              <tr key={idx}>
                                <td align="left">{x.detail}</td>
                                <td align="left">{x.prom_program_code}</td>
                                <td align="left">
                                  {moment(x.registerDate).format("DD-MM-YYYY")}
                                </td>
                                <td>-</td>
                                <td>
                                  <span
                                    className={
                                      x.isActive === "Active"
                                        ? "status"
                                        : "status-dis"
                                    }
                                  >
                                    {x.isActive === "Active"
                                      ? "Active"
                                      : "Deactive"}
                                  </span>
                                </td>
                                <td align="left">{x.name}</td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Grid>
          {/* -------- Get VIP */}
          <Grid xs={12}>
            <div className="wapper-manage">
              <div className="p-content">
                <div style={{ display: "flex" }}>
                  <span className="vip-bor"></span>
                  <div className="p-h3">ຂໍ້ມູນແພັກເກັດ VIP</div>
                  <span style={{ paddingLeft: '.3rem', paddingTop: '.3rem' }}>{infoVIP()}</span>
                </div>
                <div style={{ margin: "1rem 0rem" }}>
                  <table className="list-pro">
                    <tr>
                      <th width={450} style={{ textAlign: "left" }}>
                        ລາຍການແພັກເກັດ
                      </th>
                      <th width={140} style={{ textAlign: "left" }}>
                        ລະຫັດແພັກເກັດ
                      </th>
                      <th width={200} style={{ textAlign: "left" }}>
                        ວັນທີຮັບນະໂຍບາຍ
                      </th>
                      <th width={250} style={{ textAlign: "left" }}>
                        ວັນທີສິ້ນສຸດນະໂຍບາຍ
                      </th>
                      <th width={150}>ສະຖານະ</th>
                    </tr>
                    <tbody>
                      {
                        loading3 ?
                          <tr >
                            <th colspan="5" style={{ background: '#fff', border: 'none', padding: '4px 0px' }}>
                              <Skeleton animation="wave" width="90%" height={35} />
                              <Skeleton animation="wave" width="60%" height={35} />
                            </th>
                          </tr>
                          :
                          data?.details?.map((x, idx) => {
                            return (
                              <tr key={idx}>
                                <td align="left">{x.packageName}</td>
                                <td align="left">{x.packageCode}</td>
                                <td align="left">
                                  {moment(x.registerDate).format("DD-MM-YYYY")}
                                </td>
                                <td align="left">
                                  {moment(x.stopEnd).isValid() === true
                                    ? moment(x.stopEnd).format("DD-MM-YYYY")
                                    : "-"}
                                </td>
                                <td>
                                  <span
                                    className={
                                      x.packageStatus === true
                                        ? "status"
                                        : "status-dis"
                                    }
                                  >
                                    {x.packageStatus === true
                                      ? "Active"
                                      : "Deactive"}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
