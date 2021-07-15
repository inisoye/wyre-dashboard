import React, {useContext} from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import CompleteDataContext from '../Context';

const usePasswordToggle = () => {
    const {PasswordVisibility} = useContext(CompleteDataContext)
    const icon = PasswordVisibility ? <EyeTwoTone/> : <EyeInvisibleOutlined/>

    const InputType = PasswordVisibility ? 'text' : 'password'
    
    return [InputType, icon]
}

export default usePasswordToggle
