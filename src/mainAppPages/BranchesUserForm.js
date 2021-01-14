import React, { useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from 'antd';
import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';

import PrintButtons from '../smallComponents/PrintButtons';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/branches', name: 'Branches', id: 2 },
  { url: '/branches/user-form', name: 'User Form', id: 3 },
];

function BranchesUserForm({ match }) {
  const { preloadedUserFormData, setCurrentUrl } = useContext(
    CompleteDataContext
  );

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  const { register, handleSubmit, setValue, control, errors } = useForm(
    preloadedUserFormData
      ? { defaultValues: preloadedUserFormData }
      : 'preloadedUserFormData'
  );

  const dateAddedPicker = (
    <DatePicker
      format='DD-MM-YYYY'
      className='generic-input user-form-input'
      id='date-added'
      onChange={(e) => setValue('nextMaintDate', e.target.value, true)}
    />
  );

  const onSubmit = ({
    name,
    phoneNumber,
    emailAddress,
    organisation,
    branch,
    dateAdded,
  }) => {
    // obtain form inputs here
    console.log(
      name,
      phoneNumber,
      emailAddress,
      organisation,
      branch,
      dateAdded
    );
  };

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
        <PrintButtons />
      </div>

      <div className='user-form-content-wrapper'>
        <h1 className='center-main-heading'>User Form</h1>

        <form
          action='#'
          className='user-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='user-form-inputs-wrapper'>
            <div className='user-form-input-container'>
              <label
                className='generic-input-label user-form-input-label'
                htmlFor='name'
              >
                Name
              </label>
              <input
                className='generic-input'
                type='text'
                name='name'
                id='name'
                ref={register}
                required
                autoFocus
              />
            </div>

            <div className='user-form-input-container'>
              <label
                className='generic-input-label user-form-input-label'
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

            <div className='user-form-input-container h-no-mr'>
              <label
                className='generic-input-label user-form-input-label'
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

            <div className='user-form-input-container'>
              <label
                className='generic-input-label user-form-input-label'
                htmlFor='organisation'
              >
                Organisation
              </label>
              <input
                className='generic-input'
                type='text'
                name='organisation'
                id='organisation'
                ref={register}
                required
              />
            </div>

            <div className='user-form-input-container h-not-visible h-hidden-1086-down'>
              <label
                className='generic-input-label user-form-input-label'
                htmlFor='branch'
              >
                Branch
              </label>
              <input
                className='generic-input'
                type='text'
                name='branch'
                id='branch'
                ref={register}
              />
            </div>

            <div className='user-form-input-container h-no-mr h-not-visible h-hidden-1086-down'>
              <label
                className='generic-input-label user-form-input-label'
                htmlFor='date-added'
              >
                Date Added
              </label>
              <Controller
                as={dateAddedPicker}
                name='dateAdded'
                control={control}
                defaultValue=''
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

          <button className='generic-submit-button user-form-submit-button'>
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default BranchesUserForm;
