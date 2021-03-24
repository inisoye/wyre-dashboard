import { useContext, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import CompleteDataContext from '../Context';

function useFetchScheduleEmailData(URL, setData) {
    const { token } = useContext( CompleteDataContext );
      const getData =  () =>{        
           axios.get(URL, {
              headers: {
                Authorization: `bearer ${token}`,
              },
            })
            .then((resp) => {
              const parsedData = resp.data;
              setData(parsedData)
              // console.log('device name:', resp.data.data.available_devices[0].device_name);
            })
            .catch((error) => console.log('An error occured:', error));
          }

    useEffect(() => {
          getData()
            }, [URL])
};

function usePostScheduleEmailData(url, data, ) {
    const { token } = useContext( CompleteDataContext );

    const postData = () =>{ 
      axios.post(url, data, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${token}`,
              },
            })
            .then((response) => {
              console.log('data', response);
              // changeData(response.data)
            })
            .catch((error) => console.log('Error posting data =', error));
    }

    postData();
};


useFetchScheduleEmailData.propTypes = {
  URL: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  setScheduledData: PropTypes.any.isRequired,
};

usePostScheduleEmailData.propTypes = {
  url: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export {
  useFetchScheduleEmailData,
  usePostScheduleEmailData
}
