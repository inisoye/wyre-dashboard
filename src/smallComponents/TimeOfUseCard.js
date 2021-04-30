import React from 'react'
import { List, Divider, Card } from 'antd';
import { numberFormatter } from '../helpers/numberFormatter';

const TimeOfUseCard = ({data}) => {

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
        color: '#000000',
        }

    console.log(data)
  
    return (
        <div style={{marginTop:'20px', marginBottom:'20px', background:'white'}}>          
            <Divider orientation="center">{data.name}</Divider>
            <List 
            style={{marginLeft:'20px'}}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 6,
              xl: 6,
              xxl: 3,
            }}
            dataSource={data.usage_hours.devices}
            renderItem={item=>(
            <>
            <List.Item>
              <Card title={item} >{parseFloat(data.usage_hours.hours).toFixed(2)}</Card>
            </List.Item>
            </>
            )}
            />
        </div>
    )
}

export default TimeOfUseCard

// {data && [data].map((x,i)=>
//   <Card key={i} bordered={true} title={x.name} headStyle={{display:'flex',justifyContent:'center',fontSize:'20px',fontWeight:'500px'}}>
//     {[x.usage_hours].map((data)=>
//         <Card.Grid style={gridStyle}>
//           {data.devices.map((device)=><p style={cardValueHeadingStyle}>{device}</p>) }
//           {data.hours.map((hour)=><p style={cardValueContentStyle}>{hour}hrs</p>)}
//         </Card.Grid>
//     ) 
//     }
//   </Card>
//     )}