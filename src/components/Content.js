import React, {useState,useEffect} from 'react';
import {DropTarget} from 'react-drag-drop-container';  //import DropTarget from drag and drop Container library.
import '../style.css';         //importing our style.css file.
import data from "../levels.json";    //importing our json file to use it in pir game
import Answer from "./Answer";     //here we import the Answer component which we created in Answer.js file
import Modal from "./Modal";         //here we import the Modal component which we created in Modal.js file


//here it is our main component which contains all part of the code
//used in this website or game.  

const Content=()=>{

    //down here is a list of all useState hooks that we use in our game.
    //here they are all declared and initialized in one place.
    const [timer,setTimer]= useState(0)
    const [score,setScore]= useState(0)
    const [move,setMove]= useState(0)
    const [task,setTask]= useState(data[0].level-1)
    const [array,setArray]=useState([])
    const [flag2, setFlag2] = useState(false);
    const [text, setText] = useState("");
    const [titleModal, setTitleModal] = useState("");
    const [shouldStartGame, setShouldStartGame] = useState(false);
    const [mainDisplay, setMainDisplay]=useState(false)
    const [display2,setDisplay2]=useState(true)
    const [display3,setDisplay3]=useState(false)
    const [display, setDisplay] = useState(true);


    let flag = array.length>0   //this variable is such a decider for start and stopping the game
                                //and its value is either true or false, and it's initialized by taking the length of array which contains random answers.
    
    let result=" Time = ( " + timer +"  sec )    ||   Score = ( "+     //its the string that will be displayed as a modal when the game ends
        +(score*10)+" )"


    let introTitle = " Introduction & Rules"  //the title for introduction modal
    //the string or the text for introduction modal
    let intro= "in this game you will have 10 tasks and every task is known as a level which means 10 levels." +
        " to Start the game click (Start) button. then after starting the game you will see four answers bellow. " +
        "then Drag the correct answer and Drop it in the box with text (Drop here!). if you drop wrong answer two times " +
        "then the game goes to next level but you won't get score from that level. you can also use (solution) button if you are stuck and do not know the answer. " +
        "by passing every level you get 10 scores. if you are stuck in any task or level click (Next) button it will go to next level again you won't get points from that level." +
        " at the end you can see your result which shows the time spent on the game and the scores that you got. and you can also restart the game using restart button. ENJOY :)"

    //function for displaying modal for result and introduction
    const showModal = () => {
        if (task>9){
            setText(result)
            setTitleModal("Your Result")
            setMainDisplay(display)
         }
        else {
            setText(intro)
            setTitleModal(introTitle)
            setMainDisplay(display2)
        }
    }
    
    //the function to decide to display the solution modal
    const showModalSolution = () => {
        setDisplay3(true)
    }
    
    //the function to close modal when clicking close button in the modal
    const hideModal =()=>{
        setDisplay3(false)
        setMainDisplay(false)
    }


    //useEffect hook used for the timer in our game.
    useEffect(()=>{
        let myInterval = setInterval(() => {
            if (timer >= 0 && shouldStartGame) {
                setTimer(timer + 1);
            }
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
        };
    });

    //this function restarts or replays the game when clicking the restart button
    const replayGame = ()=>{
        setTimer(0)
        setMove(0)
        setTask(0)
        setScore(0)
        setFlag2(false)
        flag=false
        setShouldStartGame(false)
    }

    //this function is for restart and for replaying the game when it ends.
    // and its sets values for timer score task... to value as it was when the game started. so it resets all values
    const over = () => {
        setMove(0)
        setScore(0)
        setTask(0)
        flag=false
        setShouldStartGame(false)
        setFlag2(false)
        setTimer(0)
        showModal()
        console.log("game finished")
    }
    
    //this function is for generating a random value with parameter num to decide the max value that could be generated
    const randomGenerate = (num) => {
        return Math.floor(Math.random()*num)
    }
    
    //the most used function in our game. it changes the level according to different situations.
    //going to next level, starting the game all is managed by this function
    const change = () => {
        setMove(0)
        let arrAns =[]
        console.log("task final1",task)
        setShouldStartGame(true);
        setFlag2(true)

        console.log("task",task)
        setTask(task + 1)
        while (task<10){
            const rand = randomGenerate(10)
            if (arrAns.includes(task))
                arrAns.pop(task)
            if (arrAns.length>2)
                break
            if (arrAns.includes(rand)) {
                continue
            }
            arrAns.push(rand)
        }
        const realAnswer = randomGenerate(4)
        arrAns.splice(realAnswer,0,task)
        setArray(arrAns)
    }


    //this one calls the over function if the levels are done if the game is at the end
    if (task > 10) {
        over()
        return
    }


    //this is the most second used function in the game. it decides if the dropped answer in the box is correct or not.
    //if correct then go to next level if not then increments Move value and if move reaches 2 then the game goes to next level but 0 score.
    const onHit=(e)=>{
        if (e.dragData !==data[task-1].answer){
            setMove(move+1)
            if (move>=1){
                change()
            }
        }
        if (e.dragData===data[task-1].answer){
            if (score === 100)
                setScore(0)
            else
                setScore(task<0 ? 0:score+1)
            change()
        }
    }


    return(
        <div>
            <header id="head" className="rounded-pill bg-danger">
                <h1 className="h1 fw-bold text-center text-light">Math game</h1>
            </header>
            <main>
                <div className="container-fluid">

                    <div className="container-fluid d-flex flex-column">
                            <div className="container-fluid d-flex flex-wrap justify-content-around ">
                                    <h4 id="score-counter" className="text-center text-primary">Score: <span
                                        id="score-span" className="badge bg-danger">{ !shouldStartGame || task < 1 ?  '--' : (score)*10 }</span></h4>
                                    <h4 id="level-counter" className="text-center text-light">Level: <span
                                        id="level-span" className="badge bg-success">{shouldStartGame ? task:"--"}</span></h4>
                                    <h4 id="timer-counter" className="text-center text-danger">Time: <span
                                        id="timer-span" className="badge bg-primary">{shouldStartGame && flag2 ? timer : '--'}</span></h4>
                                    <h4 id="move-counter" className="text-center text-info">Moves: <span
                                          id="move-span" className="badge text-dark bg-warning">{shouldStartGame && flag2 ? move : '--'}</span></h4>
                            </div>
                        <div className="container-fluid m-2 bg-warning bg-opacity-75 description">
                            <p className="text-dark ">
                                <b>description:</b>This game is a logical math game for kids and for people who has weak basics of math.
                                the goal of this game is to train your brain with some basic math calculations. for <b>Instructions</b> about the games System click <mark>Intro</mark> button bellow
                            </p>
                        </div>

                            <div className="container-fluid  d-flex justify-content-around flex-wrap">
                                <div>
                                    <div className="container d-flex justify-content-center align-items-center item">
                                        {(flag && flag2) ? <h5 className="fw-bold">{data[task-1].task}</h5> : "Task will be Here"}
                                    </div>
                                </div>=
                                    <DropTarget targetKey="weGood"  onHit={onHit} dropData={flag && flag2? data[task-1].answer:""} >
                                    <div  className="container d-flex justify-content-center align-items-center bg-light bg-opacity-50 item">
                                        {flag && flag2 ?<h5 className="text-dark">drop here!</h5>:"Drop Answer"}
                                    </div>
                                    </DropTarget>
                                </div>

                        <div className="container-fluid m-1 d-flex justify-content-evenly">
                            <div className="">
                                <button onClick={change} type="button" id="btn-next" className="btn btn-warning btn-typical">{ !shouldStartGame || task < 1 ?  'Start' : 'Next' }</button>
                            </div>
                            <div className="">
                                <button onClick={showModal} type="button"  className="btn btn-info btn-typical">Intro</button>
                                <Modal content={text} title={titleModal} closeModal={hideModal} display={mainDisplay} />
                            </div>
                            <div className="">
                                <button  onClick={replayGame} type="button"  className="btn btn-danger btn-typical">Restart</button>
                            </div>
                            <div className="">
                                <button onClick={showModalSolution} type="button"  className="btn btn-primary btn-typical">Solution</button>
                                <Modal content={shouldStartGame? data[task-1].answer:""} title={"Solution"} closeModal={hideModal} display={display3} />
                            </div>
                        </div>

                        <div className="row d-flex justify-content-center flex-wrap">
                            <div className="col">
                            {flag && flag2 ? <Answer t={task-1} arg={array[0]} style={{color: 'white',backgroundColor: '#003366'}} /> : ""}
                            {flag && flag2 ? <Answer t={task-1} arg={array[1]} style={{color: 'black',backgroundColor: '#ff8c1a'}} /> :""}</div>
                            <div className="col">{flag && flag2 ? <Answer t={task-1}  arg={array[2]} style={{color: 'white',backgroundColor: '#269900'}} /> :""}
                            {flag && flag2 ? <Answer t={task-1}  arg={array[3]}  style={{color: 'black',backgroundColor: 'red'}} /> : ""}</div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="rounded-pill bg-danger">
                <p className='text-light'>Designed by: Mohibullah Sarfiraz, 2021/2022</p>
            </footer>

        </div>
    )
}
 export default Content

