import React, { useEffect, useContext } from 'react';
import { notification, Form, Spin } from 'antd';
import { connect } from 'react-redux';
import CompleteDataContext from '../Context';



import BreadCrumb from '../components/BreadCrumb';
import Loader from '../components/Loader';
import { addFuelConsumptionData } from '../redux/actions/constTracker/costTracker.action';
import { DateField, NumberField, SelectField } from '../components/FormFields/GeneralFormFields';



const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/cost-tracker', name: 'Cost Tracker', id: 2 },
  { url: '#', name: 'Add Diesel Entry', id: 3 },
];

const openNotificationWithIcon = (type, formName) => {
  notification[type]({
    message: 'Bill Updated',
    description: `Your addition to the ${formName} has been successfully submitted`,
  });
};

const NotAllowedNotification = () => {
  notification.error({
    message: 'Request Error',
    description: 'NOT ALLOWED',
    duration: 5
  })
}

function AddDieselEntry({ match, addFuelConsumptionData: addFuelConsumption }) {
  const [EOMBalanceForm] = Form.useForm();

  const { setCurrentUrl, isAuthenticatedDataLoading, organization, userId } = useContext(
    CompleteDataContext
  );


  const data = {
    quantity: {
      label: 'Quantity',
      name: 'quantity',
      placeholder: 'Enter Quantity'
    },
    purchaseDate: {
      label: 'Date',
      name: 'date'
    },
    fuelType: {
      name: 'fuelType',
      label: 'Fuel Type',
      optionData: ['diesel'],
      placeholder: 'Select Fuel Type'
    }
  }

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, userId]);


  let defaultBranch;
  if (organization.branches) {
    defaultBranch = organization.branches[0].branch_id
  }


  const onUsedTrackerSubmit = async ({ date, quantity, fuelType }) => {
    if (defaultBranch != null) {

      const branch = organization.branches[0].branch_id
      const parameters = {
        branch,
        end_date: date.format('YYYY-MM-DD'),
        quantity: quantity,
        start_date: date.format('YYYY-MM-DD'),
        fuel_type: fuelType,
      };
      const request = await addFuelConsumption(branch, parameters);

      if (request.fullfilled) {
        openNotificationWithIcon('success', 'diesel entry');
        return EOMBalanceForm.resetFields();
      }

      openNotificationWithIcon('error', request.message|| 'An error occured,Please try again!!!')
      return EOMBalanceForm.resetFields();
    }
    else {
      NotAllowedNotification();
    }
  }


  // run loader if data is loading
  if (isAuthenticatedDataLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="breadcrumb-and-print-buttons">
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>

      <div className="cost-tracker-forms-content-wrapper">

        <h1 className="center-main-heading">Add Diesel Entry</h1>

        <section className="cost-tracker-form-section add-bills-section">
          <Spin spinning={false}>
            <h2 className="form-section-heading add-bills-section__heading">
              Diesel Entry
            </h2>

            <Form
              form={EOMBalanceForm}
              name="diesel-purchase"
              initialValues={{
                fuelType: 'diesel',
              }}
              className="cost-tracker-form"
              onFinish={onUsedTrackerSubmit}
            >
              <div className="cost-tracker-form-inputs-wrapper">

                <div className="cost-tracker-input-container">
                  <Form.Item>
                    <DateField data={data.purchaseDate} />
                  </Form.Item>
                </div>
                <div className="cost-tracker-input-container">
                  <Form.Item>
                    <NumberField
                      data={
                        data.quantity
                      }
                    />
                  </Form.Item>
                </div>
                <div className="cost-tracker-input-container">
                  <Form.Item>
                    <SelectField
                      data={data.fuelType}
                    />
                  </Form.Item>
                </div>

              </div>
              <button className="generic-submit-button cost-tracker-form-submit-button">
                Submit
              </button>
            </Form>
          </Spin>
        </section>

      </div>
    </>
  );
}

// export default AddDieselEntry;


const mapDispatchToProps = {
  addFuelConsumptionData,
};


export default connect(null, mapDispatchToProps)(AddDieselEntry);