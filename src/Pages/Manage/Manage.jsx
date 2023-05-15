import React, { useState, useEffect } from 'react';
import Axios from '../../Components/Axios/Axios';
import Box from '@mui/material/Box';
import { Button, TextField, Typography, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import OtherSelect from 'react-select';
import {
  IconArrowDown,
  IconArrowUp,
  IconSearch,
  Icon_View,
} from '../Icon/Icon';
import moment from 'moment';
import PropTypes from 'prop-types';
import { USER_KEY } from '../../Constants';
import { useHistory, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ManageTT from './ManageTT';
import { ceil } from 'lodash';
import PageEmptyPage from './PageEmptyPage';
import { ExportCSV } from '../../Components/Excel/ExportCSV';

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.selectProps.menuColor,
    fontSize: '15px',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  },
  control: (base) => ({
    ...base,
    borderRadius: '7px',
    textAlign: 'center'
  }),
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function ManagePage() {
  const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  const userName = tokenData.user[0].value;
  const header = {
    Authorization: `Bearer ${tokenData.token}`,
  };

  const [dataTable, setdataTable] = useState([]);
  const [dataCate, setdataCate] = useState([]);

  const [dataGroup, setDataGroup] = useState([]);
  const [networkType, setnetworkType] = useState([])

  const history = useHistory();

  const [loading, setloading] = useState(true);

  const [perPage] = useState(10);
  const [allpage, setAllpage] = useState(0);

  const [dataVIPType, setDataVIPType] = useState([]);

  const [emptyPage, setEmptyPage] = useState(false);

  const [changeBtn, setchangeBtn] = useState(false);
  const [dataBtn, setdataBtn] = useState([]);

  const [savePage, setsavePage] = useState(1);

  const [show, setShow] = useState(true);

  const local = useLocation();
  // console.log(local.state);

  const LoadDataNew = (page, limit) => {
    setdataTable([]);
    setloading(true);
    let newValue = isNaN(parseInt(selectCate)) ? 0 : parseInt(selectCate);
    let newValue2 = isNaN(parseInt(seletgroup.value)) ? 0 : parseInt(seletgroup.value);
    let newValue3 = getVIP === 'ທັງໝົດ' ? 'all' : getVIP;
    let newValue4 = getNetwork === 'ທັງໝົດ' ? 'all' : getNetwork;

    Axios.post(
      `/api/Group/QueryMsisdnInGroup?username=${userName}&page=${page}&limit=${limit}`,
      { cateId: newValue, groupId: newValue2, vipType: newValue3, phoneType: newValue4 },
      { headers: header }
    ).then((res) => {
      if (res.status === 200) {
        setsavePage(page)
        if (res.data.resultCode === 201) {
          // console.log("br mi data");
          setEmptyPage(true);
        } else {
          let count = res.data?.msisdnList?.length;
          // console.log(res.data?.msisdnList);
          // setsavePage(1)
          if (count > 0) {
            setEmptyPage(false);
            setdataTable((newValue = res.data?.msisdnList));
            setloading(false);
            setAllpage(ceil(res.data?.dataCount / perPage));
          } else {
            setEmptyPage(true);
          }
        }
      }
    });
  };

  const [download, setdownload] = useState(false);

  const LoadDataOnlyDownload = () => {
    let newValue = isNaN(parseInt(selectCate)) ? 0 : parseInt(selectCate);
    let newValue2 = isNaN(parseInt(seletgroup)) ? 0 : parseInt(seletgroup);
    let newValue3 = getVIP === 'ທັງໝົດ' ? 'all' : getVIP;
    let newValue4 = getNetwork === 'ທັງໝົດ' ? 'all' : getNetwork;

    // console.log(newValue4)
    Axios.post(
      `/api/Group/QueryMsisdnInGroup?username=${userName}&page=${savePage}&limit=${1000000}`,
      { cateId: newValue, groupId: newValue2, vipType: newValue3, phoneType: newValue4 },
      { headers: header }
    ).then((res) => {
      if (res.status === 200) {
        setdataBtn(res.data?.msisdnList);
        console.log(res.data?.msisdnList);
        setchangeBtn(false);
        setdownload(true);
      }
    });
  };

  function LoadData() {
    setloading(true);
    LoadDataNew(1, perPage);
    Axios.post(
      `/api/CategoriesVIP/QueryCategory?username=${tokenData.user[0].value}`,
      {},
      { headers: header }
    ).then((res) => {
      if (res.status === 200) {
        setdataCate([{ id: 0, catename: 'ທັງໝົດ' }, ...res.data]);
        // console.log(res.data);
      }
    })
    Axios.post(
      `/api/Group/QueryVIPGroup?username=${userName}&page=1&limit=1000`,
      {},
      { headers: header }
    ).then((res) => {
      if (res.status === 200) {
        setDataGroup(res.data.vipGroupList);
        // console.log(res.data.vipGroupList);
      }
    })
    Axios.options(
      `/api/FilterVIPType/SelectVIPType`,
      {},
      { headers: header }
    ).then((res) => {
      if (res.status === 200) {
        setDataVIPType([{ value: 'all', viptype: 'ທັງໝົດ' }, ...res.data]);
        // console.log(res.data)
      }
    })
    Axios.options(
      `/api/FilterNetworkType`,
      {},
      { headers: header }
    ).then((res) => {
      if (res.status === 200) {
        setnetworkType([{ value: 'all', viptype: 'ທັງໝົດ' }, ...res.data]);
        // console.log(res.data)
      }
    })
  }

  useEffect(() => {
    LoadData();
  }, []);

  const option_VIP = dataVIPType.map((x) => ({
    value: x.viptype,
    label: x.viptype,
  }));

  const option_cate = dataCate.map((x) => ({
    value: x.id,
    label: x.catename,
  }));

  const [first, setFirst] = useState([])

  const newGroup = () => {
    let update = [
      { value: 0, label: 'ທັງໝົດ' }
    ]
    dataGroup.map((x) => {
      update.push({ value: x.id, label: x.groupName })
    })
    setTimeout(() => {
      setFirst(update)
    }, 200);
  }

  const option_Group = dataGroup.map((x) => ({
    value: parseInt(x.id),
    label: x.groupName,
  }));

  const option_NetworkTpre = networkType.map((x) => ({
    value: x.viptype,
    label: x.viptype,
  }));

  const [selectCate, setSelectCate] = useState(0);
  function getCategory(e) {
    setSelectCate(e.value);
    setsavePage(1)
    // console.log(e.value);
    if (e.value !== 0) {
      Axios.options(`/api/Group/ListGroup?categoryId=${e.value}`, {
        headers: header,
      }).then((res) => {
        if (res.status === 200) {
          // setDataGroup(res.data);
          let update = [
            { value: 0, label: 'ທັງໝົດ' }
          ]
          res.data.map((x) => {
            update.push({ value: x.id, label: x.groupName })
          })
          setFirst(update)
          setseletgroup({ value: 0, label: 'ທັງໝົດ' })
          setShow(false);
        }
      });
    } else {
      setseletgroup({ value: 0, label: 'ທັງໝົດ' })
      setShow(true);
      // seletgroup(0)
    }
  }

  const [seletgroup, setseletgroup] = useState({ value: 0, label: 'ທັງໝົດ' });
  function getGroup(e) {
    setseletgroup(e);
    setsavePage(1)
    // console.log(e)
  }

  const [getVIP, setGetVIP] = useState('all');
  function getValueVIP(e) {
    setGetVIP(e.value);
    // console.log(e.value)
  }

  const [getNetwork, setGetNetwork] = useState('all');
  function getValueNetwork(e) {
    setGetNetwork(e.value);
    // console.log(e.value)
  }

  useEffect(() => {

    LoadDataNew(savePage, perPage);

  }, [selectCate, seletgroup, getVIP, getNetwork]);

  const [search, setSearch] = useState('');

  const HandleSearch = () => {
    if (search === '') {
      LoadData();
    } else {
      // console.log(search);
      setdataTable([]);
      setloading(true);
      Axios.post(
        `/api/MsisdnVIP/SearchMsisdn?username=${tokenData.user[0].value}&page=1&limit=1`,
        { msisdn: search },
        { headers: header }
      ).then((res) => {
        // console.log({ res });
        if (res.status === 200) {
          let count = res.data?.msisdnList.length;
          if (count > 0) {
            // console.log(count)
            setdataTable(res.data?.msisdnList);
            setloading(false);
            setAllpage(ceil(res.data?.dataCount / perPage));
          } else {
            setEmptyPage(true);
          }
          // console.log(res.data);
        }
      });
    }
  };

  const HandleBack = (e) => {
    if (search === '') {
      LoadData();
    }
  };

  const view_pofile = (e) => {
    let data = dataTable.filter((x) => x.msisdn === e);
    let sendPage = {
      data1: data[0],
      data2: savePage,
    };
    console.log(sendPage)
    history.push({ pathname: '/home/profile', state: sendPage });
  };

  function Row(props) {
    const { row } = props;
    const [openTable, setOpenTable] = useState(false);

    const findMsisdn = (e) => {
      setOpenTable(!openTable);
    };

    return (
      <>
        <TableRow sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none"
          }
        }}>
          <TableCell align="center">
            <Button
              variant=""
              aria-label="expand row"
              size="small"
              onClick={() => findMsisdn(row.msisdn)}
            >
              {openTable ? (
                <span style={{ display: 'flex' }}>
                  <span className="icon-show">
                    <IconArrowUp />
                  </span>
                  <span className="btn-show">ປິດ</span>
                </span>
              ) : (
                <span style={{ display: 'flex' }}>
                  <span className="icon-show">
                    <IconArrowDown />
                  </span>
                  <span className="btn-show">ແພັກເກັດ</span>
                </span>
              )}
            </Button>
          </TableCell>
          <TableCell align="left">
            <div>
              <span>
                {row.msisdn}

              </span>
              <br />
              <span className="group-type">
                {row.phoneType === null ? '-' : row.phoneType}
              </span>
            </div>
          </TableCell>
          <TableCell align="left">{row.vipType}</TableCell>

          <TableCell align="left">{row.cateName}</TableCell>
          <TableCell>
            <span>{row.groupName}</span>
          </TableCell>
          <TableCell>{moment(row.registerDate).format('DD-MM-YYYY')}</TableCell>
          <TableCell>
            {row.stopDate === '' ? (
              <span> - </span>
            ) : (
              moment(row.stopDate).format('DD-MM-YYYY')
            )}
          </TableCell>
          <TableCell align="center">
            <span className={row.status === 'True' ? 'status' : 'status-dis'}>
              {row.status === 'True' ? 'Active' : 'Disactive'}
            </span>
          </TableCell>
          <TableCell align="center">
            <Button
              // sx={{textAlign}}
              variant="contained"
              size="small"
              className="btn-view"
              onClick={() => view_pofile(row.msisdn)}
            >
              <Icon_View />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            style={{ background: '#CFCFCF', paddingBottom: 0, paddingTop: 0 }}
            colSpan={9}
          >
            <Collapse in={openTable} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <ManageTT msisdn={row.msisdn} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

  const handlePage = (x) => {
    // setsavePage(x);
    LoadDataNew(x, perPage);
    // console.log(savePage);
  };

  return (
    <>
      <div className="manage-container">
        <div>
          <Grid
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
            }}
          >
            <Grid xs={6}>
              <h2 className="header-title">ຂໍ້ມູນເບີ</h2>
            </Grid>
            <Grid xs={6}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  marginTop: '.5rem',
                }}
              >
                {/* <Button
                    variant="contained"
                    className="btn-base"
                    onClick={() => history.push("/home/manage/add")}
                  >
                    ເພີ່ມໃຫມ່
                  </Button> */}
              </div>
            </Grid>
          </Grid>
        </div>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <div
              style={{ display: 'flex', padding: '.5rem' }}
              className="wapper-manage"
            >
              <Grid xs={3 / 2.2}>
                <div>
                  <p className="manage-ft-text">ປະເພດ</p>
                  <OtherSelect
                    options={option_VIP}
                    defaultValue={{ value: 'all', label: 'ທັງໝົດ' }}
                    styles={customStyles}
                    onChange={(e) => getValueVIP(e)}
                  />
                </div>
              </Grid>
              <Grid xs={3 / 2.1}>
                <div>
                  <p className="manage-ft-text">ປະເພດເບີ</p>
                  <OtherSelect

                    options={option_NetworkTpre}
                    defaultValue={{ value: 'all', label: 'ທັງໝົດ' }}
                    styles={customStyles}
                    onChange={(e) => getValueNetwork(e)}
                  />
                </div>
              </Grid>
              <Grid xs={3 / 1.7}>
                <div>
                  <p className="manage-ft-text">ໝວດໝູ່</p>
                  <OtherSelect
                    options={option_cate}
                    defaultValue={{ value: 0, label: 'ທັງໝົດ' }}
                    styles={customStyles}
                    onChange={(e) => getCategory(e)}
                  />
                </div>
              </Grid>
              <Grid xs={3 / 1.5}>
                <div>
                  <p className="manage-ft-text">ກຸ່ມ</p>
                  <OtherSelect
                    isDisabled={show}
                    options={first}
                    // defaultValue={{ value: 0, label: 'ທັງໝົດ' }}
                    value={seletgroup}
                    styles={customStyles}
                    onChange={(e) => getGroup(e)}
                  />
                </div>
              </Grid>
              <Grid xs={6}>
                <div style={{ display: 'flex' }}>
                  <div>
                    <p className="manage-ft-text">ຄົ້ນຫາ</p>
                    <TextField
                      sx={{
                        width: { sm: 200, md: 300 },
                        '& .MuiInputBase-root': {
                          height: 38,
                          borderRadius: '7px',
                          fontFamily: 'Poppins, Noto Sans Lao',
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconSearch />
                          </InputAdornment>
                        ),
                      }}
                      autoComplete="off"
                      id="standard-basic"
                      variant="outlined"
                      placeholder="205xxxxxxx"
                      onKeyUp={HandleBack}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div style={{ marginLeft: '1.5rem', marginTop: '1.5rem' }}>
                    <Button
                      variant="contained"
                      className="btn-search"
                      onClick={HandleSearch}
                    >
                      ຄົ້ນຫາ
                    </Button>
                  </div>
                </div>
              </Grid>
            </div>
          </Grid>
          {emptyPage ? (
            <PageEmptyPage />
          ) : (
            <Grid xs={12}>
              <div className="wapper-manage ">
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <h3 className="my-h3" style={{ padding: '1em' }}>
                    <ExportCSV
                      csvData={dataBtn}
                      fileName={'VIP-' + moment(new Date()).format('YYYYMMDDHHmmss')}
                      use={(e) => {
                        LoadDataOnlyDownload();
                      }}
                      download={download}
                      cb={(e) => setdownload(e)}
                    />
                    <div></div>
                  </h3>
                  <div style={{ display: 'flex', padding: '1em' }}>
                    <div style={{ paddingTop: '.25rem' }}>
                      <Stack spacing={1}>
                        <Pagination
                          count={allpage}
                          page={savePage === 1 ? 1 : savePage}
                          defaultPage={1}
                          siblingCount={0}
                          shape="rounded"
                          onChange={(e, x) => handlePage(x)}
                        // onChange={handlePage}
                        />
                      </Stack>
                    </div>
                  </div>
                </div>
                <div>
                  <table className="list-phone">
                    <tr>
                      <th width={120}>#</th>
                      <th>ໝາຍເລກ</th>
                      <th>ປະເພດ</th>
                      <th>ໝວດໝູ່</th>
                      <th>ປະເພດກຸ່ມ</th>
                      <th>ວັນທີຮັບນະໂຍບາຍ</th>
                      <th width={120}>ວັນທີສິ້ນສຸດນະໂຍບາຍ</th>
                      <th>ສະຖານະ</th>
                      <th>ລາຍລະອຽດ</th>
                    </tr>
                    <tbody>
                      {dataTable.map((row) => (
                        <Row key={row.msisdn} row={row} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    </>
  );
}
