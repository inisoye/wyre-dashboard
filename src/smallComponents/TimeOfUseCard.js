import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'antd';
import axios from 'axios'

import  CompleteDataContext from "../Context";

const TimeOfUseCard = () => {
  const [timeOfUseDataCard, setTimeOfUseDataCard] = useState()

  let timeOfUseUrl = 'https://api.jsonbin.io/b/608544d8f6655022c46b5c3f'

  useEffect(() => {
      axios.get(timeOfUseUrl)
      .then((res)=>{
        setTimeOfUseDataCard(res.data.authenticatedData.branches[0].usage_hours)
      })
      .catch(err=>console.log('from timeOfUseCard:',err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const gridStyle = {
        width: '33%',
        textAlign: 'center',
      };

      const  cardValueHeadingStyle = {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '18px',
        lineHeight: '21.94px',
        color: '#000000',
        marginBottom:'16px'
      }

      const cardValueContentStyle = {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '20px',
        color: '#000000'
        }

    const devices = timeOfUseDataCard && timeOfUseDataCard.devices
    const hours = timeOfUseDataCard && timeOfUseDataCard.hours
    return (
        <div>
          <Card bordered={true} title="Head office" headStyle={{display:'flex',justifyContent:'center',fontSize:'20px',fontWeight:'500px'}}>
              {
                <Card.Grid style={gridStyle}>
                    {devices && devices.map((device)=>
                      <p style={cardValueHeadingStyle}>{device.toUpperCase()}</p>
                    )}
                    {
                    hours && hours.map((hour)=>
                      <p style={cardValueContentStyle}>{hour}hrs</p>
                    )
                    }
                </Card.Grid>
              }
          </Card>
        </div>
    )
}

export default TimeOfUseCard
