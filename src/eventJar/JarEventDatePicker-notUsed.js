// Installed React DatePicker
// npm install react-datepicker --save

import React, {useState, useEffect} from "react";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
const JarEventDatePicker = () => {

    const [startDate, setStartDate] = useState( new Date() );

  const handleChange = date => {
      setStartDate(date)
    };
 
    return (
      <DatePicker
        selected={startDate}
        onChange={handleChange}
      />
    );
}
 

export default JarEventDatePicker;