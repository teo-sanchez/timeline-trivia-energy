import { useEffect, useState } from "react";

const useFetchJson = (url) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        setResponse(res)
      })
      .catch(err => {
        setError(err)
      })
  }, [])

  return [response, error]
}

export default useFetchJson;