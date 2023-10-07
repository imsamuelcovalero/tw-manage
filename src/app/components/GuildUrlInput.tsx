"use client";
/* File: src/app/components/startButton.tsx */
import { useState, useEffect } from 'react';
import { fetchGuildData } from '../services/guildService';
import { prepareMembersData } from '../services/memberSevice';
import { IGuild } from '../interfaces/types';
import { toast } from 'react-toastify';
import * as apiService from '../services/apiService';
import { useRouter } from 'next/navigation';

function GuildUrlInput({ guild }: { guild: IGuild }) {
  const [inputValue, setInputValue] = useState(guild?.url || "");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const isGuildExisting = Boolean(guild?.url);

  const router = useRouter();

  const urlPattern = /^https:\/\/swgoh\.gg\/g\/[a-zA-Z0-9\-_]+\/$/; // expressão regular para validar nossa URL específica

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setInputValue(url);

    // Verificar se a URL é válida
    setIsValidUrl(urlPattern.test(url));
  };

  function guildData(data: any): IGuild {
    return {
      name: data.name,
      url: inputValue
    };
  }

  const handleButtonClick = async () => {
    if (!isValidUrl) {
      toast.error("Por favor, insira uma URL válida.");
      return;
    }

    const data = await fetchGuildData(inputValue);
    // console.log('data_GI', data);
    const transformedData = guildData(data.data);
    // console.log('transformedData', transformedData);

    try {
      const guildResponseData = await apiService.upsertGuild(transformedData);

      // Após ter sucesso em inserir a guilda
      const preparedMembers = prepareMembersData(data.data.members, inputValue);
      const membersResponseData = await apiService.upsertMembers(preparedMembers);

      if (isGuildExisting && inputValue === guild?.url) {
        toast.success("TW Reiniciada com sucesso!");
      } else {
        toast.success(guildResponseData.message);
        toast.success(membersResponseData.message);
      }

      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message);
      } else {
        // Handle any other unknown errors
        console.error('An unexpected error occurred:', error);
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="container">
      <div className="my-4">
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="guildUrl"
            name="guildUrl"
            value={inputValue}
            onChange={handleChange}
            placeholder="https://swgoh.gg/g/guildId/"
            className={`focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full rounded-md sm:text-sm border-gray-300 ${!isValidUrl ? "border-red-500" : ""}`}
          />
          <button
            onClick={handleButtonClick}
            disabled={!isValidUrl}
            className={`ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${isValidUrl ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
            {isGuildExisting && inputValue === guild?.url ? "REINICIAR" : "INICIAR"}
          </button>
        </div>
        {!isValidUrl && <p className="text-sm text-red-500 mt-2">Por favor, insira uma URL válida.</p>}
      </div>
    </div>
  );
}

export default GuildUrlInput;