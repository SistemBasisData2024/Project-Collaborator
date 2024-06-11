import { useUser } from "../contexts/UserContext";

export const BaseResponse = (success, response) =>{
    return  {
        success: success,
        response: response
    }
}

export function dateFormatter(date, separator) {
    var options = [{day: 'numeric'}, {month: 'numeric'}, {year: 'numeric'}];
    function format(option) {
       let formatter = new Intl.DateTimeFormat('en', option);
       return formatter.format(date);
    }
    return options.map(format).join(separator);
}

export function checkUser(){
  const { user } = useUser();

  if(user == null) {
    window.location.replace('/');
  }
}