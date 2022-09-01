
import { APIService } from "../../../config/api/apiConfig";
import { fetchPowerFactorLoading, fetchPowerFactorSuccess } from "./powerFactor";


export const fetchPowerFactor = (allDeviceIds, requestData) => async (dispatch) => {
  dispatch(fetchPowerFactorLoading());

  try {

    let arrayData = [];
    allDeviceIds.forEach(device => {
      const fetchData = APIService.post('/average_power_factor/', { device_id: device, ...requestData }, {validateStatus: () => true});
      arrayData.push(fetchData);
    });

    const allPowerFactor = await Promise.all(arrayData);

    dispatch(fetchPowerFactorLoading(false));
    dispatch(fetchPowerFactorSuccess(allPowerFactor));
    return { fulfilled: true, allPowerFactor }
  } catch (error) {
    console.log('this is thei should not get heree',error);
    dispatch(fetchPowerFactorLoading(false));
  }
};