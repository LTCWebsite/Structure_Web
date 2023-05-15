import React, { useState, useEffect } from 'react'
import Axios from '../../Components/Axios/Axios';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Divider, Checkbox, Skeleton, InputAdornment } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import OtherSelect from 'react-select'
import { IconArrowDown, IconArrowUp, IconSearch, Icon_View } from '../Icon/Icon';
import moment from 'moment';
import PropTypes from 'prop-types';
import { USER_KEY } from '../../Constants';
import { useHistory } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ManageTT from './ManageTT';

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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ManagePage() {

    const tokenData = JSON.parse(localStorage.getItem(USER_KEY));
    const userName = tokenData.user[0].value;
    const header = {
        Authorization: `Bearer ${tokenData.token}`
    }
    // console.log(tokenData);

    const [dataTable, setdataTable] = useState([])
    const [datagroup, setdatagroup] = useState([])
    const [datapackage, setdatapackage] = useState([])
    const [open, setOpen] = useState({ edit: false, add: false, view: false })

    const [value, setValue] = useState(0);
    const history = useHistory()
    const [search, setSearch] = useState([])


    const [loading, setloading] = useState(true)
    const [allmodel, setAllmodel] = useState(false)
    const [demodata, setDemodata] = useState([])

    const [detailsPK, setDetailsPK] = useState([])

    function LoadData() {
        Axios.post(`/api/MsisdnVIP/GetMsisdnVIP?page=1&limit=1000`, {}, { headers: header }
        ).then(res => {
            if (res.status === 200) {
                setdataTable(res.data)
                // console.log(res.data);
                setTimeout(() => {
                    setloading(false)
                }, 1000)
            }
        })
        Axios.post(`/api/CategoriesVIP/QueryCategory?username=${tokenData.user[0].value}`, {},
            { headers: header }
        ).then(res => {
            if (res.status === 200) {
                setdatagroup(res.data)
                // console.log(res.data);
            }
        })

    }

    useEffect(() => {
        LoadData()
    }, [])

    const [modelMsisdn, setmodelMsisdn] = useState({
        msisdn: '',
        groupId: '',
        groupName: '',
        infoId: '',
        status: '',
        importDate: '',
        importUser: '',
        modifyDate: '',
        modifyUser: '',
        typeInsert: '',
        relatedFile: '',
        fileUpload: '',
        remark: ''
    })

    const [modelPurchase, setmodelPurchase] = useState({
        msisdnId: '',
        msisdn: '',
        registerDate: '',
        startDate: '',
        stopDate: '',
        packageId: '',
        packageName: '',
        createUser: '',
        modifyDate: '',
        modifyUser: '',
        status: '',
    })

    const option_group = datagroup.map(x => ({
        "value": x.id,
        "label": x.catename
    }))

    const options_filter = [
        { value: 'all', label: 'ທັງໝົດ' },
        { value: 'M-Phone', label: 'M-phone' },
        { value: 'HSPA', label: 'HSPA' },
        { value: 'Postpaid', label: 'Post-paid' },
        { value: 'FTTH', label: 'FTTH' },
        { value: 'ADSL', label: 'ADSL' },
    ];

    const HandleFilter = (e) => {
        setAllmodel(true)
        let value = e.value
        if (value === 'all') {
            setDemodata(dataTable)
        }
        else {
            let search = dataTable.filter(x => x.phoneType === value)
            setDemodata(search)
        }
    }

    const [seletgroup, setseletgroup] = useState([])
    function getGroup(e) {
        setseletgroup(e)
        // console.log(e)
    }

    const [query, setQuery] = useState("")

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

    const OpenAddData = () => {
        setmodelMsisdn({
            msisdn: '',
            groupId: '',
            groupName: '',
            infoId: '',
            status: '',
            importDate: new Date(),
            importUser: '',
            modifyDate: new Date(),
            modifyUser: '',
            typeInsert: '',
            relatedFile: '',
            fileUpload: '',
            remark: ''
        })

        setmodelPurchase({
            msisdn: '',
            registerDate: new Date(),
            startDate: new Date(),
            stopDate: new Date(),
            packageId: '',
            packageName: '',
            createUser: '',
            modifyDate: new Date(),
            modifyUser: '',
            status: '',
        })
        setOpen({ ...open, add: true })
    }

    // const SaveData = () => {
    //     // let sendData = [{
    //     //     msisdn: modelMsisdn.msisdn,
    //     //     groupId: seletgroup.value,
    //     //     groupName: seletgroup.label,
    //     //     infoId: 1,
    //     //     status: true,
    //     //     importDate: moment(modelMsisdn.importDate).format('YYYY-MM-DDTHH:mm:ss.000Z'),
    //     //     importUser: userName.substring(0, 6),
    //     //     modifyDate: moment(modelMsisdn.modifyDate).format('YYYY-MM-DDTHH:mm:ss.000Z'),
    //     //     modifyUser: userName.substring(0, 6),
    //     //     typeInsert: value == 0 ? 'Key_in' : 'Import_file',
    //     //     relatedFile: relateUrl,
    //     //     fileUpload: imgUrl,
    //     //     remark: modelMsisdn.remark
    //     // }]\

    //     let data = []

    //     inputFields.map(rows => {
    //         let dataReq = {
    //             msisdn: rows.name,
    //             msisdnId: 1,
    //             registerDate: moment(modelPurchase.registerDate).format('YYYY-MM-DDTHH:mm:ss.000Z'),
    //             startDate: moment(modelPurchase.startDate).format('YYYY-MM-DDTHH:mm:ss.000Z'),
    //             stopDate: moment(modelPurchase.stopDate).format('YYYY-MM-DDTHH:mm:ss.000Z'),
    //             packageId: parseInt(rows.age),
    //             packageName: rows.pkname,
    //             createUser: userName.substring(0, 6),
    //             modifyDate: moment(modelPurchase.modifyDate).format('YYYY-MM-DDTHH:mm:ss.000Z'),
    //             modifyUser: userName.substring(0, 6),
    //             status: true,
    //         }

    //         data.push(dataReq)
    //     })

    //     // console.log(data)

    //     // Axios.post('/api/MsisdnVIP/CreateMsisdnVIP',
    //     //     sendData
    //     //     , {
    //     //         headers: header
    //     //     }).then(res => {
    //     //         if (res.status === 200) {
    //     //             toast.success('ເພີ່ມຂໍ້ມູນໃຫມ່ສຳເລັດ', {
    //     //                 position: toast.POSITION.BOTTOM_RIGHT
    //     //             });

    //     //             setmodelMsisdn({
    //     //                 msisdn: '',
    //     //                 groupId: '',
    //     //                 groupName: '',
    //     //                 infoId: '',
    //     //                 status: '',
    //     //                 importDate: '',
    //     //                 importUser: '',
    //     //                 modifyDate: '',
    //     //                 modifyUser: '',
    //     //                 typeInsert: '',
    //     //                 relatedFile: '',
    //     //                 fileUpload: '',
    //     //                 remark: ''
    //     //             })

    //     //             LoadData()
    //     //         }
    //     //         else {
    //     //             toast.error('ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!', {
    //     //                 position: toast.POSITION.BOTTOM_RIGHT
    //     //             });
    //     //         }
    //     //     })

    //     Axios.post('/api/PurchasePackage/CreatePurchasePackage',
    //         data
    //         , {
    //             headers: header
    //         }).then(res => {
    //             if (res.status === 200) {
    //                 toast.success('ເພີ່ມຂໍ້ມູນໃຫມ່ສຳເລັດ', {
    //                     position: toast.POSITION.BOTTOM_RIGHT
    //                 });

    //                 setmodelPurchase({
    //                     msisdn: '',
    //                     registerDate: new Date(),
    //                     startDate: new Date(),
    //                     stopDate: new Date(),
    //                     packageId: '',
    //                     packageName: '',
    //                     createUser: '',
    //                     modifyDate: new Date(),
    //                     modifyUser: '',
    //                     status: '',
    //                 })

    //                 LoadData()
    //             }
    //             else {
    //                 toast.error('ບໍ່ສຳເລັດປ້ອນຂໍ້ມູນບໍ່ຖືກຕ້ອງ!', {
    //                     position: toast.POSITION.BOTTOM_RIGHT
    //                 });
    //             }
    //         })
    //     setOpen({ ...open, add: false })
    // }

    const HandleSearch = () => {
        setQuery(search)
    }

    const HandleBack = (e) => {
        if (search === "") {
            HandleSearch()
        }
    }

    const OnTab = (event, newValue) => {
        setValue(newValue);
    };



    const showRow = [
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '100', label: '100' }
    ]

    const view_pofile = (e) => {
        let data = dataTable.filter(x => x.msisdn === e)
        history.push({ pathname: '/home/profile', state: data[0] })
    }


    function Row(props: { row: ReturnType<typeof createData> }) {
        const { row } = props;
        const [openTable, setOpenTable] = useState(false);

        const findMsisdn = (e) => {
            setOpenTable(!openTable)
        }

        function SendMsisdn(id) {
            Axios.get(`api/GetlistDetail?Msisdn=${id}`,
                { headers: header }
            ).then(res => {
                if (res.status === 200) {
                    setDetailsPK(res.data)
                    // setOpenTable(true)
                    // console.log(res.data.details)
                }
            })
        }

        return (
            <>
                <TableRow sx={{ '& > *': { } }}>
                    <TableCell align="center">
                        <Button
                            variant=''
                            aria-label="expand row"
                            size="small"
                            onClick={() => findMsisdn(row.msisdn)}
                        >
                            {openTable
                                ? <span style={{ display: 'flex' }}>
                                    <span className='icon-show'><IconArrowUp /></span>
                                    <span className='btn-show'>ປິດ</span>
                                </span>
                                : <span style={{ display: 'flex' }}>
                                    <span className='icon-show'><IconArrowDown /></span>
                                    <span className='btn-show'>ສະແດງ</span>
                                </span>
                            }
                        </Button>
                    </TableCell>
                    <TableCell align="left" >
                        <div>
                            {row.msisdn}
                            <br />
                            <span className='group-type'>{row.position}</span>
                        </div>
                    </TableCell>
                    <TableCell align="left">{moment(row.importDate).format('DD-MM-YYYY')}</TableCell>
                    <TableCell align="left">{row.importUser}</TableCell>
                    <TableCell align="center">
                        <span className={row.status === true ? 'status' : 'status-dis'}>{row.status === true ? "Active" : "Disactive"}</span>
                    </TableCell>
                    <TableCell align='center'>
                        <Button variant='contained' size='small' className='btn-view'
                            onClick={() => view_pofile(row.msisdn)}>
                            <Icon_View />
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ background: '#f2f2f2', paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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



    return (
        <>
            <div className='manage-container' >
                <div>
                    <Grid xs={12} sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <Grid xs={6}>
                            <h2 className='header-title'>ຂໍ້ມູນເບີ</h2>
                        </Grid>
                        <Grid xs={6}>
                            <div style={{ display: 'flex', justifyContent: 'end', marginTop: '.5rem' }}>
                                <Button variant='contained' className='btn-base'
                                    onClick={() => history.push('/home/manage/add')}>
                                    ເພີ່ມໃຫມ່
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <Grid container spacing={3} >
                    <Grid xs={12} >
                        <div style={{ display: 'flex', padding: '.5rem' }} className='wapper-manage'>
                            <Grid xs={2}>
                                <div>
                                    <p className='manage-ft-text'>ປະເພດກຸ່ມ</p>
                                    <OtherSelect
                                        options={option_group}
                                        defaultValue={{ value: 'all', label: 'ທັງໝົດ' }}
                                        styles={customStyles}
                                        onChange={seletgroup}
                                    />
                                </div>
                            </Grid>
                            <Grid xs={2}>
                                <div>
                                    <p className='manage-ft-text'>ປະເພດເບີ</p>
                                    <OtherSelect
                                        options={options_filter}
                                        defaultValue={{ value: 'all', label: 'ທັງໝົດ' }}
                                        styles={customStyles}
                                        onChange={HandleFilter}
                                    />
                                </div>
                            </Grid>
                            <Grid xs={8}>
                                <div style={{ display: 'flex' }}>
                                    <div>
                                        <p className='manage-ft-text'>ຄົ້ນຫາ</p>
                                        <TextField
                                            sx={{
                                                width: { sm: 200, md: 300 },
                                                "& .MuiInputBase-root": {
                                                    height: 38,
                                                    borderRadius: '7px',
                                                    fontFamily: 'Poppins, Noto Sans Lao'
                                                }
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
                                    <div style={{ marginLeft: '1.5rem', marginTop: '1.5rem' }}>

                                        <Button variant='contained' className='btn-search'
                                            onClick={HandleSearch}>
                                            ຄົ້ນຫາ
                                        </Button>
                                    </div>
                                </div>

                            </Grid>

                        </div>
                    </Grid>
                    <Grid xs={12}>
                        <div className='wapper-manage '>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3 className='my-h3' style={{ padding: '1em' }}>ລາຍການລ່າສຸດ</h3>
                                <div style={{ display: 'flex', padding: '1em' }}>
                                    <div style={{ display: 'flex' }}>
                                        <p style={{ padding: '.5rem' }}>ສະແດງ</p>
                                        <OtherSelect options={showRow} defaultValue={{ value: '10', label: '10' }} />
                                    </div>

                                    <div style={{ paddingTop: '.25rem' }}>
                                        <Stack spacing={1}>
                                            <Pagination count={10} defaultPage={1} siblingCount={0} shape="rounded" />
                                        </Stack>
                                    </div>
                                </div>
                            </div>
                            <div>

                                <table className='list-phone'>
                                    <tr>
                                        <th width={120}>#</th>
                                        <th>ໝາຍເລກ</th>
                                        <th>ວັນທີສ້າງ</th>
                                        <th>ສ້າງໂດຍ</th>
                                        <th>ສະຖານະ</th>
                                        <th>ຈັດການ</th>
                                    </tr>
                                    <tbody>
                                        {dataTable
                                            .filter((x) => x.msisdn.toString().includes(query))
                                            .map((row) => (
                                                <Row key={row.msisdn} row={row} />
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div >
        </>

    )
}
