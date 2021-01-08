import React, { useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker, TimePicker, Select } from 'antd';
import CompleteDataContext from '../Context';

import { CaretDownFilled } from '@ant-design/icons';

import BreadCrumb from '../components/BreadCrumb';

import PrintButtons from '../smallComponents/PrintButtons';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/client-profile', name: 'Client Profile', id: 2 },
];

const { Option } = Select;
const { RangePicker } = TimePicker;

function ClientProfile({ match }) {
  const { setCurrentUrl } = useContext(CompleteDataContext);

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  const { register, handleSubmit, setValue, control, errors } = useForm();

  const customerTypeSelector = (
    <Select
      className='client-info-select h-4-br customer-type-selector'
      id='customer-type'
      defaultValue='multi-site'
      suffixIcon={<CaretDownFilled />}
      onChange={(e) => setValue('customerType', e.target.value, true)}
    >
      <Option className='customer-type-option' value='multi-site'>
        Multi site
      </Option>
      <Option className='customer-type-option' value='single-site'>
        Single site
      </Option>
    </Select>
  );

  const operatingHoursTimePicker = (
    <RangePicker
      className='client-info-time-picker'
      id='site-operating-hours'
      onChange={(e) => setValue('siteOperatingHours', e.target.value, true)}
    />
  );

  const sourceTypeSelector = (
    <Select
      className='client-info-select h-4-br source-type-selector'
      id='source-type'
      defaultValue='utility'
      suffixIcon={<CaretDownFilled />}
      onChange={(e) => setValue('sourceType', e.target.value, true)}
    >
      <Option className='source-type-option' value='utility'>
        Utility
      </Option>
      <Option className='source-type-option' value='generator'>
        Generator
      </Option>
      <Option className='source-type-option' value='solar'>
        Solar
      </Option>
      <Option className='source-type-option' value='circuit/load'>
        Circuit/Load
      </Option>
    </Select>
  );

  const nextMaintDatePicker = (
    <DatePicker
      className='generic-input client-info-input'
      id='next-maint-date'
      onChange={(e) => setValue('nextMaintDate', e.target.value, true)}
    />
  );

  const deviceTypeSelector = (
    <Select
      className='client-info-select h-4-br device-type-selector'
      id='device-type'
      defaultValue='1260331 - EM 137'
      suffixIcon={<CaretDownFilled />}
      onChange={(e) => setValue('deviceType', e.target.value, true)}
    >
      <Option className='device-type-option' value='1260331 - EM 137'>
        1260331 - EM 137
      </Option>
      <Option className='device-type-option' value='152621 - EM 113'>
        152621 - EM 113
      </Option>
      <Option className='device-type-option' value='323225 - EM 112'>
        323225 - EM 112
      </Option>
      <Option className='device-type-option' value='123456 - EM 222'>
        123456 - EM 222
      </Option>
    </Select>
  );

  const onSubmit = ({
    clientName,
    phoneNumber,
    emailAddress,
    clientAddress,
    customerType,
    clientPhoto,
    siteName,
    siteAddress,
    contactPerson,
    siteOperatingHours,
    sourceName,
    sourceType,
    maintSchedule,
    nextMaintDate,
    deviceType,
  }) => {
    // obtain form inputs here
    console.log(
      clientName,
      phoneNumber,
      emailAddress,
      clientAddress,
      customerType,
      clientPhoto,
      siteName,
      siteAddress,
      contactPerson,
      siteOperatingHours,
      sourceName,
      sourceType,
      maintSchedule,
      nextMaintDate,
      deviceType
    );
  };

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
        <PrintButtons />
      </div>

      <div className='client-info-forms-content-wrapper'>
        <h1 className='center-main-heading'>Client Information</h1>

        <form
          action='#'
          className='client-info-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset className='client-info-form-inputs-wrapper'>
            <legend className='form-section-heading client-info-form-section-heading'>
              Client Details:
            </legend>

            <div className='client-info-input-container'>
              <label
                className='generic-input-label client-info-input-label'
                htmlFor='client-name'
              >
                Client Name
              </label>
              <input
                className='generic-input'
                type='text'
                name='clientName'
                id='client-name'
                ref={register}
                required
                autoFocus
              />
            </div>

            <div className='client-info-input-container'>
              <label
                className='generic-input-label client-info-input-label'
                htmlFor='phone-number'
              >
                Phone Number
              </label>
              <input
                className='generic-input'
                type='text'
                inputMode='decimal'
                name='phoneNumber'
                id='phone-number'
                ref={register}
                required
              />
            </div>

            <div className='client-info-input-container h-no-mr'>
              <label
                className='generic-input-label client-info-input-label'
                htmlFor='email-address'
              >
                Email Address
              </label>
              <input
                className='generic-input'
                type='email'
                name='emailAddress'
                id='email-address'
                ref={register}
                required
              />
            </div>

            <div className='client-info-input-container'>
              <label
                className='generic-input-label client-info-input-label'
                htmlFor='client-address'
              >
                Address
              </label>
              <input
                className='generic-input'
                type='text'
                name='clientAddress'
                id='client-address'
                ref={register}
                required
              />
            </div>

            <div className='client-info-input-container'>
              <label
                className='generic-input-label client-info-input-label'
                htmlFor='customer-type'
              >
                Customer Type
              </label>

              <Controller
                as={customerTypeSelector}
                name='customerType'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                }}
                help={errors.customerType && 'Please select a value'}
              />
              <p className='input-error-message'>
                {errors.customerType && 'Please select a value'}
              </p>
            </div>

            <div className='client-info-input-container h-no-mr'>
              <label
                className='generic-input-label client-info-input-label'
                htmlFor='client-photo'
              >
                Upload Photo
              </label>
              <input
                className='generic-input client-info-photo-picker'
                type='file'
                name='clientPhoto'
                id='client-photo'
                ref={register}
                required
              />
            </div>
          </fieldset>

          <fieldset className='client-info-form-inputs-wrapper'>
            <legend className='form-section-heading client-info-form-section-heading'>
              Site Details:
            </legend>

            <div className='client-info-input-container'>
              <label
                className='generic-input-label client-info-input-label'
                htmlFor='site-name'
              >
                Site Name
              </label>
              <input
                className='generic-input'
                type='text'
                name='siteName'
                id='site-name'
                ref={register}
                required
              />
            </div>

            <div className='client-info-input-container'>
              <label
                className='generic-input-label client-info-input-label'
                htmlFor='site-address'
              >
                Site Address
              </label>
              <input
                className='generic-input'
                type='text'
                name='siteAddress'
                id='site-address'
                ref={register}
                required
              />
            </div>

            <div className='client-info-input-container h-no-mr'>
              <label
                className='generic-input-label client-info-input-label'
                htmlFor='contact-person'
              >
                Contact Person
              </label>
              <input
                className='generic-input'
                type='text'
                name='contactPerson'
                id='contact-person'
                ref={register}
                required
              />
            </div>

            <div className='client-info-input-container h-no-growth'>
              <label
                className='generic-input-label client-info-input-label'
                htmlFor='site-operating-hours'
              >
                Operating Hours
              </label>
              <Controller
                as={operatingHoursTimePicker}
                name='siteOperatingHours'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                }}
                help={errors.siteOperatingHours && 'Please enter a date'}
              />
              <p className='input-error-message'>
                {errors.siteOperatingHours && 'Please enter a date'}
              </p>
            </div>
          </fieldset>

          <fieldset className='client-info-form-inputs-wrapper'>
            <legend className='form-section-heading client-info-form-section-heading'>
              Device:
            </legend>

            <div className='client-info-input-container'>
              <label
                className='generic-input-label client-info-input-label'
                htmlFor='source-name'
              >
                Source Name
              </label>
              <input
                className='generic-input'
                type='text'
                name='sourceName'
                id='source-name'
                ref={register}
                required
              />
            </div>

            <div className='client-info-input-container'>
              <label
                className='generic-input-label client-info-input-label'
                htmlFor='source-type'
              >
                Source Type
              </label>
              <Controller
                as={sourceTypeSelector}
                name='sourceType'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                }}
                help={errors.sourceType && 'Please enter a date'}
              />
              <p className='input-error-message'>
                {errors.sourceType && 'Please enter a date'}
              </p>
            </div>

            <div className='client-info-input-container h-no-mr'>
              <label
                className='generic-input-label client-info-input-label'
                htmlFor='maint-schedule'
              >
                Maint. Schedule
              </label>
              <input
                className='generic-input'
                type='text'
                name='maintSchedule'
                id='maint-schedule'
                ref={register}
                required
              />
            </div>

            <div className='client-info-input-container h-no-growth'>
              <label
                className='generic-input-label client-info-input-label'
                htmlFor='next-maint-date'
              >
                Next Maint. Date
              </label>
              <Controller
                as={nextMaintDatePicker}
                name='nextMaintDate'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                }}
                validateStatus={
                  errors.nextMaintDate && 'Please enter a date' ? 'error' : ''
                }
                help={errors.nextMaintDate && 'Please enter a date'}
              />
              <p className='input-error-message'>
                {errors.nextMaintDate && 'Please enter a date'}
              </p>
            </div>

            <div className='client-info-input-container h-no-growth'>
              <label
                className='generic-input-label client-info-input-label'
                htmlFor='device-type'
              >
                Device
              </label>
              <Controller
                as={deviceTypeSelector}
                name='deviceType'
                control={control}
                defaultValue=''
                rules={{
                  required: true,
                }}
                help={errors.deviceType && 'Please enter a date'}
              />
              <p className='input-error-message'>
                {errors.deviceType && 'Please enter a date'}
              </p>
            </div>
          </fieldset>

          <button className='generic-submit-button client-info-form-submit-button'>
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default ClientProfile;
