import React from 'react';
import { useForm } from 'react-hook-form';

import HiddenInputLabel from '../smallComponents/HiddenInputLabel';
import OutlinedInput from '../smallComponents/OutlinedInput';
import SocialCluster from '../smallComponents/SocialCluster';

function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ newPassword, oldPassword }) => {
    console.log(newPassword, oldPassword);
  };

  return (
    <div className='auth-page-container'>
      <form
        className='signup-login-contact-form'
        action='#'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='signup-login-heading first-heading--auth'>
          Change Password
        </h1>

        <p className='outlined-input-container'>
          <HiddenInputLabel htmlFor='new-password' labelText='New Password' />
          <OutlinedInput
            className='signup-login-contact-input'
            type='password'
            name='newPassword'
            id='new-password'
            placeholder='New Password'
            autoComplete='new-password'
            required={true}
            autoFocus={true}
            register={register}
          />
        </p>

        <p className='outlined-input-container'>
          <HiddenInputLabel htmlFor='old-password' labelText='Old Password' />
          <OutlinedInput
            className='signup-login-contact-input'
            type='password'
            name='oldPassword'
            id='old-password'
            placeholder='Old Password'
            autoComplete='old-password'
            required={true}
            autoFocus={true}
            register={register}
          />
        </p>

        <button className='signup-login-contact-button'>Log in</button>
      </form>

      <SocialCluster />
    </div>
  );
}

export default Login;
