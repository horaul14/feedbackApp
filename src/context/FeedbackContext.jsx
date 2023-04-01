import { createContext, useState } from "react";
import {v4 as uuidv4} from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({children}) =>{
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: "this item is from context number1",
            rating: 10,
        },
        {
            id: 2,
            text: "this item is from context number2",
            rating: 5,
        },
        {
            id: 3,
            text: "this item is from context number3",
            rating: 3,
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false,
    })

    function deleteFeedback(id){
        if(window.confirm("Are you sure you want to delete feedback?"))
        setFeedback(feedback.filter((item) => item.id !== id)
        )
    } 

    function addFeedback(newFeedback){
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback])
    }  

    //update feedback item

    function updateFeedback(id, upItem){
        setFeedback(feedback.map((item) => item.id===id ? {...item, ...upItem} : item));
    }


    //put updated feedback    
    function editFeedback(item){
        setFeedbackEdit({
            item,
            edit: true,
        })
    }


    return <FeedbackContext.Provider 
                value={{
                    feedback,
                    feedbackEdit,
                    deleteFeedback,
                    addFeedback,
                    editFeedback,
                    updateFeedback,
                }}>
                {children}
            </FeedbackContext.Provider>
}

export default FeedbackContext;