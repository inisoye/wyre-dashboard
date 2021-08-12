import React, { useState, useEffect, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Checkbox } from 'antd';

import CompleteDataContext from '../Context';

import alertsHttpServices from '../services/alertsAndAlarms';

import BreadCrumb from '../components/BreadCrumb';

import HiddenInputLabel from '../smallComponents/HiddenInputLabel';

const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '/alerts-and-alarms', name: 'Alerts and Alarms', id: 2 },
];

function AlertsAndAlarms({ match }) {
  const { setCurrentUrl, token, userId } = useContext(CompleteDataContext);
  const [preloadedAlertsFormData, setPreloadedAlertsFormData] = useState({});

  const isDataReady = preloadedAlertsFormData && preloadedAlertsFormData

  const [power_factor_alerts, setpower_factor_alerts] = useState(preloadedAlertsFormData.power_factor_alerts)
  const [max_power_factor, setmax_power_factor] = useState(isDataReady.max_power_factor)
  const [min_power_factor, setmin_power_factor] = useState(isDataReady.min_power_factor)
  const [baseline_alerts, setbaseline_alerts] = useState(isDataReady.baseline_alerts)
  const [load_balance_alerts, setload_balance_alerts] = useState(isDataReady.load_balance_alerts)
  const [frequency_alerts, setFrequency_alerts] = useState(isDataReady.frequency_alerts)
  const [frequency_normal, setfrequency_normal] = useState(isDataReady.frequency_normal)
  const [frequency_precision, setfrequency_precision] = useState(isDataReady.frequency_precision)
  const [voltage_alerts, setvoltage_alerts] = useState(isDataReady.voltage_alerts)
  const [max_voltage, setmax_voltage] = useState(isDataReady.max_voltage)
  const [min_voltage, setmin_voltage] = useState(isDataReady.min_voltage)
  const [emitted_co2_alerts, setemitted_co2_alerts] = useState(isDataReady.emitted_co2_alerts)
  const [set_co2_alerts, setset_co2_alerts] = useState(isDataReady.set_co2_alerts)
  const [set_co2_value, setset_co2_value] = useState(isDataReady.set_co2_value)
  const [operating_time_alerts, setoperating_time_alerts] = useState(isDataReady.operating_time_alerts)
  const [operation_start_time, setoperation_start_time] = useState(isDataReady.operation_start_time)
  const [operation_end_time, setoperation_end_time] = useState(isDataReady.operation_end_time)
  const [load_alerts, setload_alerts] = useState(isDataReady.load_alerts)
  const [load_threshold_value, setload_threshold_value] = useState(isDataReady.load_threshold_value)
  const [changeover_lag_alerts, setchangeover_lag_alerts] = useState(isDataReady.changeover_lag_alerts)
  const [generator_maintenance_alert, setgenerator_maintenance_alert] = useState(isDataReady.generator_maintenance_alert)
  
  console.log(preloadedAlertsFormData)

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  const { register, handleSubmit, control, errors, reset } = useForm({
    defaultValues: preloadedAlertsFormData,
  });

  // Get all alerts
  useEffect(() => {
    alertsHttpServices.getAll(userId,token).then((returnedData) => {
      /**
       * Reset added to force form prefilling
       * https://stackoverflow.com/a/64307087/15063835
       */
      reset(returnedData.data);
      setPreloadedAlertsFormData(returnedData.data);
    });
  }, [reset]);

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
    loadExcessChecked,
    priorityPowerUnusedChecked,
    generatorMaintenanceTimeChecked,
  }) => {
    const newAlertsFormData = {
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
      loadExcessChecked,
      priorityPowerUnusedChecked,
      generatorMaintenanceTimeChecked,
    };

    const updatedAlertsFormData = {
      ...preloadedAlertsFormData,
      ...newAlertsFormData,
    };

    alertsHttpServices.update(updatedAlertsFormData);
  };

  return (
    <>
      <div className="breadcrumb-and-print-buttons">
        <BreadCrumb routesArray={breadCrumbRoutes} />
      </div>

      <div className="alerts-and-alarms-form-content-wrapper">
        <h1 className="center-main-heading alerts-and-alarms-heading">
          Alerts and Alarms
        </h1>

        <form
          action="#"
          className="alerts-and-alarms-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <fieldset className="alerts-and-alarms-form-inputs-wrapper">
            <legend className="alerts-and-alarms-form-section-heading">
              Standard Alerts on Anomalies
            </legend>

            <ol className="alerts-and-alarms-list">
              <li className="alerts-and-alarms-list-item">
                <div className="alerts-and-alarms-question-container">
                  <div>
                    <p className="alerts-and-alarms-question">
                      Power factor exceeds{' '}
                      <label
                        className="h-screen-reader-text"
                        htmlFor="high-power-factor"
                      >
                        a high power factor of
                      </label>
                      <input
                        className="alerts-and-alarms-input"
                        type="text"
                        inputMode="decimal"
                        name="highPowerFactor"
                        id="high-power-factor"
                        ref={register({
                          pattern: /^-?\d+\.?\d*$/,
                        })}
                        placeholder={preloadedAlertsFormData.max_power_factor}
                        value={max_power_factor}
                        onChange={(e)=>{
                          e.preventDefault()
                          setmax_power_factor(e.target.value)
                          // preloadedAlertsFormData.max_power_factor = parseFloat(e.target.value)
                        }}
                        autoFocus
                      />{' '}
                      or goes below{' '}
                      <label
                        className="h-screen-reader-text"
                        htmlFor="high-power-factor"
                      >
                        a low power factor of
                      </label>
                      <input
                        className="alerts-and-alarms-input"
                        type="text"
                        inputMode="decimal"
                        name="lowPowerFactor"
                        id="low-power-factor"
                        placeholder={preloadedAlertsFormData.min_power_factor}
                        value={preloadedAlertsFormData.min_power_factor}
                        onChange={(e)=>{
                          e.preventDefault()
                          // setmin_power_factor(e.target.value)
                        }}
                        ref={register({
                          pattern: /^-?\d+\.?\d*$/,
                        })}
                      />
                    </p>
                    <p className="input-error-message">
                      {(errors.highPowerFactor || errors.lowPowerFactor) &&
                        'Power factor values must be numbers'}
                    </p>
                  </div>

                  <div>
                    <HiddenInputLabel
                      htmlFor="power-factor-checkbox"
                      labelText="Power Factor"
                    />
                    <Controller
                      name="powerFactorChecked"
                      defaultValue={preloadedAlertsFormData.power_factor_alerts}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => {
                              props.onChange(e.target.checked)
                              // setpower_factor_alerts(e.target.checked)
                          }}
                          checked={props.value}
                          className="power-factor-checkbox alerts-and-alarms-checkbox"
                          id="power-factor-checkbox"
                        />
                      )}
                    />
                  </div>
                </div>
              </li>

              <li className="alerts-and-alarms-list-item">
                <div className="alerts-and-alarms-question-container">
                  {' '}
                  <label
                    htmlFor="load-balance-issues-checkbox"
                    className="alerts-and-alarms-question"
                  >
                    Load balance issues detected
                  </label>{' '}
                  <Controller
                    name="loadBalanceIssuesChecked"
                    defaultValue={false}
                    control={control}
                    render={(props) => (
                      <Checkbox
                        onChange={(e) => props.onChange(e.target.checked)}
                        checked={props.value}
                        className="load-balance-issues-checkbox alerts-and-alarms-checkbox"
                        id="load-balance-issues-checkbox"
                      />
                    )}
                  />
                </div>
              </li>

              <li className="alerts-and-alarms-list-item">
                <div className="alerts-and-alarms-question-container">
                  <div>
                    <p className="alerts-and-alarms-question">
                      <label htmlFor="frequency-variance-factor">
                        {' '}
                        Frequency variance between threshold ±
                      </label>{' '}
                      <input
                        className="alerts-and-alarms-input"
                        type="text"
                        inputMode="decimal"
                        name="frequencyVariance"
                        id="frequency-variance-factor"
                        ref={register({
                          pattern: /^-?\d+\.?\d*$/,
                        })}
                      />
                    </p>
                    <p className="input-error-message">
                      {errors.frequencyVariance &&
                        'Frequency variance must be a number'}
                    </p>
                  </div>

                  <div>
                    <HiddenInputLabel
                      htmlFor="frequency-variance-checkbox"
                      labelText="Frequency Variance"
                    />
                    <Controller
                      name="frequencyVarianceChecked"
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className="frequency-variance-checkbox alerts-and-alarms-checkbox"
                          id="frequency-variance-checkbox"
                        />
                      )}
                    />
                  </div>
                </div>
              </li>

              <li className="alerts-and-alarms-list-item">
                <div className="alerts-and-alarms-question-container">
                  <div>
                    <p className="alerts-and-alarms-question">
                      Voltage exceeds{' '}
                      <label
                        className="h-screen-reader-text"
                        htmlFor="high-voltage"
                      >
                        a high voltage of
                      </label>
                      <input
                        className="alerts-and-alarms-input"
                        type="text"
                        inputMode="decimal"
                        name="highVoltage"
                        id="high-voltage"
                        ref={register({
                          pattern: /^-?\d+\.?\d*$/,
                        })}
                      />{' '}
                      <span className="alerts-and-alarms-unit">volts</span> or
                      goes below{' '}
                      <label
                        className="h-screen-reader-text"
                        htmlFor="low-voltage"
                      >
                        a low power factor of
                      </label>
                      <input
                        className="alerts-and-alarms-input"
                        type="text"
                        inputMode="decimal"
                        name="lowVoltage"
                        id="low-voltage"
                        ref={register({
                          pattern: /^-?\d+\.?\d*$/,
                        })}
                      />{' '}
                      <span className="alerts-and-alarms-unit">volts</span>
                    </p>
                    <p className="input-error-message">
                      {(errors.highVoltage || errors.lowVoltage) &&
                        'Voltage values must be numbers'}
                    </p>
                  </div>

                  <div>
                    <HiddenInputLabel
                      htmlFor="voltage-checkbox"
                      labelText="Voltage"
                    />

                    <Controller
                      name="voltageChecked"
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className="voltage-checkbox alerts-and-alarms-checkbox"
                          id="voltage-checkbox"
                        />
                      )}
                    />
                  </div>
                </div>
              </li>
            </ol>
          </fieldset>

          <fieldset className="alerts-and-alarms-form-inputs-wrapper h-second">
            <legend className="alerts-and-alarms-form-section-heading">
              Customised Alerts on Selected Events
            </legend>

            <ol className="alerts-and-alarms-list">
              <li className="alerts-and-alarms-list-item">
                <div className="alerts-and-alarms-question-container">
                  {' '}
                  <label
                    htmlFor="eliminated-co2-checkbox"
                    className="alerts-and-alarms-question"
                  >
                    When eliminated CO<sub>2</sub> is reached
                  </label>{' '}
                  <div>
                    <Controller
                      name="eliminatedCo2Checked"
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className="eliminated-co2-checkbox alerts-and-alarms-checkbox"
                          id="eliminated-co2-checkbox"
                        />
                      )}
                    />
                  </div>
                </div>
              </li>

              <li className="alerts-and-alarms-list-item">
                <div className="alerts-and-alarms-question-container">
                  {' '}
                  <label
                    htmlFor="set-co2-checkbox"
                    className="alerts-and-alarms-question"
                  >
                    When set CO<sub>2</sub> is reached
                  </label>{' '}
                  <div>
                    <Controller
                      name="setCo2Checked"
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className="set-co2-checkbox alerts-and-alarms-checkbox"
                          id="set-co2-checkbox"
                        />
                      )}
                    />
                  </div>
                </div>
              </li>

              <li className="alerts-and-alarms-list-item">
                <div className="alerts-and-alarms-question-container">
                  {' '}
                  <label
                    htmlFor="generator-on-checkbox"
                    className="alerts-and-alarms-question"
                  >
                    When any generator is turned on outside operating hours
                  </label>{' '}
                  <div>
                    <Controller
                      name="generatorOnChecked"
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className="generator-on-checkbox alerts-and-alarms-checkbox"
                          id="generator-on-checkbox"
                        />
                      )}
                    />
                  </div>
                </div>
              </li>

              <li className="alerts-and-alarms-list-item">
                <div className="alerts-and-alarms-question-container">
                  <div>
                    <p className="alerts-and-alarms-question">
                      When <label htmlFor="load-excess">load</label> exceeds{' '}
                      <input
                        className="alerts-and-alarms-input"
                        type="text"
                        inputMode="decimal"
                        name="loadExcess"
                        id="load-excess"
                        ref={register({
                          pattern: /^-?\d+\.?\d*$/,
                        })}
                      />{' '}
                      <span className="alerts-and-alarms-unit">kW</span>
                    </p>
                    <p className="input-error-message">
                      {errors.loadExcess &&
                        'Load excess value must be a number'}
                    </p>
                  </div>

                  <div>
                    <HiddenInputLabel
                      htmlFor="load-excess-checkbox"
                      labelText="Load Excess"
                    />

                    <Controller
                      name="loadExcessChecked"
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className="load-excess-checkbox alerts-and-alarms-checkbox"
                          id="load-excess-checkbox"
                        />
                      )}
                    />
                  </div>
                </div>
              </li>

              <li className="alerts-and-alarms-list-item">
                <div className="alerts-and-alarms-question-container">
                  {' '}
                  <label
                    htmlFor="priority-power-unused-checkbox"
                    className="alerts-and-alarms-question"
                  >
                    When priority power is available and generator is still
                    being used
                  </label>{' '}
                  <div>
                    <Controller
                      name="priorityPowerUnusedChecked"
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className="priority-power-unused-checkbox alerts-and-alarms-checkbox"
                          id="priority-power-unused-checkbox"
                        />
                      )}
                    />
                  </div>
                </div>
              </li>

              <li className="alerts-and-alarms-list-item">
                <div className="alerts-and-alarms-question-container">
                  {' '}
                  <label
                    htmlFor="generator-maintenance-time-checkbox"
                    className="alerts-and-alarms-question"
                  >
                    When set generator maintenance time is drawing close
                  </label>{' '}
                  <div>
                    <Controller
                      name="generatorMaintenanceTimeChecked"
                      defaultValue={false}
                      control={control}
                      render={(props) => (
                        <Checkbox
                          onChange={(e) => props.onChange(e.target.checked)}
                          checked={props.value}
                          className="generator-maintenance-time-checkbox alerts-and-alarms-checkbox"
                          id="generator-maintenance-time-checkbox"
                        />
                      )}
                    />
                  </div>
                </div>
              </li>
            </ol>
          </fieldset>

          <div className="alert-and-alarms-button-container">
            <button
              type="submit"
              className="generic-submit-button alert-and-alarms-button"
            >
              Save Updates
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AlertsAndAlarms;
