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

    return (
        <div style={{marginTop:'20px', marginBottom:'20px'}}>          
            <Divider orientation="center" style={cardValueHeadingStyle}>{data.name}</Divider>
            <List 
            style={{display:"initial", justifyContent:'center'}}
            grid={{ gutter: 16, column: 4, xs: 1,
              sm: 2, md: 2,}}
            dataSource={data.usage_hours.devices}
            renderItem={item=>(
            <>
            <List.Item>
              <Card >
                  <h3 style={cardValueHeadingStyle}>{item}</h3>
                  <p style={cardValueContentStyle}>{parseFloat(data.usage_hours.hours).toFixed(2)}</p>
                </Card>
            </List.Item>
            </>
            )}
            />
        </div>
    )
}

export default TimeOfUseCard