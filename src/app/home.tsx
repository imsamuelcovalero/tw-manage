/* File: src/app/home.tsx */
import React, { useEffect } from 'react'

export default async function Home() {
  function extractGuildId(url: string): string | null {
    const match = url.match(/\/g\/([^\/]+)\//);
    return match ? match[1] : null;
  }

  /** Create guild API link */
  function getGuildApiLink(guildId: string) {
    return `/api/guild?guildId=${guildId}`;
  }

  // Uso:
  const url = "https://swgoh.gg/g/iGco7HmDSm6VbbIOxGoHuA/";
  const guildId = extractGuildId(url);

  if (!guildId) {
    console.warn("Invalid URL provided. Unable to extract guild ID.");
    return (
      <div className="container">
        <h1>Home</h1>
        <p>Invalid guild URL provided.</p>
      </div>
    );
  } else {
    try {
      const apiUrl = `http://localhost:3000${getGuildApiLink(guildId)}`;
      console.log('apiUrl', apiUrl);

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Guild Data:", data);
      return (
        <div className="container">
          <h1>Home2</h1>
          <p>{data.data.name}</p>
        </div>
      );
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error.message);
    }
  }

  /** Create player API link */
  function getPlayerApiLink(allyCode: string) {
    const link = `/api/playerProxy?allyCode=${allyCode}`;
    // TODO: data check
    // console.log('link', link);

    return link;
  }

  const allyCode = "417229579"
  try {
    const apiUrl = `http://localhost:3000${getPlayerApiLink(allyCode)}`;
    // console.log('apiUrl', apiUrl);

    const response = await fetch(apiUrl);
    // console.log('response', response);


    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);
  } catch (error: any) {
    console.error("There was a problem with the fetch operation:", error.message);
  }


  return (
    <div className="container">
      <h1>Home</h1>
    </div>
  )
}