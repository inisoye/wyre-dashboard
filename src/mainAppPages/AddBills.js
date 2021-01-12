import React, { useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker, Select } from 'antd';
import CompleteDataContext from '../Context';

import { CaretDownFilled } from '@ant-design/icons';

import BreadCrumb from '../components/BreadCrumb';

import PrintButtons from '../smallComponents/PrintButtons';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/cost-tracker', name: 'Cost Tracker', id: 2 },
  { url: '#', name: 'Add Bills', id: 3 },
];

const { Option } = Select;

function AddBills({ match }) {
  const { setCurrentUrl } = useContext(CompleteDataContext);

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  const {
    register: registerPurchaseTracker,
    handleSubmit: handleSubmitPurchaseTracker,
    setValue: setValuePurchaseTracker,
    control: controlPurchaseTracker,
    errors: errorsPurchaseTracker,
  } = useForm();

  const {
    register: registerPaymentTrackerPre,
    handleSubmit: handleSubmitPaymentTrackerPre,
    setValue: setValuePaymentTrackerPre,
    control: controlPaymentTrackerPre,
    errors: errorsPaymentTrackerPre,
  } = useForm();

  const {
    register: registerPaymentTrackerPost,
    handleSubmit: handleSubmitPaymentTrackerPost,
    setValue: setValuePaymentTrackerPost,
    control: controlPaymentTrackerPost,
    errors: errorsPaymentTrackerPost,
  } = useForm();

  const fuelPurchaseDatePicker = (
    <DatePicker
      format='DD-MM-YYYY'
      className='generic-input'
      id='fuel-purchase-date'
      onChange={(e) =>
        setValuePurchaseTracker('fuelPurchaseDate', e.target.value, true)
      }
    />
  );

  const fuelTypeSelector = (
    <Select
      className='cost-tracker-select h-4-br fuel-type-selector'
      id='fuel-type'
      defaultValue='diesel'
      suffixIcon={<CaretDownFilled />}
      onChange={(e) =>
        setValuePurchaseTracker('fuelType', e.target.value, true)
      }
    >
      <Option className='fuel-type-option' value='diesel'>
        Diesel
      </Option>
      <Option className='fuel-type-option' value='petrol'>
        Petrol
      </Option>
    </Select>
  );

  const utilityPaymentPreDatePicker = (
    <DatePicker
      format='DD-MM-YYYY'
      className='generic-input'
      id='utility-payment-pre-date'
      onChange={(e) =>
        setValuePaymentTrackerPre('utilityPaymentDate', e.target.value, true)
      }
    />
  );

  const utilityPaymentPostDatePicker = (
    <DatePicker
      format='DD-MM-YYYY'
      className='generic-input'
      id='utility-payment-post-date'
      onChange={(e) =>
        setValuePaymentTrackerPost('utilityPaymentDate', e.target.value, true)
      }
    />
  );

  const onPurchaseTrackerSubmit = ({
    fuelQuantity,
    fuelPricePerLitre,
    fuelPurchaseDate,
    fuelType,
  }) => {
    console.log(fuelQuantity, fuelPricePerLitre, fuelPurchaseDate, fuelType);
  };

  const onUtilityPaymentTrackerPreSubmit = ({
    utilityPaymentPreAmount,
    utilityPaymentPreDate,
    utilityPaymentPreTariff,
    utilityPaymentPreValue,
  }) => {
    console.log(
      utilityPaymentPreAmount,
      utilityPaymentPreDate,
      utilityPaymentPreTariff,
      utilityPaymentPreValue
    );
  };

  const onUtilityPaymentTrackerPostSubmit = ({
    utilityPaymentPostAmount,
    utilityPaymentPostDate,
    utilityPaymentPostTariff,
    utilityPaymentPostValue,
  }) => {
    console.log(
      utilityPaymentPostAmount,
      utilityPaymentPostDate,
      utilityPaymentPostTariff,
      utilityPaymentPostValue
    );
  };

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
        <PrintButtons />
      </div>

      <div className='cost-tracker-forms-content-wrapper'>
        <h1 className='center-main-heading'>Add Bills</h1>

        <section className='cost-tracker-form-section add-bills-section'>
          <h2 className='form-section-heading add-bills-section__heading'>
            Diesel/Petrol Purchase Tracker
          </h2>

          <form
            className='cost-tracker-form'
            action='#'
            onSubmit={handleSubmitPurchaseTracker(onPurchaseTrackerSubmit)}
          >
            <div className='cost-tracker-form-inputs-wrapper'>
              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='fuel-quantity'
                >
                  Quantity
                </label>
                <input
                  className='generic-input'
                  type='text'
                  inputMode='decimal'
                  name='fuelQuantity'
                  id='fuel-quantity'
                  ref={registerPurchaseTracker}
                  required
                  autoFocus
                />
              </div>

              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='fuel-price-per-litre'
                >
                  Price/Litre
                </label>
                <input
                  className='generic-input'
                  type='text'
                  inputMode='decimal'
                  name='fuelPricePerLitre'
                  id='fuel-price-per-litre'
                  ref={registerPurchaseTracker}
                  required
                />
              </div>

              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='fuel-purchase-date'
                >
                  Date
                </label>
                <Controller
                  as={fuelPurchaseDatePicker}
                  name='fuelPurchaseDate'
                  control={controlPurchaseTracker}
                  defaultValue=''
                  rules={{
                    required: true,
                  }}
                  validateStatus={
                    errorsPurchaseTracker.fuelPurchaseDate &&
                    'Please enter a date'
                      ? 'error'
                      : ''
                  }
                  help={
                    errorsPurchaseTracker.fuelPurchaseDate &&
                    'Please enter a date'
                  }
                />
                <p className='input-error-message'>
                  {errorsPurchaseTracker.fuelPurchaseDate &&
                    'Please enter a date'}
                </p>
              </div>

              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='fuel-type'
                >
                  Diesel/Petrol
                </label>

                <Controller
                  as={fuelTypeSelector}
                  name='fuelType'
                  control={controlPurchaseTracker}
                  defaultValue=''
                  rules={{
                    required: true,
                  }}
                  help={
                    errorsPurchaseTracker.fuelType && 'Please enter a fuel type'
                  }
                />
                <p className='input-error-message'>
                  {errorsPurchaseTracker.fuelType && 'Please enter a fuel type'}
                </p>
              </div>
            </div>
            <button className='generic-submit-button cost-tracker-form-submit-button'>
              Submit
            </button>
          </form>
        </section>

        <section className='cost-tracker-form-section'>
          <h2 className='form-section-heading'>
            Utility Payment Tracker (Pre-paid)
          </h2>

          <form
            className='cost-tracker-form'
            action='#'
            onSubmit={handleSubmitPaymentTrackerPre(
              onUtilityPaymentTrackerPreSubmit
            )}
          >
            <div className='cost-tracker-form-inputs-wrapper'>
              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='utility-payment-pre-amount'
                >
                  Amount
                </label>
                <input
                  className='generic-input'
                  type='text'
                  inputMode='decimal'
                  name='utilityPaymentPreAmount'
                  id='utility-payment-pre-amount'
                  ref={registerPaymentTrackerPre}
                  required
                />
              </div>

              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='utility-payment-pre-date'
                >
                  Date of Purchase
                </label>
                <Controller
                  as={utilityPaymentPreDatePicker}
                  name='utilityPaymentPreDate'
                  control={controlPaymentTrackerPre}
                  defaultValue=''
                  rules={{
                    required: true,
                  }}
                  validateStatus={
                    errorsPaymentTrackerPre.utilityPaymentPreDate &&
                    'Please enter a date'
                      ? 'error'
                      : ''
                  }
                  help={
                    errorsPaymentTrackerPre.utilityPaymentPreDate &&
                    'Please enter a date'
                  }
                />
                <p className='input-error-message'>
                  {errorsPaymentTrackerPre.utilityPaymentPreDate &&
                    'Please enter a date'}
                </p>
              </div>

              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='utility-payment-pre-tariff'
                >
                  Tariff (if applicable)
                </label>
                <input
                  className='generic-input'
                  type='text'
                  inputMode='decimal'
                  name='utilityPaymentPreTariff'
                  id='utility-payment-pre-tariff'
                  ref={registerPaymentTrackerPre}
                />
              </div>

              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='utility-payment-pre-value'
                >
                  Value (kWh)
                </label>
                <input
                  className='generic-input'
                  type='text'
                  inputMode='decimal'
                  name='utilityPaymentPreValue'
                  id='utility-payment-pre-value'
                  ref={registerPaymentTrackerPre}
                  required
                />
              </div>
            </div>

            <button className='generic-submit-button cost-tracker-form-submit-button'>
              Submit
            </button>
          </form>
        </section>

        <section className='cost-tracker-form-section'>
          <h2 className='form-section-heading'>
            Utility Payment Tracker (Post-paid)
          </h2>

          <form
            className='cost-tracker-form'
            action='#'
            onSubmit={handleSubmitPaymentTrackerPost(
              onUtilityPaymentTrackerPostSubmit
            )}
          >
            <div className='cost-tracker-form-inputs-wrapper'>
              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='utility-payment-post-amount'
                >
                  Amount
                </label>
                <input
                  className='generic-input'
                  type='text'
                  inputMode='decimal'
                  name='utilityPaymentPostAmount'
                  id='utility-payment-post-amount'
                  ref={registerPaymentTrackerPost}
                  required
                />
              </div>

              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='utility-payment-post-date'
                >
                  Date
                </label>
                <Controller
                  as={utilityPaymentPostDatePicker}
                  name='utilityPaymentPostDate'
                  control={controlPaymentTrackerPost}
                  defaultValue=''
                  rules={{
                    required: true,
                  }}
                  validateStatus={
                    errorsPaymentTrackerPost.utilityPaymentPostDate &&
                    'Please enter a date'
                      ? 'error'
                      : ''
                  }
                  help={
                    errorsPaymentTrackerPost.utilityPaymentPostDate &&
                    'Please enter a date'
                  }
                />
                <p className='input-error-message'>
                  {errorsPaymentTrackerPost.utilityPaymentPostDate &&
                    'Please enter a date'}
                </p>
              </div>

              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='utility-payment-post-tariff'
                >
                  Tariff (if applicable)
                </label>
                <input
                  className='generic-input'
                  type='text'
                  inputMode='decimal'
                  name='utilityPaymentPostTariff'
                  id='utility-payment-post-tariff'
                  ref={registerPaymentTrackerPost}
                />
              </div>

              <div className='cost-tracker-input-container'>
                <label
                  className='generic-input-label cost-tracker-input-label'
                  htmlFor='utility-payment-post-value'
                >
                  Value (kWh)
                </label>
                <input
                  className='generic-input'
                  type='text'
                  inputMode='decimal'
                  name='utilityPaymentPostValue'
                  id='utility-payment-post-value'
                  ref={registerPaymentTrackerPost}
                  required
                />
              </div>
            </div>

            <button
              type='submit'
              className='generic-submit-button cost-tracker-form-submit-button'
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default AddBills;
