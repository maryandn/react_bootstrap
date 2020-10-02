import {useState} from "react";

const useError = () => {
    const [errors, setErrors] = useState({})

    return errors
}
export default useError()
