import React, { useEffect, useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker, Select, notification } from 'antd';
import moment from 'moment';
import CompleteDataContext from '../Context';

import billingHttpServices from '../services/bills'
import axios from 'axios'

import { CaretDownFilled } from '@ant-design/icons';

import BreadCrumb from '../components/BreadCrumb';
import Loader from '../components/Loader';


const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/cost-tracker', name: 'Cost Tracker', id: 2 },
  { url: '#', name: 'Add Bills', id: 3 },
];

const { Option } = Select;
const { RangePicker } = DatePicker;

const openNotificationWithIcon = (type, formName) => {
  notification[type]({
    message: 'Bill Updated',
    description: `Your addition to the ${formName} has been successfully submitted`,
  });
};

function AddBills({ match }) {
  const { setCurrentUrl, isAuthenticatedDataLoading, token, organization } = useContext(
    CompleteDataContext
  );

  const [images,setImages] = useState([])

  console.log(organization)
  let userId = organization.id
  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl, token, userId]);

  const {
    register: registerPurchaseTracker,
    handleSubmit: handleSubmitPurchaseTracker,
    reset: resetPurchaseTracker,
    setValue: setValuePurchaseTracker,
    control: controlPurchaseTracker,
    errors: errorsPurchaseTracker,
  } = useForm();

  const {
    register: registerPaymentTrackerPre,
    handleSubmit: handleSubmitPaymentTrackerPre,
    reset: resetPaymentTrackerPre,
    setValue: setValuePaymentTrackerPre,
    control: controlPaymentTrackerPre,
    errors: errorsPaymentTrackerPre,
  } = useForm();

  const {
    register: registerPaymentTrackerPost,
    handleSubmit: handleSubmitPaymentTrackerPost,
    reset: resetPaymentTrackerPost,
    setValue: setValuePaymentTrackerPost,
    control: controlPaymentTrackerPost,
    errors: errorsPaymentTrackerPost,
  } = useForm();

  const {
    register : registerUsedTracker,
    handleSubmit : handleUsedTracker,
    reset: resetUsedTracker,
    setValue : setValueUsedTracker,
    control: controlUsedTracker,
    errors: errorsUsedTracker,
  } = useForm()

  const fuelPurchaseDatePicker = (
    <DatePicker
      format="DD-MM-YYYY"
      className="generic-input"
      id="fuel-purchase-date"
      onChange={(e) =>
        setValuePurchaseTracker('fuelPurchaseDate', e.target.value, true)
      }
    />
  );

  const fuelTypeSelector = (
    <Select
      className="cost-tracker-select h-4-br fuel-type-selector"
      id="fuel-type"
      defaultValue="diesel"
      suffixIcon={<CaretDownFilled />}
      onChange={(e) =>
        setValuePurchaseTracker('fuelType', e.target.value, true)
      }
    >
      <Option className="fuel-type-option" value="diesel">
        Diesel
      </Option>
      <Option className="fuel-type-option" value="petrol">
        Petrol
      </Option>
    </Select>
  );

  const utilityPaymentPreDatePicker = (
    <DatePicker
      format="DD-MM-YYYY"
      className="generic-input"
      id="utility-payment-pre-date"
      onChange={(e) =>
        setValuePaymentTrackerPre('utilityPaymentDate', e.target.value, true)
      }
    />
  );

  const utilityPaymentPostDatePicker = (
    <RangePicker
      format="DD-MM-YYYY"
      className="post-date-range-picker"
      id="utility-payment-post-date"
      onChange={(e) =>
        setValuePaymentTrackerPost('utilityPaymentDate', e.target.value, true)
      }
      ranges={{
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Past Week': [moment().subtract(7, 'days'), moment()],
        'Past Month': [moment().subtract(1, 'months'), moment()],
        'Past Year': [moment().subtract(1, 'years'), moment()],
      }}
    />
  );

  let defaultBranch;

  if(organization.branches && organization.branches.length === 1){
    organization.branches && organization.branches.map((branch)=>{
      defaultBranch = branch.id
      return branch.id
    })
  }
  else{
    defaultBranch = null
    console.log('branches are more than one', defaultBranch)
  }

  const onPurchaseTrackerSubmit = ({
    fuelQuantity,
    fuelPricePerLitre,
    fuelPurchaseDate,
    fuelType,
  }) => {
    
    if (defaultBranch != null){
      const DieselCostData = {
        branch : defaultBranch,
        quantity : fuelQuantity,
        price_per_litre : fuelPricePerLitre,
        date : fuelPurchaseDate.format('YYYY-MM-DD')
      }
      
      billingHttpServices
      .addCostForDiesel(DieselCostData, token, userId, fuelType)
      .then(()=>{  
        openNotificationWithIcon('success', 'fuel purchase tracker');
      })
      .catch((err)=>{
        console.log(err)
        alert('An error occured, Please try again!!')
      }) 
    }

    // Reset form fields. Controller value is set manually
    setValuePurchaseTracker('fuelPurchaseDate', undefined);
    setValuePurchaseTracker('fuelType', undefined);
    resetPurchaseTracker();
  };

  const onUsedTrackerSubmit = ({fuelUsedDate, fuelBalance,flowMeterSnapshot})=>{
    let formData = new FormData()
    formData.append('branch',defaultBranch)
    formData.append('quantity',fuelBalance)
    formData.append('date',fuelUsedDate.format('YYYY-MM-DD'))
    formData.append('image',images)

    axios.post(`https://wyreng.xyz/api/v1/add_month_end_cost/${userId}/`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `bearer ${token}`,
        }
      }).then(res=>{
        openNotificationWithIcon('success', 'Form submitted successfully');
      }).catch(e=>{
        alert('An error occured,Please try again!!!')
        console.log(e.response)
      })
    

    // Reset form fields. Controller value is set manually
    setValueUsedTracker('fuelUsedDate', undefined);
    setValueUsedTracker('fuelBalance', undefined);
    setValueUsedTracker('flowMeterSnapshot', undefined);
    resetUsedTracker();
  }

  const onUtilityPaymentTrackerPreSubmit = ({
    utilityPaymentPreAmount,
    utilityPaymentPreDate,
    utilityPaymentPreTariff,
    utilityPaymentPreValue,
  }) => {
    if (defaultBranch != null){
      const prePaidData = {
        branch : defaultBranch,
        value : utilityPaymentPreValue,
        amount : utilityPaymentPreAmount,
        tariff : utilityPaymentPreTariff,
        date : utilityPaymentPreDate.format('YYYY-MM-DD')
      }
      billingHttpServices
        .addCostPrePaid(prePaidData,token,userId)
        .then(()=>{  
          openNotificationWithIcon('success', 'pre-paid utility payment tracker');
        })
        .catch(err=>{
          console.log(err.response)
          alert(err.response, 'Please try again!!!')
        })
    }
    
    // Reset form fields. Controller value is set manually
    setValuePurchaseTracker('utilityPaymentPreDate', undefined);
    resetPaymentTrackerPre();
  };

  const onUtilityPaymentTrackerPostSubmit = ({
    utilityPaymentPostAmount,
    utilityPaymentPostDate,
    utilityPaymentPostTariff,
    utilityPaymentPostValue,
  }) => {

    const convertDate = (dateObjects)=>{
      let formatObject = dateObjects.map((eachDateObject) => {
        return eachDateObject.format('YYYY-MM-DD')
      })
      return formatObject
   }

   let FormattedDate = convertDate(utilityPaymentPostDate)

   if (defaultBranch != null){
    const postPaidData = {
      branch : defaultBranch,
      value : utilityPaymentPostValue,
      amount : utilityPaymentPostAmount,
      tariff : utilityPaymentPostTariff,
      date :  FormattedDate[0],
      end_date: FormattedDate[1]
    }
    
    billingHttpServices
    .addCostPostPaid(postPaidData,token, userId)
    .then(()=>{
      openNotificationWithIcon('success', 'post-paid utility payment tracker');
    })
    .catch(error=>{
      alert('An error occured,Please try again!!!')
      console.log(error.response)
    })
  }  

    // // Reset form fields. Controller value is set manually
    setValuePurchaseTracker('utilityPaymentPostDate', undefined);
    resetPaymentTrackerPost();
  };

  if (isAuthenticatedDataLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="breadcrumb-and-print-buttons">
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>

      <div className="cost-tracker-forms-content-wrapper">
        <h1 className="center-main-heading">Add Bills</h1>

        <section className="cost-tracker-form-section add-bills-section">
          <h2 className="form-section-heading add-bills-section__heading">
            Diesel/Petrol Purchase Tracker
          </h2>

          <form
            className="cost-tracker-form"
            action="#"
            onSubmit={handleSubmitPurchaseTracker(onPurchaseTrackerSubmit)}
          >
            <div className="cost-tracker-form-inputs-wrapper">
              
              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="fuel-quantity"
                >
                  Quantity
                </label>
                <input
                  className="generic-input"
                  type="text"
                  inputMode="decimal"
                  name="fuelQuantity"
                  id="fuel-quantity"
                  ref={registerPurchaseTracker({
                    required: true,
                    pattern: /^-?\d+\.?\d*$/,
                  })}
                  required
                  autoFocus
                />
                <p className="input-error-message">
                  {errorsPurchaseTracker.fuelQuantity &&
                    'Please enter a number'}
                </p>
              </div>

              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="fuel-price-per-litre"
                >
                  Price/Litre
                </label>
                <input
                  className="generic-input"
                  type="text"
                  inputMode="decimal"
                  name="fuelPricePerLitre"
                  id="fuel-price-per-litre"
                  ref={registerPurchaseTracker({
                    required: true,
                    pattern: /^-?\d+\.?\d*$/,
                  })}
                  required
                />
                <p className="input-error-message">
                  {errorsPurchaseTracker.fuelPricePerLitre &&
                    'Please enter a number'}
                </p>
              </div>

              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="fuel-purchase-date"
                >
                  Date
                </label>
                <Controller
                  as={fuelPurchaseDatePicker}
                  name="fuelPurchaseDate"
                  control={controlPurchaseTracker}
                  defaultValue=""
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
                <p className="input-error-message">
                  {errorsPurchaseTracker.fuelPurchaseDate &&
                    'Please enter a date'}
                </p>
              </div>

              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="fuel-type"
                >
                  Diesel/Petrol
                </label>

                <Controller
                  as={fuelTypeSelector}
                  name="fuelType"
                  control={controlPurchaseTracker}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  help={
                    errorsPurchaseTracker.fuelType && 'Please enter a fuel type'
                  }
                />
                <p className="input-error-message">
                  {errorsPurchaseTracker.fuelType && 'Please enter a fuel type'}
                </p>
              </div>
            </div>
            <button className="generic-submit-button cost-tracker-form-submit-button">
              Submit
            </button>
          </form>
        </section>

        <section className="cost-tracker-form-section">
          <h2 className="form-section-heading">
            Utility Payment Tracker (Pre-paid)
          </h2>

          <form
            className="cost-tracker-form"
            action="#"
            onSubmit={handleSubmitPaymentTrackerPre(
              onUtilityPaymentTrackerPreSubmit
            )}
          >
            <div className="cost-tracker-form-inputs-wrapper">


              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="utility-payment-pre-amount"
                >
                  Amount
                </label>
                <input
                  className="generic-input"
                  type="text"
                  inputMode="decimal"
                  name="utilityPaymentPreAmount"
                  id="utility-payment-pre-amount"
                  ref={registerPaymentTrackerPre({
                    required: true,
                    pattern: /^-?\d+\.?\d*$/,
                  })}
                  required
                />
                <p className="input-error-message">
                  {errorsPaymentTrackerPre.utilityPaymentPreAmount &&
                    'Please enter a number'}
                </p>
              </div>

              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="utility-payment-pre-date"
                >
                  Date of Purchase
                </label>
                <Controller
                  as={utilityPaymentPreDatePicker}
                  name="utilityPaymentPreDate"
                  control={controlPaymentTrackerPre}
                  defaultValue=""
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
                <p className="input-error-message">
                  {errorsPaymentTrackerPre.utilityPaymentPreDate &&
                    'Please enter a date'}
                </p>
              </div>

              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="utility-payment-pre-tariff"
                >
                  Tariff (if applicable)
                </label>
                <input
                  className="generic-input"
                  type="text"
                  inputMode="decimal"
                  name="utilityPaymentPreTariff"
                  id="utility-payment-pre-tariff"
                  ref={registerPaymentTrackerPre({
                    pattern: /^-?\d+\.?\d*$/,
                  })}
                />
                <p className="input-error-message">
                  {errorsPaymentTrackerPre.utilityPaymentPreTariff &&
                    'Please enter a number'}
                </p>
              </div>

              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="utility-payment-pre-value"
                >
                  Value (kWh)
                </label>
                <input
                  className="generic-input"
                  type="text"
                  inputMode="decimal"
                  name="utilityPaymentPreValue"
                  id="utility-payment-pre-value"
                  ref={registerPaymentTrackerPre({
                    required: true,
                    pattern: /^-?\d+\.?\d*$/,
                  })}
                  required
                />
                <p className="input-error-message">
                  {errorsPaymentTrackerPre.utilityPaymentPreValue &&
                    'Please enter a number'}
                </p>
              </div>
            </div>

            <button className="generic-submit-button cost-tracker-form-submit-button">
              Submit
            </button>
          </form>
        </section>

        <section className="cost-tracker-form-section">
          <h2 className="form-section-heading">
            Utility Payment Tracker (Post-paid)
          </h2>

          <form
            className="cost-tracker-form"
            action="#"
            onSubmit={handleSubmitPaymentTrackerPost(
              onUtilityPaymentTrackerPostSubmit
            )}
          >
            <div className="cost-tracker-form-inputs-wrapper">

              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="utility-payment-post-amount"
                >
                  Amount
                </label>
                <input
                  className="generic-input"
                  type="text"
                  inputMode="decimal"
                  name="utilityPaymentPostAmount"
                  id="utility-payment-post-amount"
                  ref={registerPaymentTrackerPost({
                    required: true,
                    pattern: /^-?\d+\.?\d*$/,
                  })}
                  required
                />
                <p className="input-error-message">
                  {errorsPaymentTrackerPost.utilityPaymentPostAmount &&
                    'Please enter a number'}
                </p>
              </div>

              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="utility-payment-post-date"
                >
                  Period Covered
                </label>
                <Controller
                  as={utilityPaymentPostDatePicker}
                  name="utilityPaymentPostDate"
                  control={controlPaymentTrackerPost}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  validateStatus={
                    errorsPaymentTrackerPost.utilityPaymentPostDate &&
                    'Please enter a date range'
                      ? 'error'
                      : ''
                  }
                  help={
                    errorsPaymentTrackerPost.utilityPaymentPostDate &&
                    'Please enter a date range'
                  }
                />
                <p className="input-error-message">
                  {errorsPaymentTrackerPost.utilityPaymentPostDate &&
                    'Please enter a date range'}
                </p>
              </div>

              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="utility-payment-post-tariff"
                >
                  Tariff (if applicable)
                </label>
                <input
                  className="generic-input"
                  type="text"
                  inputMode="decimal"
                  name="utilityPaymentPostTariff"
                  id="utility-payment-post-tariff"
                  ref={registerPaymentTrackerPost({
                    pattern: /^-?\d+\.?\d*$/,
                  })}
                />
                <p className="input-error-message">
                  {errorsPaymentTrackerPost.utilityPaymentPostTariff &&
                    'Please enter a number'}
                </p>
              </div>

              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="utility-payment-post-value"
                >
                  Value (kWh)
                </label>
                <input
                  className="generic-input"
                  type="text"
                  inputMode="decimal"
                  name="utilityPaymentPostValue"
                  id="utility-payment-post-value"
                  ref={registerPaymentTrackerPost({
                    required: true,
                    pattern: /^-?\d+\.?\d*$/,
                  })}
                  required
                />
                <p className="input-error-message">
                  {errorsPaymentTrackerPost.utilityPaymentPostValue &&
                    'Please enter a number'}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="generic-submit-button cost-tracker-form-submit-button"
            >
              Submit
            </button>
          </form>
        </section>
      
        <section className="cost-tracker-form-section add-bills-section">
          <h2 className="form-section-heading add-bills-section__heading">
          End of Month Diesel/Petrol Balance
          </h2>

          <form
            className="cost-tracker-form"
            action="#"
            onSubmit={handleUsedTracker(onUsedTrackerSubmit)}
          >
            <div className="cost-tracker-form-inputs-wrapper">

            <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="fuel-purchase-date"
                >
                  Date
                </label>
                <Controller
                  as={fuelPurchaseDatePicker}
                  name="fuelUsedDate"
                  control={controlUsedTracker}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  validateStatus={
                    errorsUsedTracker.fuelUsedDate &&
                    'Please enter a date'
                      ? 'error'
                      : ''
                  }
                  help={
                    errorsUsedTracker.fuelUsedDate &&
                    'Please enter a date'
                  }
                />
                <p className="input-error-message">
                  {errorsUsedTracker.fuelPurchaseDate &&
                    'Please enter a date'}
                </p>
              </div>
              
              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="fuel-used-quantity"
                >
                  Balance
                </label>
                <input
                  className="generic-input"
                  type="text"
                  inputMode="decimal"
                  name="fuelBalance"
                  id="fuel-used-quantity"
                  ref={registerUsedTracker({
                    required: true,
                    pattern: /^-?\d+\.?\d*$/,
                  })}
                  required
                  autoFocus
                />
                <p className="input-error-message">
                  {errorsPurchaseTracker.fuelBalance &&
                    'Please enter a number'}
                </p>
              </div>
            
              <div className="cost-tracker-input-container" >
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="flow-meter-snapshot"
                >
                  Flow Meter Snapshot
                </label>
                <input
                  style={{backgroundColor:'#C4C4C48A'}}
                  className="generic-input"
                  type="file"
                  accept="image/png, image/jpeg"
                  name="flowMeterSnapshot"
                  onChange={(e)=>{
                   setImages(e.target.files[0])
                  }}
                  id="flow-meter-snapshot"
                  ref={registerUsedTracker({
                    required: true,
                  })}
                  required
                  autoFocus
                />
              </div>

              
            </div>
            <button className="generic-submit-button cost-tracker-form-submit-button">
              Submit
            </button>
          </form>
        </section>

      </div>
    </>
  );
}

export default AddBills;
