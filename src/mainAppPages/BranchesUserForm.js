import React, { useEffect, useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker, notification } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import CompleteDataContext from '../Context';

import branchesHttpServices from '../services/userBranches';

import BreadCrumb from '../components/BreadCrumb';

import PrintButtons from '../smallComponents/PrintButtons';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/branches', name: 'Branches', id: 2 },
  { url: '/branches/user-form', name: 'User Form', id: 3 },
];

const openNotificationWithIcon = (type, userName, action) => {
  notification[type]({
    message: 'Bill Updated',
    description: `${userName} successfully ${action}`,
  });
};

function BranchesUserForm({ match }) {
  const { preloadedUserFormData, setCurrentUrl } = useContext(
    CompleteDataContext
  );
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  // Get all users
  useEffect(() => {
    branchesHttpServices.getAll('users').then((returnedData) => {
      setAllUsers(returnedData);
    });
  }, []);

  const { register, handleSubmit, setValue, control, errors } = useForm(
    preloadedUserFormData ? { defaultValues: preloadedUserFormData } : ''
  );

  const dateAddedPicker = (
    <DatePicker
      format="DD-MM-YYYY"
      className="generic-input user-form-input"
      id="date-added"
      onChange={(e) => setValue('nextMaintDate', e.target.value, true)}
    />
  );

  const onSubmit = ({ name, phone, email, organisation }) => {
    const newUserData = {
      name,
      email,
      phone,
      organisation,
    };

    const userAlreadyExists = allUsers.some(
      (eachUser) => eachUser.id === preloadedUserFormData.id
    );

    /* 
    If form is not prefilled add new data
    Otherwise, replace data
    */
    if (!userAlreadyExists) {
      branchesHttpServices
        .add({ ...newUserData, id: uuidv4() }, 'users')
        .then((returnedUser) => {
          setAllUsers(allUsers.concat(returnedUser));
          openNotificationWithIcon('success', `${returnedUser.name}`, 'added');
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      const id = preloadedUserFormData.id;
      const updatedUser = { ...preloadedUserFormData, ...newUserData };

      branchesHttpServices
        .update(updatedUser, 'users', id)
        .then((returnedUser) => {
          setAllUsers(
            allUsers.map((eachUser) =>
              eachUser.id !== returnedUser.id ? eachUser : returnedUser
            )
          );
          openNotificationWithIcon(
            'success',
            `${returnedUser.name}`,
            'updated'
          );
        });
    }
  };

  return (
    <>
      <div className="breadcrumb-and-print-buttons">
        <BreadCrumb routesArray={breadCrumbRoutes} />
        <PrintButtons />
      </div>

      <div className="user-form-content-wrapper">
        <h1 className="center-main-heading">User Form</h1>

        <form
          action="#"
          className="user-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="user-form-inputs-wrapper">
            <div className="user-form-input-container">
              <label
                className="generic-input-label user-form-input-label"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="generic-input"
                type="text"
                name="name"
                id="name"
                ref={register}
                required
                autoFocus
              />
            </div>

            <div className="user-form-input-container">
              <label
                className="generic-input-label user-form-input-label"
                htmlFor="email-address"
              >
                Email Address
              </label>
              <input
                className="generic-input"
                type="email"
                name="email"
                id="email-address"
                ref={register}
                required
              />
            </div>

            <div className="user-form-input-container h-no-mr">
              <label
                className="generic-input-label user-form-input-label"
                htmlFor="phone-number"
              >
                Phone Number
              </label>
              <input
                className="generic-input"
                type="text"
                inputMode="decimal"
                name="phone"
                id="phone-number"
                ref={register({
                  required: true,
                  pattern: /^-?\d+\.?\d*$/,
                })}
                required
              />
              <p className="input-error-message">
                {errors.phone && 'Please enter a number'}
              </p>
            </div>

            <div className="user-form-input-container">
              <label
                className="generic-input-label user-form-input-label"
                htmlFor="organisation"
              >
                Organisation
              </label>
              <input
                className="generic-input"
                type="text"
                name="organisation"
                id="organisation"
                ref={register}
                required
              />
            </div>

            <div className="user-form-input-container h-not-visible h-hidden-1086-down">
              <label
                className="generic-input-label user-form-input-label"
                htmlFor="branch"
              >
                Branch
              </label>
              <input
                className="generic-input"
                type="text"
                name="branch"
                id="branch"
                ref={register}
              />
            </div>

            <div className="user-form-input-container h-no-mr h-not-visible h-hidden-1086-down">
              <label
                className="generic-input-label user-form-input-label"
                htmlFor="date-added"
              >
                Date Added
              </label>
              <Controller
                as={dateAddedPicker}
                name="dateAdded"
                control={control}
                defaultValue=""
                validateStatus={
                  errors.dateAdded && 'Please enter a date' ? 'error' : ''
                }
                help={errors.dateAdded && 'Please enter a date'}
              />
              <p className="input-error-message">
                {errors.dateAdded && 'Please enter a date'}
              </p>
            </div>
          </div>

          <button className="generic-submit-button user-form-submit-button">
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default BranchesUserForm;
