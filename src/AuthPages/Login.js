import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import HiddenInputLabel from '../smallComponents/HiddenInputLabel';
import OutlinedInput from '../smallComponents/OutlinedInput';
import SocialCluster from '../smallComponents/SocialCluster';

function Login() {
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
        <h1 className='signup-login-heading first-heading--auth'>
          Welcome Back
        </h1>

        <p className='outlined-input-container'>
          <HiddenInputLabel htmlFor='login-email' labelText='Email' />
          <OutlinedInput
            className='signup-login-contact-input'
            type='email'
            name='email'
            id='login-email'
            placeholder='Username or email'
            autoComplete='email'
            required={true}
            autoFocus={true}
            register={register}
          />
        </p>

        <p className='outlined-input-container'>
          <HiddenInputLabel htmlFor='password' labelText='Password' />
          <OutlinedInput
            className='signup-login-contact-input'
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            autoComplete='new-password'
            required={true}
            autoFocus={false}
            register={register}
          />
        </p>

        <div className='forgot-password-wrapper'>
          <Link className='forgot-password' to='/reset-password'>
            Forgot Password?
          </Link>
        </div>

        <button className='signup-login-contact-button'>Log in</button>
      </form>

      <SocialCluster />
    </div>
  );
}

export default Login;
