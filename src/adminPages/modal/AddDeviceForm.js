import React, { useState } from 'react';
import { Modal, Select, Checkbox } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { CaretDownFilled } from '@ant-design/icons';



function AddDeviceForm() {
    const [visible, setVisible] = useState(false);
    // modal form 
    const { Option } = Select;
    const { register, handleSubmit, setValue, control, errors } = useForm();
    const deviceTypeSelector = (
        <Select
            className='cost-tracker-select h-4-br'
            id='iconType-state'
            defaultValue='true'
            suffixIcon={<CaretDownFilled />}
            onChange={(e) => setValue('iconType', e.target.value, true)}
        >
            <Option className='active-state-option' value='EM133'>
                EM 133
            </Option>
            <Option className='active-state-option' value='EM122'>
                EM 122
            </Option>
            <Option className='active-state-option' value='EM111'>
                EM 111
            </Option>
            <Option className='active-state-option' value='EM141'>
                EM141
            </Option>
            <Option className='active-state-option' value='EM210'>
                EM 210
            </Option>
        </Select>
    );
    const activeStateSelector = (
        <Select
            className='cost-tracker-select h-4-br'
            id='active-state'
            defaultValue='true'
            suffixIcon={<CaretDownFilled />}
            onChange={(e) => setValue('activeState', e.target.value, true)}
        >
            <Option className='active-state-option' value='true'>
                Active
            </Option>
            <Option className='active-state-option' value='false'>
                Inactive
            </Option>
        </Select>
    );
    const iconTypeSelector = (
        <Select
            className='cost-tracker-select h-4-br'
            id='iconType-state'
            defaultValue='true'
            suffixIcon={<CaretDownFilled />}
            onChange={(e) => setValue('iconType', e.target.value, true)}
        >
            <Option className='active-state-option' value='500kWh'>
                500kWh
            </Option>
            <Option className='active-state-option' value='425Kwh'>
                425Kwh
            </Option>
            <Option className='active-state-option' value='425Kwh'>
                400Kwh
            </Option>
            <Option className='active-state-option' value='425Kwh'>
                320Kwh
            </Option>
            <Option className='active-state-option' value='425Kwh'>
                320Kwh
            </Option>
        </Select>
    );
    const onSubmit = ({ deviceName, deviceIdentity, deviceType, activeState, iconType }) => {
        console.log(deviceName, deviceIdentity, deviceType, activeState, iconType);
    };
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    // modal functions ends

    return <Modal visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)} width={1000} footer={null} >
        <div className='cost-tracker-forms-content-wrapper'>
            <h1 className='center-main-heading'>Device Form</h1>

            <section className='cost-tracker-form-section'>
                <form
                    className='cost-tracker-form'
                    action='#'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='' >
                        <Row>
                            <Col md={8}>
                                <div className='cost-tracker-input-container'>
                                    <label
                                        className='generic-input-label cost-tracker-input-label'
                                        htmlFor='deviceName'
                                    >
                                        Device Name
                                    </label>
                                    <input
                                        className='generic-input'
                                        type='text'
                                        name='deviceName'
                                        id='deviceName'
                                        ref={register}
                                        required
                                        autoFocus
                                    />
                                </div>
                            </Col>

                            <Col md={8}>
                                <div className='cost-tracker-input-container'>
                                    <label
                                        className='generic-input-label cost-tracker-input-label'
                                        htmlFor='deviceIdentity'
                                    >
                                        Device Identity
                                    </label>
                                    <input
                                        className='generic-input'
                                        type='text'
                                        name='deviceIdentity'
                                        id='deviceIdentity'
                                        ref={register}
                                        required
                                        autoFocus
                                    />
                                </div>
                            </Col>

                            <Col md={8}>
                                <div className='cost-tracker-input-container'>
                                    <label
                                        className='generic-input-label cost-tracker-input-label'
                                        htmlFor='active-state'
                                    >
                                        Device Type
                                    </label>

                                    <Controller
                                        as={deviceTypeSelector}
                                        name='deviceType'
                                        control={control}
                                        defaultValue=''
                                        rules={{
                                            required: true,
                                        }}
                                        help={errors.deviceType && 'Please select a value'}
                                    />
                                    <p className='input-error-message'>
                                        {errors.deviceType && 'Please select a value'}
                                    </p>
                                </div>
                            </Col>

                            <Col md={8}>
                                <div className='cost-tracker-input-container'>
                                    <label
                                        className='generic-input-label cost-tracker-input-label'
                                        htmlFor='active-state'
                                    >
                                        Active
                                    </label>

                                    <Controller
                                        as={activeStateSelector}
                                        name='activeState'
                                        control={control}
                                        defaultValue=''
                                        rules={{
                                            required: true,
                                        }}
                                        help={errors.activeState && 'Please select a value'}
                                    />
                                    <p className='input-error-message'>
                                        {errors.activeState && 'Please select a value'}
                                    </p>
                                </div>
                            </Col>

                            <Col md={8}>
                                <div className='cost-tracker-input-container'>
                                    <label
                                        className='generic-input-label cost-tracker-input-label'
                                        htmlFor='active-state'
                                    >
                                        Icon Type
                                    </label>

                                    <Controller
                                        as={iconTypeSelector}
                                        name='iconType'
                                        control={control}
                                        defaultValue=''
                                        rules={{
                                            required: true,
                                        }}
                                        help={errors.iconType && 'Please select a value'}
                                    />
                                    <p className='input-error-message'>
                                        {errors.iconType && 'Please select a value'}
                                    </p>
                                </div>
                            </Col>
                            <Col md={8}>
                                <div className='cost-tracker-input-container h-100' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                                    <Checkbox onChange={onChange}>Load</Checkbox>
                                    <Checkbox onChange={onChange}>Source</Checkbox>
                                </div>
                            </Col>
                            <Col md={8}>
                                <button className='generic-submit-button cost-tracker-form-submit-button'>
                                    Add
                                </button>
                            </Col>
                        </Row>

                    </div>
                </form>
            </section>
        </div>
    </Modal>
}

export default AddDeviceForm