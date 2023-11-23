import React, { useEffect, useContext } from 'react';

import CompleteDataContext from '../Context';

import BreadCrumb from '../components/BreadCrumb';

import GenericReportTable from '../components/tables/reportTables/GenericReportTable';

import {
  BreakersColumns,
} from '../helpers/tableColumns';

import Loader from '../components/Loader';
import { connect, useSelector } from 'react-redux';
import { fetchBranhBreakers, toggleBreaker } from '../redux/actions/breakers/breakers.action';



const breadCrumbRoutes = [
  { url: '/', name: 'Home', id: 1 },
  { url: '#', name: 'Breakers', id: 2 },
];


function Beakers({ match, sideBar: sideDetails, fetchBranhBreakers: fetchBreakers, toggleBreaker: toggleABreaker }) {

  const breakers = useSelector((state) => state.breakers);
  const {
    setCurrentUrl,
  } = useContext(CompleteDataContext);

  const onSwitchChange = async (checked, record) => {
    const state = checked ? 'ON' : 'OFF';
    await toggleABreaker({ state, meter_id: record.device_id })

    // make the api call here

  }


  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  useEffect(() => {
    // fetch breakers
    const branchId = sideDetails?.sideBarData?.branches && sideDetails?.sideBarData?.branches[sideDetails?.sideBarData?.branches.length -1]?.branch_id

    if (sideDetails.sideBarData && branchId) {

      fetchBreakers(branchId)
    }
  }, [sideDetails.sideBarData, breakers.toggleBreakerSuccess]);


  if (breakers.fetchBreakerLoading) {
    return <Loader />;
  }

  return (
    <div >
      <div className="breadcrumb-and-print-buttons">
        <BreadCrumb routesArray={breadCrumbRoutes} />
        {/* <div></div> */}
      </div>
      <div id='page'>

        <div className="report-full-width-with-no-height-rows">
          <div className="report-row-1__content">
            {breakers.breakersData && (
              <div className="report-chart-container">
                <div className="h-overflow-auto report-card-tabble__padding">
                  <h2 className="report-pie-heading">
                    Breakers
                  </h2>
                  <GenericReportTable data={breakers.breakersData}
                    columnData={BreakersColumns(onSwitchChange)} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  fetchBranhBreakers,
  toggleBreaker,
};
const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
  sideBar: state.sideBar,
});

export default connect(mapStateToProps, mapDispatchToProps)(Beakers);
