import React, { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox } from 'antd';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';

import PrintButtons from '../smallComponents/PrintButtons';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/alerts-and-alarms', name: 'Alerts and Alarms', id: 2 },
];

function AlertsAndAlarms({ match }) {
  const { setCurrentUrl } = useContext(CompleteDataContext);

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  const { register, handleSubmit, setValue, control, errors } = useForm();

  return (
    <>
      <div className='breadcrumb-and-print-buttons'>
        <BreadCrumb routesArray={breadCrumbRoutes} />
        <PrintButtons />
      </div>

      <div className='alerts-and-alarms-form-content-wrapper'>
        <h1 className='center-main-heading alerts-and-alarms-heading'>
          Alerts and Alarms
        </h1>

        <form
          action='#'
          className='alerts-and-alarms-form'
          // onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset className='alerts-and-alarms-form-inputs-wrapper'>
            <legend className='alerts-and-alarms-form-section-heading'>
              Standard Alerts on Anomalies
            </legend>

            <ol className='alerts-and-alarms-list'>
              <li className='alerts-and-alarms-list-item'>
                <div className='alerts-and-alarms-question-container'>
                  <p className='alerts-and-alarms-question'>
                    Power factor exceeds{' '}
                    <label
                      className='h-screen-reader-text'
                      htmlFor='high-power-factor'
                    >
                      a high power factor of
                    </label>
                    <input
                      className='alerts-and-alarms-input'
                      type='text'
                      inputMode='decimal'
                      name='highPowerFactor'
                      id='high-power-factor'
                      ref={register}
                      autoFocus
                    />{' '}
                    or goes below{' '}
                    <label
                      className='h-screen-reader-text'
                      htmlFor='high-power-factor'
                    >
                      a low power factor of
                    </label>
                    <input
                      className='alerts-and-alarms-input'
                      type='text'
                      inputMode='decimal'
                      name='lowPowerFactor'
                      id='low-power-factor'
                      ref={register}
                    />
                  </p>

                  <div>
                    <Checkbox
                      className='power-factor-checkbox alerts-and-alarms-checkbox'
                      name='powerFactorChecked'
                      // onChange={handlePowerFactorCheck}
                    />
                  </div>
                </div>
              </li>

              <li className='alerts-and-alarms-list-item'>
                <div className='alerts-and-alarms-question-container'>
                  {' '}
                  <p className='alerts-and-alarms-question'>
                    Load balance issues detected
                  </p>{' '}
                  <div>
                    <Checkbox
                      className='load-balance-issues-checkbox alerts-and-alarms-checkbox'
                      name='loadBalanceIssuesChecked'
                      // onChange={handlePowerFactorCheck}
                    />
                  </div>
                </div>
              </li>

              <li className='alerts-and-alarms-list-item'>
                <div className='alerts-and-alarms-question-container'>
                  <p className='alerts-and-alarms-question'>
                    <label htmlFor='frequency-variance-factor'>
                      {' '}
                      Frequency variance between threshold ±
                    </label>{' '}
                    <input
                      className='alerts-and-alarms-input'
                      type='text'
                      inputMode='decimal'
                      name='frequencyVariance'
                      id='frequency-variance-factor'
                      ref={register}
                    />
                  </p>

                  <div>
                    <Checkbox
                      className='frequency-variance-checkbox alerts-and-alarms-checkbox'
                      name='frequencyVarianceChecked'
                      // onChange={handlePowerFactorCheck}
                    />
                  </div>
                </div>
              </li>

              <li className='alerts-and-alarms-list-item'>
                <div className='alerts-and-alarms-question-container'>
                  <p className='alerts-and-alarms-question'>
                    Voltage exceeds{' '}
                    <label
                      className='h-screen-reader-text'
                      htmlFor='high-voltage'
                    >
                      a high voltage of
                    </label>
                    <input
                      className='alerts-and-alarms-input'
                      type='text'
                      inputMode='decimal'
                      name='highVoltage'
                      id='high-voltage'
                      ref={register}
                    />{' '}
                    <span className='alerts-and-alarms-unit'>volts</span> or
                    goes below{' '}
                    <label
                      className='h-screen-reader-text'
                      htmlFor='low-voltage'
                    >
                      a low power factor of
                    </label>
                    <input
                      className='alerts-and-alarms-input'
                      type='text'
                      inputMode='decimal'
                      name='lowVoltage'
                      id='low-voltage'
                      ref={register}
                    />{' '}
                    <span className='alerts-and-alarms-unit'>volts</span>
                  </p>

                  <div>
                    <Checkbox
                      className='voltage-checkbox alerts-and-alarms-checkbox'
                      name='voltageChecked'
                      // onChange={handlePowerFactorCheck}
                    />
                  </div>
                </div>
              </li>
            </ol>
          </fieldset>

          <fieldset className='alerts-and-alarms-form-inputs-wrapper h-second'>
            <legend className='alerts-and-alarms-form-section-heading'>
              Customised Alerts on Selected Events
            </legend>

            <ol className='alerts-and-alarms-list'>
              <li className='alerts-and-alarms-list-item'>
                <div className='alerts-and-alarms-question-container'>
                  {' '}
                  <p className='alerts-and-alarms-question'>
                    When eliminated CO<sub>2</sub> is reached
                  </p>{' '}
                  <div>
                    <Checkbox
                      className='eliminated-co2-checkbox alerts-and-alarms-checkbox'
                      name='eliminatedCo2Checked'
                      // onChange={handlePowerFactorCheck}
                    />
                  </div>
                </div>
              </li>

              <li className='alerts-and-alarms-list-item'>
                <div className='alerts-and-alarms-question-container'>
                  {' '}
                  <p className='alerts-and-alarms-question'>
                    When set CO<sub>2</sub> is reached
                  </p>{' '}
                  <div>
                    <Checkbox
                      className='set-co2-checkbox alerts-and-alarms-checkbox'
                      name='setCo2Checked'
                      // onChange={handlePowerFactorCheck}
                    />
                  </div>
                </div>
              </li>

              <li className='alerts-and-alarms-list-item'>
                <div className='alerts-and-alarms-question-container'>
                  {' '}
                  <p className='alerts-and-alarms-question'>
                    When any generator is turned on outside operating hours
                  </p>{' '}
                  <div>
                    <Checkbox
                      className='generator-on-checkbox alerts-and-alarms-checkbox'
                      name='generatorOnChecked'
                      // onChange={handlePowerFactorCheck}
                    />
                  </div>
                </div>
              </li>

              <li className='alerts-and-alarms-list-item'>
                <div className='alerts-and-alarms-question-container'>
                  <p className='alerts-and-alarms-question'>
                    When <label htmlFor='load-excess'>load</label> exceeds{' '}
                    <input
                      className='alerts-and-alarms-input'
                      type='text'
                      inputMode='decimal'
                      name='loadExcess'
                      id='load-excess'
                      ref={register}
                    />{' '}
                    <span className='alerts-and-alarms-unit'>kW</span>
                  </p>

                  <div>
                    <Checkbox
                      className='frequency-variance-checkbox alerts-and-alarms-checkbox'
                      name='frequencyVarianceChecked'
                      // onChange={handlePowerFactorCheck}
                    />
                  </div>
                </div>
              </li>

              <li className='alerts-and-alarms-list-item'>
                <div className='alerts-and-alarms-question-container'>
                  {' '}
                  <p className='alerts-and-alarms-question'>
                    When priority power is available and generator is still
                    being used
                  </p>{' '}
                  <div>
                    <Checkbox
                      className='priority-power-unused-checkbox alerts-and-alarms-checkbox'
                      name='priorityPowerUnusedChecked'
                      // onChange={handlePowerFactorCheck}
                    />
                  </div>
                </div>
              </li>

              <li className='alerts-and-alarms-list-item'>
                <div className='alerts-and-alarms-question-container'>
                  {' '}
                  <p className='alerts-and-alarms-question'>
                    When set generator maintenance time is drawing close
                  </p>{' '}
                  <div>
                    <Checkbox
                      className='generator-maintenance-time-checkbox alerts-and-alarms-checkbox'
                      name='generatorMaintenanceTimeChecked'
                      // onChange={handlePowerFactorCheck}
                    />
                  </div>
                </div>
              </li>
            </ol>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default AlertsAndAlarms;
