import React, { useEffect, useState } from "react";
import Multiselect from 'multiselect-react-dropdown';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import './DynamicForm.css';

const transformData = (data, type) => {
    // Transform data into JSON
    if (type === 'QT_MULTI_SELECT') {
        // console.log('in transformData, the data is', data);
        console.log('in transformData, the type is', type);
        console.log('in transformData, the data is', data);
        console.log('in transformData, the type of the data is', typeof data);
        data = JSON.parse(data);
        // Create options array
        const options = [];
        const categories = [];
        Object.keys(data).forEach((key, index) => {
            categories.push(
                {
                    category: key,
                    id: index,
                }
            );
            data[key].forEach((item, itemIndex) => {
                if (item) {
                    options.push({
                        name: item,
                        id: `${key}:${item}`,
                    });
                }
            });
        });
        return {categories, options};
    }else if (type === 'QT_SINGLE_SELECT') {
        // data is string type, an example is like : panelist_id lotame_id ip_address respondent_id
        // split the string by space, and return in a structure like [{name: 'panelist_id', id: 'panelist_id'}, {name: 'lotame_id', id: 'lotame_id'}, {name: 'ip_address', id: 'ip_address'}, {name: 'respondent_id', id: 'respondent_id'}]
        const options = data.split(' ').map((item) => {
            return {
                name: item,
                id: item,
            };
        });
        return options;
        
    }
    // data = JSON.parse(data);
  
    // // Create options array
    // const options = [];
  
    // Object.keys(data).forEach((key, index) => {
    //   data[key].forEach((item, itemIndex) => {
    //     if (item) {
    //       options.push({
    //         name: item,
    //         id: `${key}:${item}`,
    //       });
    //     }
    //   });
    // });
  
    // return options;
  };

  


const DynamicForm = ({ question, type, inputValue, onSubmit }) => {
  const [answer, setAnswer] = useState('');
  const [multiselectOptions, setMultiselectOptions] = useState([]); // [{name: 'USA', id: 'country:USA'}, {name: 'GBR', id: 'country:GBR'}, Raw data from the input value
  const [selectedCategory, setSelectedCategories] = useState([]); // selected category from the multiselect dropdown
  const [selectedOptions, setSelectedOptions] = useState([]); // selected options from the multiselect dropdown
  const [optionsBasedOnCategory, setOptionsBasedOnCategory] = useState([]); // options based on the selected category
  const [dateRangeArray, setDateRangeArray] = useState([]); // [{startDate: Tue Jun 04 2024 00:00:00 GMT-0700 (Pacific Daylight Time), endDate: Fri Jun 14 2024 00:00:00 GMT-0700 (Pacific Daylight Time), key: 'selection'}

  
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

   // use useEffect.  update multiselectOptions based on the selectedCategory. 
   // 
   // example for selectedCategory: [{category: 'country', id: 0}]
   // example for multiselectOptions: [{name: 'USA', id: 'country:USA'}, {name: 'GBR', id: 'country:GBR'}, {name: 'Personal computer', id: 'device:Personal computer'}, {name: 'Smartphone', id: 'device:Smartphone'}, {name: 'Smart TV', id: 'device:Smart TV'}]
   useEffect(() => {
    console.log('latest ! selectedCategory:', selectedCategory)
    console.log('latest ! type:', type);
    if (selectedCategory.length > 0) {
        const selectedCategoryName = selectedCategory[0].category;
        const optionsBasedOnCateg = multiselectOptions.filter((option) => option.id.split(':')[0] === selectedCategoryName);
        console.log('latest ! optionsBasedOnCategory:', optionsBasedOnCateg);
        setOptionsBasedOnCategory(optionsBasedOnCateg);
  
   
    }
   }, [selectedCategory]);

   useEffect(() => {
    if (type === 'QT_MULTI_SELECT') {
        const { categories, options } = transformData(inputValue, type);
        setMultiselectOptions(options);
    }
    if (type ==='QT_RANGE') {
       console.log('in useEffect QT_RANGE, inputValue is', inputValue);
       // inputValue is a string, for example "20240510", "20240511", "20240512", "20240513", "20240514", "202415"
       // sort the date in ascending order, and turn each date into a Date object by using new Date(2024, 6, 1), then return an array of Date objects
         const dateArray = inputValue.split(',');
          // the array looks like ['"20240510"', ' "20240511"', ' "20240512"', ' "20240513"', ' "20240514"', ' "20240515"']
         // remove single and double quotes, and trim the space
        dateArray.forEach((date, index) => {
            dateArray[index] = date.replace(/['"]+/g, '').trim();
        });
        console.log('in useEffect QT_RANGE, dateArray is', dateArray);
         dateArray.sort();
        dateArray.forEach((date, index) => {
            dateArray[index] = new Date(date.slice(0, 4), date.slice(4, 6) - 1, date.slice(6, 8));
        });

         setDateRangeArray(dateArray);
         console.log('in useEffect QT_RANGE, dateRangeArray is', dateRangeArray);
    }
}, [inputValue, type]);
  
  

  // check selected options
  useEffect(() => {
    console.log('latest ! selectedCategories:', selectedCategory)
    console.log('latest ! selectedOptions:', selectedOptions);
    console.log('latest ! type:', type);
  }, [selectedOptions, type, selectedCategory, dateRange]);


  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (type === 'QT_MULTI_SELECT') {
        console.log("in handleSubmit,original selectedOptions is", selectedOptions);
      //  
      // [{name: 'USA', id: 'country:USA'}, {name: 'GBR', id: 'country:GBR'}]
      // extract name from each object in the array, and return a string, for example "USA,GBR"
        const processed_selectedOptions = selectedOptions.map((option) => option.id).join(',');
        console.log("in handleSubmit,QT_MULTI_SELECT ,processed selectedOptions is", processed_selectedOptions);

      onSubmit(processed_selectedOptions);
    } else if (type === 'QT_SINGLE_SELECT') {
        console.log("in handleSubmit,original selectedOptions is", selectedOptions);
        const processed_single_selectedOptions = selectedOptions.map((option) => option.name).join(',');
        console.log("in handleSubmit,QT_SINGLE_SELECT ,processed selectedOptions is", processed_single_selectedOptions);
        onSubmit(processed_single_selectedOptions);
    }else if (type === 'QT_RANGE') {
        console.log("in handleSubmit,original dateRange is", dateRange);
       // {startDate: Tue Jun 04 2024 00:00:00 GMT-0700 (Pacific Daylight Time), endDate: Fri Jun 14 2024 00:00:00 GMT-0700 (Pacific Daylight Time), key: 'selection'}
       // extract startDate and endDate and format them to a string, for example "20240510,20240514"
        const processed_dateRange = `${dateRange.startDate.toISOString().slice(0, 10).replace(/-/g, '')},${dateRange.endDate.toISOString().slice(0, 10).replace(/-/g, '')}`;
        console.log("in handleSubmit,QT_RANGE ,processed dateRange is", processed_dateRange);
        onSubmit(processed_dateRange);
    }else{
        onSubmit(answer);
    }
  };



  

//   if (type === 'YES_NO') {
//     return (
//       <form onSubmit={handleSubmit}>
//         <p>{question}</p>
//         <button type="button" onClick={() => onSubmit('yes')}>Yes</button>
//         <button type="button" onClick={() => onSubmit('no')}>No</button>
//       </form>
//     );
//   }



  const renderInputField = () => {
    
    switch (type) {
      case 'YES_NO':
        return (
          <div>
            <p>{question}</p>
            <button type="button" onClick={() => onSubmit('yes')}>Yes</button>
            <button type="button" onClick={() => onSubmit('no')}>No</button>
          </div>
        );
            

      case 'QT_SINGLE_SELECT':
        // process QT_SINGLE_SELECT input value(variable value)
        const singleSelectInputData = transformData(inputValue, type);
        return (
            <form onSubmit={handleSubmit}>
                <label>{question.text}</label>

                    <Multiselect
                        singleSelect = {true}
                        options={singleSelectInputData} // Options to display in the dropdown
                        selectedValues={selectedOptions} // Preselected value to persist in dropdown
                        onSelect={setSelectedOptions} // Function will trigger on select event
                // Function will trigger on remove event
                        displayValue="name" // Property name to display in the dropdown options
                    />
            

                <button type="submit">Submit</button>
            </form>
        );
      case 'QT_MULTI_SELECT':
        // process QT_MULTI_SELECT input value(variable value)
        const {categories, options: multiSelectInputData} = transformData(inputValue, type);
        
        console.log('in QT_MULTI_SELECT, the categories is', categories, "type is", typeof categories);
        console.log('in QT_MULTI_SELECT, the multiSelectInputData is', multiSelectInputData, "type is", typeof multiSelectInputData);
        //print the type of the input value
        console.log('in QT_MULTI_SELECT, the type of the input value is', typeof inputValue);
        // use useEffect. based on selectedCategories, update selectedOptions based on the selectedCategories
        
        return (
            <form onSubmit={handleSubmit}>  
                <label>{question}</label>

                    <Multiselect
                            singleSelect = {true}
                            options={categories} // Options to display in the dropdown
                            selectedValues={selectedCategory} // Preselected value to persist in dropdown
                            onSelect={setSelectedCategories} // Function will trigger on select event
                    // Function will trigger on remove event
                            displayValue="category" // Property name to display in the dropdown options
                    />

                    <br></br>
                    <Multiselect
                        options={optionsBasedOnCategory} // Options to display in the dropdown
                        selectedValues={selectedOptions} // Preselected value to persist in dropdown
                        onSelect={setSelectedOptions} // Function will trigger on select event
                // Function will trigger on remove event
                        onRemove={setSelectedOptions}
                        displayValue="name" // Property name to display in the dropdown options
                    />
            <button type="submit">Submit</button>
          </form>
          );
      case 'QT_RANGE':
         const handledateRangeChange = (ranges) => {
            console.log('-----------ranges:', ranges);
            setDateRange(ranges.selection);

          };
        
          return (
            <form onSubmit={handleSubmit}>
                <label>{question}</label>
                    <DateRangePicker
                    ranges={[dateRange]}
                    onChange={handledateRangeChange}
                    // disabledDates={['2024-06-01', '2024-06-10']}
                    minDate={dateRangeArray[0]}
                    maxDate={dateRangeArray[dateRangeArray.length - 1]}
                    />
                <button type="submit">Submit</button>
          </form>
          );
      default:
        return (
        <form onSubmit={handleSubmit}>          
          <input class='input-form' type="text" value={answer} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
        );
    }
  };

  return (
    
      renderInputField()
      
  );
};

export default DynamicForm;
