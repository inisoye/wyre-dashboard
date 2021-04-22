import React, { useContext } from 'react'
import { Card } from 'antd';

import  CompleteDataContext from "../Context";

const TimeOfUseCard = () => {
  const { organization } = useContext(CompleteDataContext)

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
        <div>
          
            <Card  bordered={true} title="Head office" headStyle={{display:'flex',justifyContent:'center',fontSize:'20px',fontWeight:'500px'}}>
          
              <Card.Grid style={gridStyle}>
                <p style={cardValueHeadingStyle}>EKEDC</p>
                <p style={cardValueContentStyle}>100hrs</p>
              </Card.Grid>
              )
            </Card>
          )
        
        </div>
    )
}

export default TimeOfUseCard
