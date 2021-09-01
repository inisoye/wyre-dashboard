import React from 'react'
import { List, Divider, Card } from 'antd';

const TimeOfUseCard = ({data}) => {
      const  cardValueHeadingStyle = {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '20px',
        display: 'flex',
        justifyContent:'center',
      }

      const cardValueContentStyle = {
        display: 'flex',
        justifyContent:'center',
        marginTop: '16px',
        fontSize: '1.6rem'
        }

    let result = Object.entries(data.usage_hours)[0][1].map((item, index)=> ({device_name: item, hours: data.usage_hours.hours[index]}));
      
    return (
        <div style={{marginTop:'20px', marginBottom:'20px'}}>          
            <Divider orientation="center" style={cardValueHeadingStyle}>{data.name}</Divider>
            <List 
            style={{display:"initial", justifyContent:'center'}}
            grid={{ gutter: 16, column: 4, xs: 1,
              sm: 2, md: 2,}}
            dataSource={result}
            renderItem={item=>(
            <>
            <List.Item>
              <Card>
                <h3 style={cardValueHeadingStyle}>{item.device_name}</h3>
                <p style={cardValueContentStyle}>{parseFloat(item.hours).toFixed(2)}</p>
              </Card>
            </List.Item>
            </>
            )}
            /> 
        </div>
    )
}

export default TimeOfUseCard