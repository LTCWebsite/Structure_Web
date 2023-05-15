import { TableCell, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Axios from '../../Components/Axios/Axios'
import { USER_KEY } from '../../Constants';
import moment from 'moment';
import Grid from '@mui/material/Unstable_Grid2';


function ManageTT({ msisdn }) {

     const tokenData = JSON.parse(localStorage.getItem(USER_KEY))
     const userName = tokenData.user[0].value
     const header = { Authorization: `Bearer ${tokenData.token}` }
     const [data, setdata] = useState([])
     const [loading, setloading] = useState(false)

     const load = () => {
          setloading(false)
          Axios.get(`api/GetlistDetail?Msisdn=${msisdn}`,
               { headers: header }
          ).then(res => {
               if (res.status === 200) {
                    setdata(res.data)
                    setloading(true)
               }
          })
     }
     useEffect(() => {
          load()
     }, [])

     return (
          <>
               {
                    loading &&
                    <>
                         <div className='manage-container ' style={{ marginTop: '1rem', background: '#fff' }} >
                              <h3 style={{ color: '#fff', fontWeight: 'bold', background: '#2d3436', padding: '8px 8px 5px' }}>ລາຍລະອຽດແພັກເກັດ</h3>
                              {/* <Grid container spacing={2} sx={{ paddingTop: '1.2rem' }}>
                                   <Grid xs={3}>
                                        <div style={{ display: 'flex' }}>
                                             <span className='sub-text'>ປະເພດ:</span>
                                             <Typography className='sub-detail'>{data.vipType}</Typography>
                                        </div>
                                   </Grid>
                                   <Grid xs={3}>
                                        <div style={{ paddingTop: '.5rem' }}>
                                             <span className='sub-text'>ປະເພດເບີ:</span>
                                             <span className={'phoneType-' + data.phoneType}>
                                                  {data.phoneType}
                                             </span>
                                        </div>

                                   </Grid>
                                   <Grid xs={3}>
                                        <div style={{ display: 'flex' }}>
                                             <span className='sub-text'>ໝວດໝູ່:</span>
                                             <Typography className='sub-detail'>{data.category}</Typography>
                                        </div>
                                   </Grid>
                                   <Grid xs={3}>
                                        <div style={{ display: 'flex' }}>
                                             <span className='sub-text'>ກຸ່ມ:</span>
                                             <Typography className='sub-detail'>{data.group}</Typography>
                                        </div>
                                   </Grid>
                              </Grid> */}
                         </div>
                         <table className='sub-package' style={{ marginBottom: '1.2rem' }}>
                              <tr>
                                   <th>ລາຍການ</th>
                                   <th>ວັນທີສິ້ນສຸດນະໂຍບາຍ</th>
                                   <th>ສະຖານະ</th>
                              </tr>
                              <tbody>
                                   {
                                        data?.details?.map((row, idx) => {
                                             return (
                                                  <tr key={idx}>
                                                       <td>
                                                            {row.packageName}
                                                       </td>
                                                       <td>
                                                            {moment(row.stopEnd).isValid() === true ? moment(row.stopEnd).format('DD-MM-YYYY') : "-"}
                                                       </td>
                                                       <td>
                                                            <span className={row.packageStatus === true ? 'status' : 'status-dis'}>
                                                                 {row.packageStatus === true ? "Active" : "Disactive"}
                                                            </span>
                                                       </td>
                                                  </tr>
                                             )
                                        })
                                   }
                              </tbody>

                         </table>
                    </>
               }
          </>
     )
}

export default ManageTT