import React, { useState, useEffect } from 'react'
import OtherSelect from 'react-select'
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Divider, TextField } from '@mui/material'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { USER_KEY } from '../../Constants';
import Axios from '../../Components/Axios/Axios';
import axios from 'axios';
import { IconUpload } from '../Icon/Icon';
import { toast } from 'react-toastify';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';


const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.selectProps.menuColor,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
  control: base => ({
    ...base,
    borderRadius: '7px'
  })
}
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
          <p>{children}</p>
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AddPhonePage() {

  const [value, setValue] = useState(0);
  const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
  const userName = tokenData.user[0].value;
  const header = {
    Authorization: `Bearer ${tokenData.token}`
  }

  const OnTab = (event, newValue) => {
    setValue(newValue);
  };

  const [inputFields, setInputFields] = useState([
    { name: '', age: '', pkname: '' }
  ])

  const addFields = () => {
    let newfield = { name: '', age: '', pkname: '' }

    setInputFields([...inputFields, newfield])
  }

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
    // console.log(inputFields)
  }

  const [category, setcategory] = useState([])

  const [allgroup, setallgroup] = useState([])
  const [group, setGroup] = useState([])

  const [alldetails, setAlldetails] = useState([])
  const [groupDetail, setGroupDetail] = useState([])

  const [loading, setloading] = useState(true)
  const [progress, setProgress] = React.useState(10);

  function LoadData() {
    Axios.post(`/api/CategoriesVIP/QueryCategory?username=${tokenData.user[0].value}`, {},
      { headers: header }
    ).then(res => {
      if (res.status === 200) {
        setcategory(res.data)
      }
    })
    Axios.post(`/api/Group/QueryVIPGroup?username=${tokenData.user[0].value}`, {},
      { headers: header }
    ).then(res => {
      if (res.status === 200) {
        setallgroup(res.data)
      }
    })
    Axios.post(`api/GroupDetail/QueryGroupDetails?username=${tokenData.user[0].value}&page=1&limit=100`, {},
      { headers: header }
    ).then(res => {
      if (res.status === 200) {
        setAlldetails(res.data)
        // console.log(res.data)
      }
    })
  }

  useEffect(() => {
    LoadData()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const option_Category = category.map(x => ({
    "value": x.id,
    "label": x.catename
  }))

  const option_Group = group.map(x => ({
    "value": x.id,
    "label": x.groupName
  }))

  const option_Detils = groupDetail.map(x => ({
    "value": x.id,
    "label": x.detailName
  }))

  const [selectCate, setSelectCate] = useState([])
  function getCategory(e) {
    setSelectCate(e)
    var getId = allgroup.filter(x => x.cateId === e.value)
    setGroup(getId)
  }

  const [selectGroup, setSelectGroup] = useState([])
  function getGroup(e) {
    setSelectGroup(e)
    var getId = alldetails.filter(x => x.groupId === e.value)
    setGroupDetail(getId)
    // console.log(e);
  }

  const [modelPurchase, setmodelPurchase] = useState({
    msisdn: '',
  })

  const [Index, setIndex] = useState([])
  const AddNumber = () => {
    let data = {
      msisdn: modelPurchase.msisdn
    }

    setIndex([...Index, data])
  }

  const RemoveMsisdn = (e) => {
    const new_id = Index.filter((item) => item.msisdn != e)
    setIndex(new_id)
  }

  const [imgUrl, setImgUrl] = useState('')
  const [relateUrl, setrelate] = useState('')

  const UPLOAD_ENDPOINT =
    "http://localhost/php/Upload/upload.php";

  const handleOnChange = async (e) => {
    const formData = new FormData();
    formData.append("fileToUpload", e.target.files[0]);
    formData.append("upload", "")
    return await axios.post(UPLOAD_ENDPOINT, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    }).then(res => {
      setImgUrl(res.data)
      // console.log(res.data)
    });
  };

  const OnchangeRate = async (e) => {
    const formData = new FormData();
    formData.append("fileToUpload", e.target.files[0]);
    formData.append("upload", "")
    return await axios.post(UPLOAD_ENDPOINT, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    }).then(res => {
      setrelate(res.data)
      // console.log(res.data)
    });
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      if (modelPurchase.msisdn === '') {
        toast.warning('ກະລຸນາປ້ອນຂໍ້ມູນ!', {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      } else {
        AddNumber()
        setmodelPurchase({ ...modelPurchase, msisdn: '' })
      }
    }
  }

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };

  return (
    <>
      <div className='manage-container' >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 className='header-title'>ເພີ່ມເບີ</h2>
          <div style={{ marginTop: '.5rem' }}>
            <Button style={{ marginRight: '1rem' }} variant='contained' className='btn-group' onClick={''}>ຈັດການກຸ່ມ</Button>
            <Button style={{ marginRight: '1rem' }} variant='contained' className='btn-group' onClick={''}>ຈັດການແພັກເກັດ</Button>
          </div>

        </div>
        <div className='wapper-manage' style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontWeight: 'bold', paddingBottom: '1.5rem' }}>ເລືອກປະເພດກຸ່ມທີ່ຕ້ອງການ</p>
          </div>
          <Grid container spacing={4} className='text-p-add'>
            <Grid xs={4}>
              <p>ເລືອກປະເພດກຸ່ມ</p>
              <OtherSelect styles={customStyles} options={option_Category} onChange={(e) => getCategory(e)} />
            </Grid>
            <Grid xs={4}>
              <p>ເລືອກກຸ່ມ</p>
              <OtherSelect styles={customStyles} options={option_Group} onChange={(e) => getGroup(e)} />
            </Grid>
            <Grid xs={4}>
              <p>ເລືອກຂະແໜງການ</p>
              <OtherSelect styles={customStyles} options={option_Detils} />
            </Grid>
          </Grid>
        </div>

        <div className='wapper-manage' style={{ marginTop: '1.5rem', padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontWeight: 'bold', paddingBottom: '1.5rem' }}>ເລືອກປະເພດກຸ່ມທີ່ຕ້ອງການ</p>
          </div>
          <Grid container className='text-p-add'>
            <Grid xs={12}>
              <Tabs value={value} onChange={OnTab} aria-label="basic tabs example">
                <Tab label="ແບບກຳນົດເອງ" {...a11yProps(0)} />
                <Tab label="ແບບນຳເຂົ້າ" {...a11yProps(1)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <div style={{ margin: '.5rem 1rem' }}>
                  <div style={{ marginBottom: '3rem' }}>
                    <Grid container xs={12}>
                      <Grid xs={3} style={{marginRight:'1rem'}}>
                        <div style={{ width: '150px', paddingTop: '.8em' }}>
                          <p style={{color:"#777"}}>ມື້ເລີ່ມຮັບນະໂຍບາຍ</p>
                        </div>
                        <Grid>
                          <TextField
                            type='date'
                            autoComplete='off'
                            className='my-textfield'
                            id="input-with-icon-textfield"
                            required
                            size='small'
                            variant="outlined"
                            fullWidth
                          // value={modelPurchase.starDate}
                          // onChange={(e) => setmodelMsisdn({ ...modelPurchase, starDate: e.target.value })}
                          />
                        </Grid>
                      </Grid>
                      <Grid xs={3}>
                        <div style={{ width: '150px', paddingTop: '.8em' }}>
                          <p style={{color:"#777"}}>ມື້ສິ້ນສຸດນະໂຍບາຍ</p>
                        </div>
                        <Grid>
                          <TextField
                            type='date'
                            autoComplete='off'
                            className='my-textfield'
                            id="input-with-icon-textfield"
                            required
                            size='small'
                            variant="outlined"
                            fullWidth
                          // value={modelPurchase.endDate}
                          // onChange={(e) => setmodelMsisdn({ ...modelPurchase, endDate: e.target.value })}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                  <Divider />
                  <p style={{ color: '#2d3436', fontSize: '16px', paddingTop: '1.5rem' }}>ປ້ອນໝາຍເລກ</p>
                  <div style={{ display: 'flex', marginBottom: '2rem' }}>
                    <TextField
                      autoComplete='off'
                      className='my-textadd'
                      id="input-with-icon-textfield"
                      size='small'
                      variant="outlined"
                      fullWidth
                      onKeyDown={handleKey}
                      placeholder='20xxxxxxxx, 21fhxxxxx, 030xxxxx'
                      value={modelPurchase.msisdn}
                      onChange={(e) => setmodelPurchase({ ...modelPurchase, msisdn: e.target.value })}
                    />
                    <Button variant='contained' className='btn-add-phone' onClick={AddNumber}>ເພີ່ມໝາຍເລກ</Button>
                  </div>
                  <p style={{ color: '#777', fontSize: '16px' }}>ລາຍການເບີນະໂຍບາຍ</p>
                  <table className='list-add'>
                    <tr>
                      <th></th>
                      <th>ໝາຍເລກ</th>
                      <th>ຈຳນວນດາຕ້າ</th>
                      <th>ຈຳນວນມູນຄ່າໂທ</th>
                      <th>ຈຳນວນ Speed</th>
                      <th>ຈຳນວນນາທີໂທ</th>
                    </tr>
                    <tbody>
                      {
                        Index?.map((row, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{row.msisdn}</td>
                              <td width={250}>
                                <TextField
                                  autoComplete='off'
                                  className='my-textfield'
                                  id="input-with-icon-textfield"
                                  name='name'
                                  size='small'
                                  variant="outlined"
                                  fullWidth
                                />
                              </td>
                              <td width={250}>
                                <TextField
                                  autoComplete='off'
                                  className='my-textfield'
                                  id="input-with-icon-textfield"
                                  name='name'
                                  size='small'
                                  variant="outlined"
                                  fullWidth
                                />
                              </td>
                              <td width={250}>
                                <TextField
                                  autoComplete='off'
                                  className='my-textfield'
                                  id="input-with-icon-textfield"
                                  name='name'
                                  size='small'
                                  variant="outlined"
                                  fullWidth
                                />
                              </td>
                              <td width={250}>
                                <TextField
                                  autoComplete='off'
                                  className='my-textfield'
                                  id="input-with-icon-textfield"
                                  name='name'
                                  size='small'
                                  variant="outlined"
                                  fullWidth
                                />
                              </td>
                              <td>
                                <Button onClick={() => RemoveMsisdn(row.msisdn)}>
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                  <div style={{ marginTop: '4rem' }}>
                    <Divider />

                    <form >
                      <Grid xs={12}>
                        <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Grid xs={6} sx={{ width: '100%', justifyContent: 'start' }}>
                            <div style={{ paddingTop: '.5rem', paddingRight: '2rem' }}>
                              <p>ໝາຍເຫດ</p>
                              <TextField
                                autoComplete='off'
                                id="input-with-icon-textfield"
                                size='small'
                                variant="outlined"
                                fullWidth
                                placeholder='ເນື້ອໃນ...'
                                multiline
                                rows={5}
                              />
                            </div>
                          </Grid>

                          <Grid xs={6} sx={{ width: '100%', justifyContent: 'start', marginBottom: '1rem', marginTop: '.5rem' }}>
                            <p style={{ color: '#777', fontWeight: 'bold' }}>ເອກະສານປະກອບ <span style={{ fontSize: '12px', color: '#777' }}>*ຂະໜາດເອກະສານບໍ່ເກີນ 4 MB</span> </p>
                            <div className='box-upload'>
                              <div>
                                <p style={{ marginBottom: '.8rem' }}><span className='remen'>1</span> ເອກະສານຕິດຄັດ</p>
                                <div style={{ display: 'flex', marginBottom: '.5rem' }}>
                                  <div>
                                    <label for="files" class="btn-upload-att">
                                      <span style={{ marginRight: '1rem' }}><IconUpload /></span>
                                      ອັບໂຫລດ
                                    </label>
                                    <input id="files" onChange={handleOnChange} style={{ visibility: 'hidden', width: '50px' }} type="file" />
                                  </div>
                                  <Box sx={{ width: '100%' }}>
                                    <LinearProgressWithLabel value={progress} />
                                  </Box>
                                </div>

                              </div>
                              <span style={{ color: '#777' }}> ປະເພດເອກະສານ: {imgUrl.substring(36)}</span>
                            </div >
                            <div style={{ marginTop: '2rem' }} className='box-upload'>
                              <div>
                                <p style={{ marginBottom: '.8rem' }}><span className='remen-2'>2</span>ເລືອກເອກະສານກ່ຽວຂ້ອງ</p>
                                <div style={{ marginBottom: '.5rem' }}>
                                  <label for="files" class="btn-upload-att">
                                    <span style={{ marginRight: '1rem' }}><IconUpload /></span>
                                    ອັບໂຫລດ
                                  </label>
                                  <input id="file2" onChange={OnchangeRate} style={{ visibility: 'hidden' }} type="file" />
                                </div>
                              </div>
                              <span style={{ color: '#777' }}> ປະເພດເອກະສານ: {relateUrl.substring(36)}</span>
                            </div>

                          </Grid>
                        </Grid>

                      </Grid>

                    </form>

                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}></TabPanel>
            </Grid>
          </Grid>
        </div>
      </div>
    </>

  )
}
