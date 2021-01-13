import React from 'react';
import { useForm } from 'react-hook-form';

import HiddenInputLabel from '../smallComponents/HiddenInputLabel';
import OutlinedInput from '../smallComponents/OutlinedInput';
import SocialCluster from '../smallComponents/SocialCluster';

function ResetPassword() {
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ email, password }) => {
    console.log(email, password);
  };

  return (
    <div className='auth-page-container'>
      <form
        className='signup-login-contact-form'
        action='#'
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className='reset-password-note'>
          Please fill in the form below with the email address associated with
          your account and click "Reset My Password". Instructions for resetting
          your password will be sent to you.
        </p>

        <p className='outlined-input-container'>
          <HiddenInputLabel htmlFor='login-email' labelText='Email' />
          <OutlinedInput
            className='signup-login-contact-input'
            type='email'
            name='email'
            id='login-email'
            placeholder='Email Address'
            autoComplete='email'
            required={true}
            autoFocus={true}
            register={register}
          />
        </p>

        <button className='signup-login-contact-button'>Reset Password</button>
      </form>

      <SocialCluster />
    </div>
  );
}

export default ResetPassword;
