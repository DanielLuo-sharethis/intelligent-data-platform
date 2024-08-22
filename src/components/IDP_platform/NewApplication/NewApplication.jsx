import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import ChatWindow from './ChatWindow';
import InputBox from './InputBox';
import './NewApplication.css'; // Import the CSS module
import 'process/browser';
import {useAuth} from 'contexts/AuthContext';
import { Link } from 'react-router-dom';




const initialOptions = [
  "scale estimate",
  "anomaly detection",
  "overlap test",
  "Chat with the AI"
];

const yes_no_options = [
  "yes",
  "no"
];

const NewApplication = () => {

  const [messages, setMessages] = useState([
    { role: 'assistant',
      content:  <div>
    <p>Welcome to the Predactiv Intelligent Data Platform! Our AI assistant leverages generative AI technology to democratize data operations, analytics, and data science automation through a conversational user experience.</p>
    <p>Currently, I can assist you with tasks like <b>Overlap Test</b>, <b>Scale Estimate</b>, <b>Anomaly Detection</b>, <b>Crawling and Text Categorization</b>, and <b>Modeling and Prediction</b>.</p>
    
    <p>How can I help you? </p>
  </div>, 
    options: [],
    description: 'intro' }
  ]);

  const [isShowAllUsecaseOptions, setIsShowAllUsecaseOptions] = useState(false);
  
  const [useCase, setUseCase] = useState('');
  const [isSelectNoUseCase, setIsSelectNoUseCase] = useState(false);
  const [isInUseCaseSelection, setIsInUseCaseSelection] = useState(false);
  const [pendingUseCases, setPendingUseCases] = useState([]);
  const [isPendingUseCaseChange, setIsPendingUseCaseChange] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionType, setQuestionType] = useState('');
  const [questionAnswerPairs, setQuestionAnswerPairs] = useState([]);  // Add state to track question_answer_pairs
  const [questionInputValue, setQuestionInputValue] = useState('');  // Add state to track question input value
  const [finalRequest, setFinalRequest] = useState('');  // Add state to track final request
  const {currentUser, organization} = useAuth();
 

  // const [ScaleEstimateFormData, setScaleEstimateFormData] = useState();

  // send user all the option if they don't want to proceed with all the use cases
  useEffect(() => {
    console.log("currentUser", currentUser);
    const organization = currentUser.displayName;
  
    console.log("currentUser's Organization", organization);

   }, [currentUser]);

  useEffect(() => {
    if (isShowAllUsecaseOptions) {

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content: 'Here are all the tasks you can perform:',
          options: initialOptions
        }
      ]);
      setIsShowAllUsecaseOptions(false);
    }
  
  }, [isShowAllUsecaseOptions]);

  

  useEffect(() => {

    const processUseCase = async () => {
      const nextUseCase = pendingUseCases[0];
      setUseCase(nextUseCase);
      await send_use_case(nextUseCase);
      pendingUseCases.shift();
    };


    // if (pendingUseCases.length > 0 && isInUseCaseSelection) {
    //   console.log('pendingUseCases:', pendingUseCases);
    //   processUseCase();
    // }
    // if( isInUseCaseSelection && pendingUseCases.length == 0){
    //   ShowAllUsecaseOptions('Sorry, we are still improving our data-related skills, we are not able to process your request at this stage. Would you be interested in any of the following tasks?');
      
    // }
    if (pendingUseCases.length > 0 && isInUseCaseSelection) {
      processUseCase();
    }
    if (pendingUseCases.length === 0 && isInUseCaseSelection) {
      ShowAllUsecaseOptions('Sorry, we are still improving our data-related skills, we are not able to process your request at this stage. Would you be interested in any of the following tasks?');
      setIsInUseCaseSelection(false);
    }
  }, [isPendingUseCaseChange, isInUseCaseSelection]);

  // In scaleestimate form, when the form is submitted, the form data is updated
  // useEffect(() => {
  //   console.log("Button pressedForm Data submit: ", ScaleEstimateFormData);
  //   const get_scale_estimate_request = async () => {
  //     const user_request_response = await axios.post('http://127.0.0.1:5000/scale_estimate/get_request_from_template', {
  //     ScaleEstimateFormData_question_answer_pairs: ScaleEstimateFormData
  //   });
  //   console.log('SCALE ESTIMATE Final user_request_response:', user_request_response.data);
  //   };

    
  //   if (ScaleEstimateFormData) {
  //     get_scale_estimate_request();
  //   }
   

    
  // }, [ScaleEstimateFormData]);
  const get_platform_app = async () => {
    try {
      const response = await axios.get('https://idp.predactiv.com/apps/get_platform_apps/', {});
      const all_platform_apps = response.data;
      console.log('get_platform_app response:',  all_platform_apps);
      return response.data;
    } catch (error) {
      console.error('Error fetching platform apps:', error);
  }
};
const remove_underline = (text) => {
  // Check if the text contains underscores and no spaces
  if (!text.includes('_') && text.includes(' ')) {
    return text; // No need to modify if it's already in the correct format
  }

  // Replace underscores with spaces
  return text.replace(/_/g, ' ');
};
  const add_underline = (text) => {
    // Check if the text already contains underscores and no spaces
    if (text.includes('_') && !text.includes(' ')) {
      return text; // No need to modify if it's already in the correct format
    }
  
    // Replace spaces with underscores
    return text.replace(/ /g, '_');
  };

  const ShowAllUsecaseOptions = async(message_content) => {
    const all_platform_apps = await get_platform_app();
    // get app names from all_platform_apps
    const app_names = all_platform_apps.map(app => remove_underline(app.app_name));
    
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: 'assistant',
        content: message_content,
        options: app_names
      }
    ]);
  };

 

 const saveApplication = async ( application) => {
   try{
    console.log('saveApplication:', application, "organization:", organization);
    const response = await axios.get(`https://idp.predactiv.com/apps/save_new_user_app/${organization}/${application}`, {});
    const backend_response = response.data;
    console.log('saveApplication response from backend:', backend_response);
    return backend_response;
   }catch(error){
     console.error('Error saving application:', error);
   }
 }

  const handleUserResponse = async (response) => {
    if (response === 'yes') {
      setIsInUseCaseSelection(false);
      // Execute the aiResponse task
      console.log('Iam here ');
      console.log('useCase:', useCase);
      const option_no_underline = remove_underline(useCase);
      const option_underline = add_underline(useCase);
      
      await saveApplication(option_underline);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: `Saved ${option_no_underline} to Current Applications${<Link ></Link>}, now you can run the application from the Current Applications page` },
         
        ]);
      
    } else if (response === 'no') {
      ShowAllUsecaseOptions('Sorry, we are still improving our data-related skills, we are not able to process your request at this stage. Would you be interested in any of the following tasks?');
    }

    // // Process next pending use case if exists
    // if (pendingUseCases.length > 0) {
    //   const nextUseCase = pendingUseCases.shift();
    //   setUseCase(nextUseCase);
    //   await send_use_case(nextUseCase);
    // }
    // if (pendingUseCases.length === 0) {
    //   // show all options
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     {
    //       role: 'assistant',
    //       content: 'Sorry, we are still improving our data-related skills, we are not able to process your request at this stage. Would you be interested in any of the following tasks?',
    //       options: initialOptions
    //     }
    //   ]);
    // }
  };
  

  

 




  

  

 
 // show all option and let user choose
  const handleOptionClick = async (option) => {
    console.log('option:', option);
    // await sendMessage(option, false);
    if (option === 'yes' || option === 'no') {
      await handleUserResponse(option);
    } else {
      // meaning options are use case
      const option_underline = add_underline(option);
      const option_no_underline = remove_underline(option);
      await saveApplication(option_underline);

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: `save ${option_no_underline} to Current Application`},
       
      ]);
    } 
      

   
  };

  // can disable the is_detect_use_case flag to avoid detecting use case
  const sendMessage = async (text, is_detect_use_case = true, get_AI_response = true) => {
    console.log('in sendMessage', text);
    console.log('messages:', messages);
    const userMessage = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages); // save all history of messages

    // filter out form messages and intro messages so that we can send the rest to the backend
    const filteredMessages = newMessages.filter((message) => message.role !== 'form' && message.description !== 'intro');
    
    

    if(!get_AI_response){
      return;
    }

    try {
      const response_backend = await get_app_candidates(text);
      const {application_name, application_description} = response_backend;
      
      if (!application_name) {
        ShowAllUsecaseOptions("Sorry, we are still improving our data-related skills, we are not able to process your request at this stage. Would you be interested in any of the following tasks?")
        return;
      }
      


      // Process the response
      send_use_case(application_name);
      setUseCase(application_name);
        
       

      

    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  const get_app_candidates = async (user_request) => {
    const response = await axios.get(`https://idp.predactiv.com/apps/get_app_candidate/${user_request}`, {});
    const get_app_candidates_response = response.data;
    console.log('get_app_candidates_response:', get_app_candidates_response);
    return get_app_candidates_response;
  };
 

  // send use case and ask for confirmation
  const send_use_case = async (use_case) => {
    const formattedUseCase = `Based on your request, I think you are interested in performing ${use_case}. Do you want to proceed?`;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: 'assistant',
        content: formattedUseCase,
        isUseCase: 'true',
        options: yes_no_options
      }
    ]);
  };

  

  
  // const handle_scale_estimate_form_submit = async (formData) => {
  //   try {
  //     console.log('------------formData', formData);
  //     const response = await axios.post('http://127.0.0.1:5000/scale_estimate/get_questions', formData);
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { role: 'assistant', content: `Scale Estimate Result: ${JSON.stringify(response.data.sql_result)}` }
  //     ]);
  //   } catch (error) {
  //     console.error('Error performing scale estimate:', error);
  //   }
  // };

  
  

  return (
    <div className="NewApplication">
      <ChatWindow messages={messages} handleOptionClick={handleOptionClick} />
      <InputBox sendMessage={sendMessage} />
    </div>
  );
};

export default NewApplication;
