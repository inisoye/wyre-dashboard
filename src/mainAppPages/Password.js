import React, { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';

import PrintButtons from '../smallComponents/PrintButtons';

import ErrorIcon from '../icons/ErrorIcon';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/password', name: 'Password', id: 2 },
];

function Password({ match }) {
  const { setCurrentUrl } = useContext(CompleteDataContext);

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  const { register, handleSubmit, reset, errors } = useForm();

  const onSubmit = ({ oldPassword, newPassword1, newPassword2 }) => {
    console.log(oldPassword, newPassword1, newPassword2);
    reset();
  };

  const showErrorMessage = errors.newPassword2 || errors.newPassword2;

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
        <PrintButtons />
      </div>

      <div>
        <h1 className='center-main-heading'>Password</h1>

        <form
          action='#'
          className='password-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='password-input-container'>
            <label className='generic-input-label' htmlFor='old-password'>
              Old Password
            </label>
            <input
              className='generic-input'
              type='password'
              name='oldPassword'
              id='old-password'
              ref={register}
              required
              autoFocus
            />
          </div>

          <div className='new-passwords-container'>
            <div className='password-input-container'>
              <label className='generic-input-label' htmlFor='new-password-1'>
                New Password
              </label>
              <input
                className='generic-input'
                type='password'
                name='newPassword1'
                id='new-password-1'
                ref={register({
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                })}
                required
              />
            </div>
            <div className='password-input-container'>
              <label className='generic-input-label' htmlFor='new-password-2'>
                Re-enter New Password
              </label>
              <input
                className='generic-input'
                type='password'
                name='newPassword2'
                id='new-password-2'
                ref={register({
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                })}
                required
              />
            </div>
          </div>

          {showErrorMessage && (
            <p>
              <ErrorIcon />

              <span>
                Passwords must include a number, a lowercase and uppercase
                letter. They should be a minimum of 8 characters
              </span>
            </p>
          )}

          <button className='generic-submit-button'>Change Password</button>
        </form>
      </div>
    </>
  );
}

export default Password;
