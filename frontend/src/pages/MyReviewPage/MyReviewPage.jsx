import NavBar from "../../components/NavBar";
import ProfileBar from "../../components/ProfileBar";

export default function MyReviewPage() {
  return( 
    <div className='w-screen h-max bg-[#003049] overflow-hidden mx-auto my-0'>
      <NavBar login={false}/>
      <div className='w-[1140px] h-[620px] bg-[#d9d9d9] rounded-[25px] mt-[30px] mr-0 mb-20 ml-[150px] overflow-hidden flex flex-row'>
        <ProfileBar active={'REVIEW'}/>
        <div className="flex flex-col m-5 space-y-4 w-full overflow-y-auto">
        </div>          
      </div>
    </div>
  )
}