export default function Modal ({isVisible, onClose, children}){
  if(!isVisible) return <></>

  const handleClose = (e) => {
    if(e.target.id == 'wrapper') onClose();
  }
  
  return(
    <div className="z-10 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" onClick={handleClose} id="wrapper">
      <div className="bg-white p-5 rounded-xl w-[600px] h-max">
        {children}
      </div>
    </div>
  )
}