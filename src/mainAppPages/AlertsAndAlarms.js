import React, { useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Checkbox } from 'antd';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';

import PrintButtons from '../smallComponents/PrintButtons';
import HiddenInputLabel from '../smallComponents/HiddenInputLabel';

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

  const { register, handleSubmit, control, errors } = useForm();

  const isThereANumberInputError =
    errors.highPowerFactor ||
    errors.lowPowerFactor ||
    errors.frequencyVariance ||
    errors.highVoltage ||
    errors.lowVoltage ||
    errors.loadExcess;

  const onSubmit = ({
    highPowerFactor,
    lowPowerFactor,
    powerFactorChecked,
    loadBalanceIssuesChecked,
    frequencyVariance,
    frequencyVarianceChecked,
    highVoltage,
    lowVoltage,
    voltageChecked,
    eliminatedCo2Checked,
    setCo2Checked,
    generatorOnChecked,
    loadExcess,
    LoadExcessChecked,
    priorityPowerUnusedChecked,
    generatorMaintenanceTimeChecked,
  }) => {
    console.log(
      highPowerFactor,
      lowPowerFactor,
      powerFactorChecked,
      loadBalanceIssuesChecked,
      frequencyVariance,
      frequencyVarianceChecked,
      highVoltage,
      lowVoltage,
      voltageChecked,
      eliminatedCo2Checked,
      setCo2Checked,
      generatorOnChecked,
      loadExcess,
      LoadExcessChecked,
      priorityPowerUnusedChecked,
      generatorMaintenanceTimeChecked
    );
  };

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
          onSubmit={handleSubmit(onSubmit)}
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
                      ref={register({
                        pattern: /^-?\d+\.?\d*$/,
                      })}
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
                      ref={register({
                        pattern: /^-?\d+\.?\d*$/,
                      })}
                    />
                  </p>

                  <div>
                    <HiddenInputLabel
                      htmlFor='power-factor-checkbox'
                      labelText='Power Factor'
                    />
                    <Controller
                      name='powerFactorChecked'
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className='power-factor-checkbox alerts-and-alarms-checkbox'
                          id='power-factor-checkbox'
                        />
                      )}
                    />
                  </div>
                </div>
              </li>

              <li className='alerts-and-alarms-list-item'>
                <div className='alerts-and-alarms-question-container'>
                  {' '}
                  <label
                    htmlFor='load-balance-issues-checkbox'
                    className='alerts-and-alarms-question'
                  >
                    Load balance issues detected
                  </label>{' '}
                  <Controller
                    name='loadBalanceIssuesChecked'
                    defaultValue={false}
                    control={control}
                    render={(props) => (
                      <Checkbox
                        onChange={(e) => props.onChange(e.target.checked)}
                        checked={props.value}
                        className='load-balance-issues-checkbox alerts-and-alarms-checkbox'
                        id='load-balance-issues-checkbox'
                      />
                    )}
                  />
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
                      ref={register({
                        pattern: /^-?\d+\.?\d*$/,
                      })}
                    />
                  </p>

                  <div>
                    <HiddenInputLabel
                      htmlFor='frequency-variance-checkbox'
                      labelText='Frequency Variance'
                    />
                    <Controller
                      name='frequencyVarianceChecked'
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className='frequency-variance-checkbox alerts-and-alarms-checkbox'
                          id='frequency-variance-checkbox'
                        />
                      )}
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
                      ref={register({
                        pattern: /^-?\d+\.?\d*$/,
                      })}
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
                      ref={register({
                        pattern: /^-?\d+\.?\d*$/,
                      })}
                    />{' '}
                    <span className='alerts-and-alarms-unit'>volts</span>
                  </p>

                  <div>
                    <HiddenInputLabel
                      htmlFor='voltage-checkbox'
                      labelText='Voltage'
                    />

                    <Controller
                      name='voltageChecked'
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className='voltage-checkbox alerts-and-alarms-checkbox'
                          id='voltage-checkbox'
                        />
                      )}
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
                  <label
                    htmlFor='eliminated-co2-checkbox'
                    className='alerts-and-alarms-question'
                  >
                    When eliminated CO<sub>2</sub> is reached
                  </label>{' '}
                  <div>
                    <Controller
                      name='eliminatedCo2Checked'
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className='eliminated-co2-checkbox alerts-and-alarms-checkbox'
                          id='eliminated-co2-checkbox'
                        />
                      )}
                    />
                  </div>
                </div>
              </li>

              <li className='alerts-and-alarms-list-item'>
                <div className='alerts-and-alarms-question-container'>
                  {' '}
                  <label
                    htmlFor='set-co2-checkbox'
                    className='alerts-and-alarms-question'
                  >
                    When set CO<sub>2</sub> is reached
                  </label>{' '}
                  <div>
                    <Controller
                      name='setCo2Checked'
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className='set-co2-checkbox alerts-and-alarms-checkbox'
                          id='set-co2-checkbox'
                        />
                      )}
                    />
                  </div>
                </div>
              </li>

              <li className='alerts-and-alarms-list-item'>
                <div className='alerts-and-alarms-question-container'>
                  {' '}
                  <label
                    htmlFor='generator-on-checkbox'
                    className='alerts-and-alarms-question'
                  >
                    When any generator is turned on outside operating hours
                  </label>{' '}
                  <div>
                    <Controller
                      name='generatorOnChecked'
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className='generator-on-checkbox alerts-and-alarms-checkbox'
                          id='generator-on-checkbox'
                        />
                      )}
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
                      ref={register({
                        pattern: /^-?\d+\.?\d*$/,
                      })}
                    />{' '}
                    <span className='alerts-and-alarms-unit'>kW</span>
                  </p>

                  <div>
                    <HiddenInputLabel
                      htmlFor='load-excess-checkbox'
                      labelText='Load Excess'
                    />

                    <Controller
                      name='LoadExcessChecked'
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className='load-excess-checkbox alerts-and-alarms-checkbox'
                          id='load-excess-checkbox'
                        />
                      )}
                    />
                  </div>
                </div>
              </li>

              <li className='alerts-and-alarms-list-item'>
                <div className='alerts-and-alarms-question-container'>
                  {' '}
                  <label
                    htmlFor='priority-power-unused-checkbox'
                    className='alerts-and-alarms-question'
                  >
                    When priority power is available and generator is still
                    being used
                  </label>{' '}
                  <div>
                    <Controller
                      name='priorityPowerUnusedChecked'
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className='priority-power-unused-checkbox alerts-and-alarms-checkbox'
                          id='priority-power-unused-checkbox'
                        />
                      )}
                    />
                  </div>
                </div>
              </li>

              <li className='alerts-and-alarms-list-item'>
                <div className='alerts-and-alarms-question-container'>
                  {' '}
                  <label
                    htmlFor='generator-maintenance-time-checkbox'
                    className='alerts-and-alarms-question'
                  >
                    When set generator maintenance time is drawing close
                  </label>{' '}
                  <div>
                    <Controller
                      name='generatorMaintenanceTimeChecked'
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className='generator-maintenance-time-checkbox alerts-and-alarms-checkbox'
                          id='generator-maintenance-time-checkbox'
                        />
                      )}
                    />
                  </div>
                </div>
              </li>
            </ol>
          </fieldset>

          <div className='alert-and-alarms-button-container'>
            <button
              type='submit'
              className='generic-submit-button alert-and-alarms-button'
            >
              Save Updates
            </button>

            <p className='input-error-message'>
              {isThereANumberInputError &&
                'Please ensure all input fields above are numbers'}
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default AlertsAndAlarms;
