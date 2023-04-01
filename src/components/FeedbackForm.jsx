import Card from "./shared/Card";
import { useState, useContext, useEffect } from "react";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
    const [text, setText] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5)

    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext)

    useEffect(() => {
    if(feedbackEdit.edit === true){
        setBtnDisabled(false)
        setText(feedbackEdit.item.text)
        setRating(feedbackEdit.item.rating)
    }
    }, [feedbackEdit])
    
    function handleTextChange(event){
        if(text === ""){
            setBtnDisabled(true);
            setMessage(null);
        } else if(text !== "" && text.trim().length <= 10){
            setMessage("Text must be at least 10 characters")
            setBtnDisabled(true)
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }

        setText(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault();
        if(text.trim().length > 10){
            const newFeedback = {
                rating,
                text,
            }
            if(feedbackEdit.edit === true){
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
                addFeedback(newFeedback);
            }

            setText("");
        }
    }

    return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate our services?</h2>
            <RatingSelect select={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input
                 onChange={handleTextChange}
                 type="text" 
                 placeholder="Write a review" 
                 value={text}
                />
                <Button type="submit" isDisabled={btnDisabled}>
                    Send
                </Button>            
            </div>

            {message && <div className="message">{message}</div>}

        </form>
    </Card>
  )
}

export default FeedbackForm