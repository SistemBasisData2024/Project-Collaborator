import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import ProfileBar from "../../components/ProfileBar";
import { Rating } from "@material-tailwind/react";
import { getRatingByUser } from "../../lib/actions/ratings.actions";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";

export default function MyReviewPages() {
  const {user} = useUser();
  const [ratingList, setRatingList] = useState([]);
  const fetchRatingByUser = async (id) => {
    const response = await getRatingByUser(id);

    if(response.success){
      const set = response.response.data.filter((x) => x.status == 'DONE');
      setRatingList(set);
      console.log(set);
    }
  }

  useEffect(() => {
    fetchRatingByUser(user.id);
  }, [])

  if(!ratingList) return<p>LOADING.........</p>
  return( 
    <div className='w-screen h-max bg-[#003049] overflow-hidden mx-auto my-0'>
      <NavBar login={false}/>
      <div className='w-[1140px] h-[620px] bg-[#d9d9d9] rounded-[25px] mt-[30px] mr-0 mb-20 ml-[150px] overflow-hidden flex flex-row'>
        <ProfileBar active={'REVIEW'}/>
        <div className="flex flex-col m-5 space-y-4 w-full overflow-y-auto">
          <div className='flex flex-row w-max h-fit bg-[#780000] rounded-[25px] px-8 space-x-1 py-2'>
            <span className="font-['Poppins'] text-[20px] px-12 font-medium text-[#d9d9d9] text-left whitespace-nowrap">
              <Link to="/myreview" className="highlight-text">PENDING</Link>
            </span>
            <span className="font-['Poppins'] rounded-3xl px-12 text-[20px] font-medium text-[#780000] bg-[#d9d9d9] text-left whitespace-nowrap">
              DONE
            </span>
          </div>
          <div className="h-fit w-full flex flex-col space-y-4">
            { ratingList.length > 0 ?
              ratingList.map((rating) => (
                <div className="w-full bg-white h-max flex flex-col p-4 rounded-xl">
                <Rating value={rating.rating} className="h-fit w-[50px]"  ratedColor="yellow" readonly/>
                <div className="flex flex-row items-center text-[#003049]">
                  <p className="text-xl">{rating.user.name} as {rating.user.role}</p>
                  <p className="mx-2 text-xl pb-1">|</p>
                  <Link to={`/project/${rating.project.id}`} className="text-xl font-bold text-[#003049] hover:underline">{rating.project.name}</Link>
                </div>
                <p className="italic">{rating.review ? rating.review : "No message"}</p>
              </div>
                ))
              :
              <p>You haven't created any reviews yet</p>
            }
          </div>
        </div>          
      </div>
    </div>
  )
}