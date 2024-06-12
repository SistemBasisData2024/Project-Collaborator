import { Rating } from "@material-tailwind/react";
import { useState } from "react"
import { Link } from "react-router-dom";
import { sendReview } from "../lib/actions/ratings.actions";

export default function ReviewCard({review}) {
  const [rating, setRating] = useState(review.rating == null ? 0 : review.rating);
  

  const handleReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const dataJson = Object.fromEntries(formData.entries());
    const response = await sendReview(review.id, {rating: rating, review: dataJson.review});

    alert(response.response.message);
    if(response.success){
      window.location.reload();
    }
  }
  return (
    <div className="w-full bg-white h-max flex flex-col p-4 rounded-xl">
      <Rating value={rating} className="h-fit w-[50px]"  ratedColor="yellow" onChange={(value) => setRating(value)}/>
      <div className="flex flex-row items-center text-[#003049]">
        <p className="text-xl">{review.user.name} as {review.user.role}</p>
        <p className="mx-2 text-xl pb-1">|</p>
        <Link to={`/project/${review.project.id}`} className="text-xl font-bold text-[#003049] hover:underline">{review.project.name}</Link>
      </div>
      <form className="flex flex-row w-full items-center gap-x-10" onSubmit={handleReview}>
        <input
          type="text"
          className="grow border-black border-b-2"
          placeholder={`Type your review of ${review.user.name} in project ${review.project.name} (optional)`}
          name="review"
          />
        <button className="px-8 py-1 bg-[#003049] text-white rounded-md" type="submit">Confirm Review</button>
      </form>
    </div>
  )
}