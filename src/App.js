import './App.css';
import mountains1 from './assets/mountain_image.jpg'
import mountains2 from './assets/trace-hudson.jpg'
import {useState} from "react";

function App() {

    let backgroundImages = [mountains1, mountains2]

    const [currentTime, setCurrentTime] = useState('');

    const [loopStarted, loopState] = useState(false);

    function renderBackground(image, opacity) {
        return <div className={"animate-backgroundPanning absolute transition-opacity duration-1000 bg-no-repeat window-element"}
                    style={{
                        backgroundImage: "url(" + image + ")",
                        opacity: opacity + "%"
        }}/>
    }

    function updateClock() {
        setTimeout(() => {
            let currentTime = new Date()
            let currentTimeString = currentTime.toTimeString()
            setCurrentTime(currentTimeString)
            requestAnimationFrame(() => {
                updateClock()
            })
        }, 500)
    }

    if(!loopStarted) {
        loopState(true)
        //circlingBackground()
        updateClock()
    }

    return (
        <div className={"App center-inner full-screen bg-secondary"}>
            <div className={"window-element center-inner-bottom z-10"}>
                <h1 className={"content w-full pb-8 pt-32 rounded-2xl subpixel-antialiased tracking-widest bg-gradient-to-t from-gray-600 to-transparent"}>
                    {currentTime}
                </h1>
            </div>
            {renderBackground(backgroundImages[0], 100)}
            {/*renderBackground(backgroundImages[1], nextBackgroundOpacity)*/}
        </div>
    );
}

export default App;
