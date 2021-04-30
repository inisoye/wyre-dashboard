import React from 'react'
import { List, Divider, Card } from 'antd';
import { numberFormatter } from '../helpers/numberFormatter';

const TimeOfUseCard = ({data}) => {
      const  cardValueHeadingStyle = {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '20px',
        marginTop:'16px'
      }

      const cardValueContentStyle = {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '20px',
        color: '#000000',
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
              <Card title={item}>{parseFloat(data.usage_hours.hours).toFixed(2)}</Card>
            </List.Item>
            </>
            )}
            />
        </div>
    )
}

export default TimeOfUseCard