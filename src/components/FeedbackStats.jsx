import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackStats() {
  const {feedback} = useContext(FeedbackContext)

  //Calculate Ratings average

  let average = feedback.reduce(
    (acc, {rating}) => acc + rating, 0 ) / feedback.length

  let averageRounded = Math.round(average*100)/100; 

  //console.log(average);
  
    return (
    <div className="feedback-stats">
        <h4>{feedback.length} Reviews</h4>
        <h4> Average rating: {isNaN(averageRounded) ? 0 : averageRounded}</h4>
    </div>
  )
}


export default FeedbackStats