import React, { useState } from 'react';
import { Modal, Select, Checkbox } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { CaretDownFilled } from '@ant-design/icons';
function AddUserForm() {
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
    const dateAddedPicker = (
        <DatePicker
            format='DD-MM-YYYY'
            className='generic-input'
            id='equipment-purchase-date'
            onChange={(e) => setValue('dateAdded', e.target.value, true)}
        />
    );
    const onSubmit = ({ deviceName, deviceIdentity, deviceType, activeState, iconType }) => {
        console.log(deviceName, deviceIdentity, deviceType, activeState, iconType);
    };
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    // modal functions ends

    return <Modal visible={visible2}
        onOk={() => setVisible2(false)}
        onCancel={() => setVisible2(false)} width={1000} footer={null} >
        <div className='cost-tracker-forms-content-wrapper'>
            <h1 className='center-main-heading'>User Form</h1>

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
                                        Name
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
                                        Phone Number
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
                                        htmlFor='deviceIdentity'
                                    >
                                        Email Address
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
                                        Branch
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
                                        Roles
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
                                        Permissions
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
                                <div className='cost-tracker-input-container'>
                                    <label
                                        className='generic-input-label cost-tracker-input-label'
                                        htmlFor='equipment-purchase-date'
                                    >
                                        Date
                                    </label>
                                    <Controller
                                        as={dateAddedPicker}
                                        name='dateAdded'
                                        control={control}
                                        defaultValue=''
                                        rules={{
                                            required: true,
                                        }}
                                        validateStatus={
                                            errors.dateAdded && 'Please enter a date' ? 'error' : ''
                                        }
                                        help={errors.dateAdded && 'Please enter a date'}
                                    />
                                    <p className='input-error-message'>
                                        {errors.dateAdded && 'Please enter a date'}
                                    </p>
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

export default AddUserForm