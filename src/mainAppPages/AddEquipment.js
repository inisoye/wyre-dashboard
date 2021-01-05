import React, { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from 'antd';
import CompleteDataContext from '../Context';

import equipmentHttpServices from '../services/equipment';

import BreadCrumb from '../components/BreadCrumb';
import ListOfEquipmentTable from '../components/tables/ListOfEquipmentTable';

import PrintButtons from '../smallComponents/PrintButtons';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/cost-tracker', name: 'Cost Tracker', id: 2 },
  { url: '#', name: 'Add Equipment', id: 3 },
];

function AddEquipment({ match }) {
  const { setCurrentUrl } = useContext(CompleteDataContext);
  const [allEquipment, setAllEquipment] = useState([]);

  const { register, handleSubmit, setValue, control, errors } = useForm();

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }

    equipmentHttpServices
      .getAll()
      .then((returnedEquipment) => setAllEquipment(returnedEquipment));
  }, [match, setCurrentUrl]);

  const equipmentPurchaseDatePicker = (
    <DatePicker
      className='cost-tracker-input'
      id='equipment-purchase-date'
      onChange={(e) => setValue('equipmentPurchaseDate', e.target.value, true)}
    />
  );

  const onSubmit = ({
    equipmentName,
    equipmentWattage,
    equipmentPurchaseDate,
    equipmentQuantity,
  }) => {
    console.log(
      equipmentName,
      equipmentWattage,
      equipmentPurchaseDate,
      equipmentQuantity
    );
  };

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
        <PrintButtons />
      </div>

      <div className='cost-tracker-forms-content-wrapper'>
        <h1 className='center-main-heading'>Equipment</h1>

        <section className='cost-tracker-form-section'>
          <h2 className='cost-tracker-form-section__heading'>Add Equipment</h2>

          <form
            className='cost-tracker-form'
            action='#'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='cost-tracker-form-inputs-wrapper'>
              <div className='cost-tracker-input-container'>
                <label
                  className='cost-tracker-input-label'
                  htmlFor='equipment-name'
                >
                  Equipment Name
                </label>
                <input
                  className='cost-tracker-input'
                  type='text'
                  name='equipmentName'
                  id='equipment-name'
                  placeholder='Television'
                  ref={register}
                  required
                  autoFocus
                />
              </div>

              <div className='cost-tracker-input-container'>
                <label
                  className='cost-tracker-input-label'
                  htmlFor='equipment-wattage'
                >
                  Wattage (watts)
                </label>
                <input
                  className='cost-tracker-input'
                  type='text'
                  inputMode='decimal'
                  name='equipmentWattage'
                  id='equipment-wattage'
                  placeholder='200'
                  ref={register}
                  required
                />
              </div>

              <div className='cost-tracker-input-container'>
                <label
                  className='cost-tracker-input-label'
                  htmlFor='equipment-purchase-date'
                >
                  Date Purchased
                </label>
                <Controller
                  as={equipmentPurchaseDatePicker}
                  name='equipmentPurchaseDate'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: true,
                  }}
                  validateStatus={
                    errors.equipmentPurchaseDate && 'Please enter a date'
                      ? 'error'
                      : ''
                  }
                  help={errors.equipmentPurchaseDate && 'Please enter a date'}
                />
                <p className='input-error-message'>
                  {errors.equipmentPurchaseDate && 'Please enter a date'}
                </p>
              </div>

              <div className='cost-tracker-input-container'>
                <label
                  className='cost-tracker-input-label'
                  htmlFor='equipment-quantity'
                >
                  Quantity
                </label>
                <input
                  className='cost-tracker-input'
                  type='text'
                  inputMode='decimal'
                  name='equipmentQuantity'
                  id='equipment-quantity'
                  placeholder='1'
                  ref={register}
                  required
                />
              </div>
            </div>

            <button className='cost-tracker-form-submit-button'>Add</button>
          </form>
        </section>
      </div>

      <article className='equipment-table-container'>
        <h2 className='equipment-table-container__heading cost-tracker-form-section__heading'>
          List of Equipment
        </h2>

        <div className='equipment-table-wrapper'>
          <ListOfEquipmentTable listOfEquipmentData={allEquipment} />
        </div>
      </article>
    </>
  );
}

export default AddEquipment;
