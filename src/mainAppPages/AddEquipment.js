import React, { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker, notification, Select } from 'antd';
// import { v4 as uuidv4 } from 'uuid';
import CompleteDataContext from '../Context';

import equipmentHttpServices from '../services/equipment';

import BreadCrumb from '../components/BreadCrumb';
import ListOfEquipmentTable from '../components/tables/ListOfEquipmentTable';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/cost-tracker', name: 'Cost Tracker', id: 2 },
  { url: '#', name: 'Add Equipment', id: 3 },
];

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Submission Successful',
    description: `Equipment list successfully updated`,
  });
};

function AddEquipment({ match }) {
  const { setCurrentUrl, token, userId, organization } = useContext(CompleteDataContext);
  const [allEquipment, setAllEquipment] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    errors,
  } = useForm();

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }

    equipmentHttpServices
      .getAll()
      .then((returnedEquipment) => setAllEquipment(returnedEquipment))
      .catch((error) => {
        console.log(error.response);
      });
  }, [match, setCurrentUrl]);

  const { Option } = Select
  let branchname = organization && organization.branches

  const branchSelectorStyle = {
      width:'100%',
      borderRadius: '4px',
      display:'block',
      color: '#595959',
      fontSize: '1.4rem',
      height: '40px',
  }

  let branchSelectorValue;
  const branchSelector = (
        <Select style={branchSelectorStyle} 
        className="h-4-br" 
        allowClear 
        onSelect={(branch)=>{
          branchSelectorValue =  branch
        }}>
        {branchname && branchname.map((branch)=>{
        return <Option value={branch.id} key={branch.id}>
                  {branch.name}
              </Option>
        })
        }
        </Select>
  )

  const equipmentPurchaseDatePicker = (
    <DatePicker
      format="DD-MM-YYYY"
      className="generic-input"
      id="equipment-purchase-date"
      onChange={(e) => setValue('equipmentPurchaseDate', e.target.value, true)}
    />
  );

  const onSubmit = ({
    equipmentName,
    equipmentWattage,
    equipmentPurchaseDate,
    equipmentQuantity,
  }) => {
    const newEquipmentData = {
      name: equipmentName,
      voltage: equipmentWattage,
      quantity: equipmentQuantity,
      date_purchased: equipmentPurchaseDate.format('YYYY-MM-DD'),
    };

    equipmentHttpServices
      .add(newEquipmentData,branchSelectorValue,userId,token)
      .then((returnedEquipment) => {
        setAllEquipment(allEquipment.concat(returnedEquipment));
        openNotificationWithIcon('success');
      })
      .catch((error) => {
        console.log(error.response);
      });

    // Reset form fields. Controller value is set manually
    setValue('equipmentPurchaseDate', undefined);
    reset();
  };

  return (
    <>
      <div className="breadcrumb-and-print-buttons">
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>

      <div className="cost-tracker-forms-content-wrapper">
        <h1 className="center-main-heading">Equipment</h1>

        <section className="cost-tracker-form-section">
          <h2 className="form-section-heading cost-tracker-form-section__heading">
            Add Equipment
          </h2>

          <form
            className="cost-tracker-form"
            action="#"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="cost-tracker-form-inputs-wrapper">
              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="equipment-name"
                >
                  Equipment Name
                </label>
                <input
                  className="generic-input"
                  type="text"
                  name="equipmentName"
                  id="equipment-name"
                  placeholder="Television"
                  ref={register}
                  required
                  autoFocus
                />
              </div>

              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="equipment-wattage"
                >
                  Wattage (watts)
                </label>
                <input
                  className="generic-input"
                  type="text"
                  inputMode="decimal"
                  name="equipmentWattage"
                  id="equipment-wattage"
                  placeholder="200"
                  ref={register({
                    required: true,
                    pattern: /^-?\d+\.?\d*$/,
                  })}
                  required
                />
                <p className="input-error-message">
                  {errors.equipmentWattage && 'Please enter a number'}
                </p>
              </div>

              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="equipment-purchase-date"
                >
                  Date Purchased
                </label>
                <Controller
                  as={equipmentPurchaseDatePicker}
                  name="equipmentPurchaseDate"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  validateStatus={
                    errors.equipmentPurchaseDate && 'Please select a date'
                      ? 'error'
                      : ''
                  }
                  help={errors.equipmentPurchaseDate && 'Please select a date'}
                />
                <p className="input-error-message">
                  {errors.equipmentPurchaseDate && 'Please select a date'}
                </p>
              </div>

              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="equipment-branch"
                >
                Branch
                </label>
              {branchSelector}
            </div>

              <div className="cost-tracker-input-container">
                <label
                  className="generic-input-label cost-tracker-input-label"
                  htmlFor="equipment-quantity"
                >
                  Quantity
                </label>
                <input
                  className="generic-input"
                  type="text"
                  inputMode="decimal"
                  name="equipmentQuantity"
                  id="equipment-quantity"
                  placeholder="1"
                  ref={register({
                    required: true,
                    pattern: /^-?\d+\.?\d*$/,
                  })}
                  required
                />
                <p className="input-error-message">
                  {errors.equipmentQuantity && 'Please enter a number'}
                </p>
              </div>
            </div>
            
            <button className="generic-submit-button cost-tracker-form-submit-button">
              Add
            </button>
        </form>
      </section>
    </div>

      <article className="equipment-table-container">
        <h2 className="equipment-table-container__heading form-section-heading cost-tracker-form-section__heading">
          List of Equipment
        </h2>

        <div className="equipment-table-wrapper">
          {<ListOfEquipmentTable listOfEquipmentData={allEquipment} />}
        </div>
      </article>
    </>
  );
}

export default AddEquipment;
