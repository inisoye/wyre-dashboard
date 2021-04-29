import React, { useContext} from 'react'
import { Card } from 'antd';

import  CompleteDataContext from "../Context";

const TimeOfUseCard = ({data}) => {
  const { refinedRenderedData, organization } = useContext(CompleteDataContext)

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

    return (
        <div style={{marginTop:'20px', marginBottom:'20px'}}>
         {data && [data].map((x,i)=>
              <Card key={i} bordered={true} title={x.name} headStyle={{display:'flex',justifyContent:'center',fontSize:'20px',fontWeight:'500px'}}>
                {[x.usage_hours].map((data)=>
                    <Card.Grid style={gridStyle}>
                      {data.devices.map((device)=><p style={cardValueHeadingStyle}>{device}</p>) }
                      {data.hours.map((hour)=><p style={cardValueContentStyle}>{hour}hrs</p>)}
                    </Card.Grid>
                )
                  
                }
              </Card>
         ) 
          }
        </div>
    )
}

export default TimeOfUseCard
