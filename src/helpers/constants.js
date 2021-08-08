export const SCORE_CARD_EXCLUDE_CLIENTS = ['Sapio Utilities'];

export const SCORE_CARD_TOOLTIP_MESSAGES = {
    CARBON: `Carbon footprint on all sources.

    Diesel: 2.68kg of CO2 per liter Gas   : 0.549kg of CO2 per kWh 
    Grid   : 0.439kg of CO2 per kWh
    
    A typical hardwood tree can absorb as much as 48 pounds of carbon dioxide per year.
    
    Performance is scored according to energy baseline.`,

    PEAK_RATIO: `Represents the disparity between peak and average power within a facility.

    To optimize efficiency, the goal is to close the gap between both metrics.

    The aim is to score as close to 1 as possible.`,

    BASE_ENERGY: `This is an algorithm that forecasts energy consumption, benchmarking energy use, weather and number of days to set a baseline usage.

    Baseline usage is compared to actual consumption to score energy performance.`,

    SIZE_EFFICIENCY: `Generator Size Efficiency: This info-graph measures and scores the efficiency(b) or inefficiency of the generator’s size in comparison to power demanded by the facility. `,

    FUEL_EFFICIENCYL: `Fuel Consumption: (95% Accuracy) Estimated fuel consumed on each generator and the number of hours each generator has been operated for`,

    OPERATING_TIME: `Operating Time: Reports each event and duration generators are operated outside official hours, the diesel consumed and cost in Naira.`

}


export const ALL_SCORE_CARD_TOTAL_NAME = ['Forecast', 'Peak', 'Estimated Value'];