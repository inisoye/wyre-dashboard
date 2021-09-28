import moment from 'moment';

const setSearchCheckedDate = (checked, setSelectedDate, momentDate) => {
    if(checked){
        setSelectedDate([momentDate, moment])
    } 
  };

export { 
    setSearchCheckedDate
}