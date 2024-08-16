import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import ChatWindow from './ChatWindow';
import InputBox from './InputBox';
import './NewApplication.css'; // Import the CSS module
import 'process/browser';
import {useAuth} from 'contexts/AuthContext';




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
    <p>Currently, I can assist you with:</p>
    <ul>
      <li><b>Scale Estimate</b>: Helping you estimate the size and impact of various metrics based on specified parameters.</li>
      <li><b>Overlap Test</b>: Assisting you in performing overlap tests to understand intersections between different data sets.</li>
    </ul>
    <p>Feel free to ask me any questions or specify tasks you need help with!</p>
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
  const {currentUser} = useAuth();
  const [organization, setOrganization] = useState('');

  // const [ScaleEstimateFormData, setScaleEstimateFormData] = useState();

  // send user all the option if they don't want to proceed with all the use cases
  useEffect(() => {
    console.log("currentUser", currentUser);
    const organization = currentUser.displayName;
    setOrganization(organization);
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
    return text.replace(/_/g, ' ');
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

  async function get_openai_response(message, is_detect_use_case=true) {
    const response = await axios.post('http://127.0.0.1:5000/response/get-response', {
        messages: message,
        is_detect_use_case: is_detect_use_case
      });
    console.log('response from backend:', response.data);
    return response.data;
  }

 const saveApplication = async (account, application) => {
   try{
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
      
      
      
      if (useCase === "scale estimate") {
        await saveApplication("LG", "scale_estimate");
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: 'save scale estimate to Current Application'},
         
        ]);
      }
      if(useCase === "overlap test"){
        await saveApplication("LG", "overlap_test");
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: 'save overlap test to Current Application'},
         
        ]);
      }
    } else if (response === 'no') {
      // Do not execute the aiResponse task
      setIsPendingUseCaseChange(!isPendingUseCaseChange);
      await sendMessage('No', false, false);
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
    // await sendMessage(option, false);
    if (option === 'yes' || option === 'no') {
      await handleUserResponse(option);
    } else if (option === "scale estimate") {
      setUseCase('scale estimate');
      // get questions for scale estimate from 'http://127.0.0.1:5000/scale_estimate/get_questions'
      // const response_questions = await axios.post('http://127.0.0.1:5000/scale_estimate/get_questions', {});
      // const scale_estimate_questions = response_questions.data.questions;
      // console.log('SCALE ESTIMATE response_questions:', scale_estimate_questions, "type: ", typeof scale_estimate_questions);
      // console.log('SCALE ESTIMATE DATE input:', response_questions.data.questions[1]['question_input_value']);
      await saveApplication("LG", "scale_estimate");

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: 'save scale estimate to Current Application'},
       
      ]);
    } else if (option === "overlap test") {
      await saveApplication("LG", "overlap_test");
      console.log('overlap test option clicked');
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: 'save overlap test to Current Application'},
          
      ]);
      

    } else if (option === "anomaly detection") {
      await saveApplication("LG", "anomaly_detection");
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: 'save anomaly detection to Current Application'},
          
      ]);

    }else if (option === "crawling and text categorization") {
      await saveApplication("LG", "crawling_and_text_categorization");
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: 'save crawling and text categorization to Current Application'},
          
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
      const response_backend = await get_openai_response(filteredMessages, is_detect_use_case);

      // Process the response
      const { response: aiResponse, is_use_case } = response_backend;
      console.log('is_use_case:', is_use_case);
      if (is_use_case) {
        
        console.log('We have potential use case', aiResponse);
      
        setIsInUseCaseSelection(true);
        setPendingUseCases(aiResponse); // useEffect will catch the change
        setIsPendingUseCaseChange(!isPendingUseCaseChange);
        

        // const firstUseCase = pendingUseCases.shift();
        // console.log('firstUseCase:', firstUseCase);
        // setUseCase(firstUseCase);
        // await send_use_case(firstUseCase);

        return;
      }else{
        
        ShowAllUsecaseOptions("Sorry, we are still improving our data-related skills, we are not able to process your request at this stage. Would you be interested in any of the following tasks?")
        return;
      }

      const aiMessage = {
        role: 'assistant',
        content: aiResponse,
        isUseCase: is_use_case.toString(),  // Add flag to the message
        options: is_use_case ? yes_no_options : [], // Add yes/no options if it's a use case
      };
      

      setMessages((prevMessages) => [...prevMessages, aiMessage]);

    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  // send use case and ask for confirmation
  const send_use_case = async (use_case) => {
    const formattedUseCase = `Based on your text response, I think you are interested in performing ${use_case}. Do you want to proceed?`;
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

  

  
  const handle_scale_estimate_form_submit = async (formData) => {
    try {
      console.log('------------formData', formData);
      const response = await axios.post('http://127.0.0.1:5000/scale_estimate/get_questions', formData);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: `Scale Estimate Result: ${JSON.stringify(response.data.sql_result)}` }
      ]);
    } catch (error) {
      console.error('Error performing scale estimate:', error);
    }
  };

  
  

  return (
    <div className="NewApplication">
      <ChatWindow messages={messages} handleOptionClick={handleOptionClick} />
      <InputBox sendMessage={sendMessage} />
    </div>
  );
};

export default NewApplication;
