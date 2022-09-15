import AppCSS from "../App.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
const Main = () =>{
    //Loading is use to display loading screen 
    const [isLoading, setIsLoading] = useState(false);
    //setContent is for displaying question
    const [content, setContent] = useState("");
    //Displaying answers
    const [answer, setAnswer] = useState("");
    //Check if the answer provided by user is correct
    const [answerStats,setAnswerStats] = useState(false);
    //check if the button is clicked 
    const [isSubmitted,setIsSubmitted] = useState(false);
    //use to change the question by reloading api
    const [loader,setLoader] = useState(false);
    const [texter,setText] = useState("");
    const [question,setQuestion] = useState("Please click on submit to start and wait for 3 seconds");
    const [count,setCount] = useState(0);

    //Getting API call
    useEffect(async () => {
      setIsLoading(true);
  
      try {
        const response = await axios({
          url: ` https://jservice.io/api/random `,
        });
        const { data } = response;
        setContent(data);
        setQuestion(content[0].question);
        setIsLoading(false);
      } catch (err) {
        
        setIsLoading(false);
      }
    }, [loader]);
  
    // Below code is use to get the input from user using Text Area
    const onAnswerHandler = (event) => {
      setAnswer(event.target.value);
    }

    //Behaviour after clicking on submit 
    const checkHandler = () =>{
      setCount(count+1);
      //clear text and wait for x seconds before displaying new question
      setTimeout(()=>{
        if(!loader ? setLoader(true):setLoader(false));
        if(isSubmitted)setIsSubmitted(false);
        //Clear text on next questions
        setText("");
        //Clear text area
        var btn = document.getElementById('submitButton');
        let txtarea = document.querySelector('textarea');
        if(btn){
          btn.addEventListener('click',()=>{
            txtarea.value = '';
          });
        }
        
      },2000);
      //Convert both Given answer and solution provided by User to lower case
      //Correct answer block
      if(answer.toLowerCase() === content[0].answer.toLowerCase())
      {
        setIsSubmitted(true);
        setAnswerStats(true);
        setText(`You Won!!!, the Answer is "${content[0].answer}"`);
      }
      //Incorrect Answer block
      else{
        setIsSubmitted(true);
        setAnswerStats(false);
        setText(`InCorrect, the Answer is "${content[0].answer}"`);
      }
    }
    return (
      <main>
        {isLoading ? (<h3>Loading...</h3>):(
        <>
        <h4>Hello! Welcome to Quiz Game</h4>
        <h6>Please Enter your response on below Text Area and click on submit</h6>
        <div></div>
        <p>{question}</p>
        <textarea placeholder="Enter your Answer" onChange = {onAnswerHandler}/>
        <div><button onClick = {checkHandler} class = {AppCSS.btnCSS}>Submit</button></div>
        {/*Display if answer is correct*/}
        {isSubmitted && answerStats ? (<h3>{texter}</h3>):(<h3></h3>)}
        {/*Display if answer is Wrong--------------*/}
        {isSubmitted && !answerStats && count>1 ? (<h3>{texter}</h3>):(<h3></h3>)}
        {/*Home Screen Content-------------------- */}
        {count === 0? (<div></div>):(<div></div>)}
        </>
        )}  
      </main>
      
    
    );
}
export default Main;