import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import HiddenInputLabel from '../smallComponents/HiddenInputLabel';
import OutlinedInput from '../smallComponents/OutlinedInput';
import SocialCluster from '../smallComponents/SocialCluster';

function SignUp() {
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ givenName, familyName, email }) => {
    console.log(givenName, familyName, email);
  };

  return (
    <div className='auth-page-container'>
      <form
        className='signup-login-contact-form'
        action='#'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='signup-login-heading first-heading--auth'>
          Create your Account
        </h1>

        <p className='outlined-input-container'>
          <HiddenInputLabel
            htmlFor='signup-given-name'
            labelText='First Name'
          />
          <OutlinedInput
            className='signup-login-contact-input'
            type='text'
            name='givenName'
            id='signup-given-name'
            placeholder='First Name'
            autoComplete='given-name'
            required={true}
            autoFocus={true}
            register={register}
          />
        </p>

        <p className='outlined-input-container'>
          <HiddenInputLabel htmlFor='family-name' labelText='Last Name' />
          <OutlinedInput
            className='signup-login-contact-input'
            type='text'
            name='familyName'
            id='family-name'
            placeholder='Last Name'
            autoComplete='family-name'
            required={true}
            autoFocus={false}
            register={register}
          />
        </p>

        <p className='outlined-input-container'>
          <HiddenInputLabel htmlFor='signup-email' labelText='Email' />
          <OutlinedInput
            className='signup-login-contact-input'
            type='email'
            name='email'
            id='signup-email'
            placeholder='Email Address'
            autoComplete='email'
            required={true}
            autoFocus={false}
            register={register}
          />
        </p>

        <button className='signup-login-contact-button'>Sign Up</button>

        <SocialCluster />
      </form>
    </div>
  );
}

export default SignUp;
