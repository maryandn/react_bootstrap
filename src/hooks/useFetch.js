import axios from "axios";
import {useState} from "react";

export default (url)=>{
    const baseUrl = 'http://127.0.0.1'

    const [isLoading, setIsLoading] =  useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)


}
