import React, { useEffect, useContext, useRef, useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { jsPDF } from "jspdf";
import html2pdf from "html2pdf.js"
import * as html2canvas from "html2canvas";
import CompleteDataContext from "../Context";

import BreadCrumb from "../components/BreadCrumb";
import DashboardStackedBarChart from "../components/barCharts/DashboardStackedBarChart";
import DashboardDoughnutChart from "../components/pieCharts/DashboardDoughnutChart";
import Loader from "../components/Loader";

import DashboardSmallBannerSection from "../smallComponents/DashboardSmallBannerSection";
// import PrintButtons from "../smallComponents/PrintButtons";

import DashboardUpArrow from "../icons/DashboardUpArrow";
import DashboardDownArrow from "../icons/DashboardDownArrow";
import { numberFormatter } from "../helpers/numberFormatter";

import styles from "../pdfStyles/styles";
import DashBoardAmountUsed from "../smallComponents/DashBoardAmountUsed";
import RunningTime from "../components/barCharts/RunningTime";
import { generateLoadCosumptionChartData, generateLoadOverviewChartData, refineLoadOverviewData } from "../helpers/genericHelpers";
import LoadOverviewPercentBarChart from "../components/barCharts/LoadOverviewPercentBarChart";


const breadCrumbRoutes = [
  { url: "/", name: "Home", id: 1 },
  { url: "/", name: "Dashboard", id: 2 },
];

const PDFDocument = () => (
  <Document>
    <Page size="A4" styles={styles.page}>
      <View>
        <Text>Section #1</Text>
      </View>

      <View>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

function Dashboard({ match }) {
  let { refinedRenderedData, isAuthenticatedDataLoading,
    allCheckedOrSelectedDevice } = useContext(
      CompleteDataContext
    );

  const { setCurrentUrl } = useContext(CompleteDataContext);
  const [allIsLoadDeviceData, setAllisLoadDeviceData] = useState(false);

  const {
    name,
    total_kwh,
    min_demand,
    max_demand,
    usage_hours,
    avg_demand,
    dashboard_carbon_emissions,
    cost_of_energy,
    today,
    yesterday,
    daily_kwh,
    all_device_data
  } = refinedRenderedData;

  useEffect(() => {
    if (match && match.url) {
      setCurrentUrl(match.url);
    }
  }, [match, setCurrentUrl]);

  useEffect(() => {
    if (all_device_data) {
      const data = refineLoadOverviewData(all_device_data);
      Object.values(data).map(branch => {

      } )
      setAllisLoadDeviceData(Object.values(data));
    }

  }, [all_device_data]);




  const pageRef = useRef();

  const todaysValue = today && today.value;
  const yesterdaysValue = yesterday && yesterday.value;
  const isTodaysValueLessThanYesterdays = todaysValue < yesterdaysValue;

  const generatePdf = () => {
    console.log("Generating PDFs");

    const input = document.getElementById("page");
    const page = document.querySelector(".page-content")
    html2pdf(page)

    // window
    // .open("", "PRINT", "height=650,width=900,top=100,left=100")
    // .document.write("Testing PDfs")
    // .document.close()
    // .focus()
    // .print()
    // .close();

    // html2canvas(input)
    //   .then((canvas) => {
    //     const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF('p', 'px', 'a4');
    //     var width = pdf.internal.pageSize.getWidth();
    //     var height = pdf.internal.pageSize.getHeight();

    //     pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
    //     pdf.save("test.pdf");
    //   });
  };

  if (isAuthenticatedDataLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="breadcrumb-and-print-buttons">
        <BreadCrumb routesArray={breadCrumbRoutes} />
        {/* <PrintButtons
          onClick={generatePdf}
          document={<PDFDocument />}
          fileName={"dashboard.pdf"}
        /> */}
      </div>

      <section id="page" ref={pageRef}>
        <div className="dashboard-row-1">
          <article className="dashboard__total-energy dashboard__banner--small">
            <h2 className="total-energy__heading">Total Energy</h2>
            <p className="total-energy_value">
              <span>{total_kwh && numberFormatter(total_kwh.value)}</span>
              <span>{total_kwh && total_kwh.unit}</span>
            </p>
          </article>

          <article className="dashboard__demand-banner dashboard__banner--small">
            <DashboardSmallBannerSection
              name="Max. Demand"
              value={max_demand && numberFormatter(max_demand.value.toFixed(2))}
              unit={max_demand && max_demand.unit}
            />
            <DashboardSmallBannerSection
              name="Min. Demand"
              value={min_demand && numberFormatter(min_demand.value.toFixed(2))}
              unit={min_demand && min_demand.unit}
            />
            <DashboardSmallBannerSection
              name="Avg. Demand"
              value={avg_demand && numberFormatter(avg_demand.value.toFixed(2))}
              unit={avg_demand && avg_demand.unit}
            />
          </article>

          <article className="dashboard__cost-emissions-banner dashboard__banner--small">
            <DashboardSmallBannerSection
              name="Carbon Emissions"
              value={
                dashboard_carbon_emissions &&
                numberFormatter(dashboard_carbon_emissions.value.toFixed(2))
              }
              unit={
                dashboard_carbon_emissions && dashboard_carbon_emissions.unit
              }
            />
            <DashboardSmallBannerSection
              name="Blended Cost of Energy"
              value={
                cost_of_energy &&
                numberFormatter(cost_of_energy.value.toFixed(2))
              }
              unit={cost_of_energy && cost_of_energy.unit}
            />
          </article>
        </div>
        <div className="dashboard-row-1b">
          {
            allCheckedOrSelectedDevice
            && allCheckedOrSelectedDevice.map((eachDevice, index) => {
              return index < 6 && <article key={index} className="dashboard__total-energy-amount dashboard__banner--smallb">
                <DashBoardAmountUsed key={index} name={eachDevice?.name}
                  deviceType={eachDevice.device_type}
                  totalKWH={eachDevice.billing?.totals?.present_total?.usage_kwh}
                  amount={eachDevice.billing?.totals?.present_total?.value_naira
                  }
                  timeInUse={eachDevice?.usage_hour}
                />
              </article>
            })
          }
        </div>

        <article className="dashboard-row-2 dashboard-bar-container">
          <DashboardStackedBarChart
            className=""
            data={daily_kwh}
            organization={name}
          />
        </article>

        <div className="dashboard-row-3">
          <article className="dashboard-pie-container">
            <DashboardDoughnutChart data={usage_hours} />
          </article>

          <article className="dashboard-today-and-yesterday">
            <div className="today-usage">
              <h3 className="today-usage__heading">Today's Usage (KWh)</h3>
              <div className="usage-value-and-arrow">
                <p className="today-usage__value">
                  {numberFormatter(todaysValue) || '0000'}
                </p>
                {isTodaysValueLessThanYesterdays ? (
                  <DashboardDownArrow />
                ) : (
                  <DashboardUpArrow />
                )}
              </div>
            </div>
            <div className="yesterday-usage">
              <h3 className="yesterday-usage__heading">
                Yesterday's Usage (KWh)
              </h3>
              <div className="usage-value-and-arrow">
                <p className="yesterday-usage__value">
                  {numberFormatter(yesterdaysValue) || '0000'}
                </p>
                {isTodaysValueLessThanYesterdays ? (
                  <DashboardUpArrow />
                ) : (
                  <DashboardDownArrow />
                )}
              </div>
            </div>
          </article>
        </div>
        <div className="dashboard-bar-container">
          {
            allIsLoadDeviceData && allIsLoadDeviceData.map((branch) => (<>
              <article className='score-card-row-3'>
                <LoadOverviewPercentBarChart
                  runningPercentageData={generateLoadOverviewChartData(branch)}
                  dataTitle='Operating Time'
                />
              </article>
            </>))
          }
        </div>
      </section>
    </>
  );
}

export default Dashboard;
