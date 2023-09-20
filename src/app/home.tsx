/* File: src/app/home.tsx */
import React, { useEffect } from 'react'

export default async function Home() {
  /** Create player API link */
  function getPlayerApiLink(allyCode: string) {
    const link = `/api/playerProxy?allyCode=${allyCode}`;
    // TODO: data check
    console.log('link', link);

    return link;
  }

  const allyCode = "417229579"
  try {
    const apiUrl = `http://localhost:3000${getPlayerApiLink(allyCode)}`;
    console.log('apiUrl', apiUrl);

    const response = await fetch(apiUrl);
    console.log('response', response);


    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error: any) {
    console.error("There was a problem with the fetch operation:", error.message);
  }


  return (
    <div className="container">
      <h1>Home</h1>
    </div>
  )
}