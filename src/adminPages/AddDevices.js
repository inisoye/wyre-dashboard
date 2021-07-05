import React, { useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker, Select } from 'antd';
import CompleteDataContext from '../Context';

import { CaretDownFilled } from '@ant-design/icons';

import BreadCrumb from '../components/BreadCrumb';


const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/view-devices', name: 'Manage', id: 2 },
  { url: '/view-devices', name: 'View Devices', id: 3 },
  { url: '#', name: 'Add Device', id: 4 },
];

const { Option } = Select;

function AddDevices({ match }) {
  const { setCurrentUrl } = useContext(CompleteDataContext);

  const { register, handleSubmit, setValue, control, errors } = useForm();

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  const dateAddedPicker = (
    <DatePicker
      format='DD-MM-YYYY'
      className='generic-input'
      id='equipment-purchase-date'
      onChange={(e) => setValue('dateAdded', e.target.value, true)}
    />
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
        True
      </Option>
      <Option className='active-state-option' value='false'>
        False
      </Option>
    </Select>
  );

  const onSubmit = ({ deviceCode, deviceType, activeState, dateAdded }) => {
    console.log(deviceCode, deviceType, activeState, dateAdded);
  };

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>

      <div className='cost-tracker-forms-content-wrapper'>
        <h1 className='center-main-heading'>Devices</h1>

        <section className='cost-tracker-form-section'>
          <form
            className='cost-tracker-form'
            action='#'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='cost-tracker-form-inputs-wrapper'>
              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='deviceCode'
                >
                  Device Code
                </label>
                <input
                  className='generic-input'
                  type='text'
                  name='deviceCode'
                  id='deviceCode'
                  ref={register}
                  required
                  autoFocus
                />
              </div>

              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='deviceType'
                >
                  Device Type
                </label>
                <input
                  className='generic-input'
                  type='text'
                  inputMode='decimal'
                  name='deviceType'
                  id='deviceType'
                  ref={register}
                  required
                />
              </div>

              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='active-state'
                >
                  Is Active ?
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

              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='equipment-purchase-date'
                >
                  Date Added
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
            </div>

            <button className='generic-submit-button cost-tracker-form-submit-button'>
              Add
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default AddDevices;
