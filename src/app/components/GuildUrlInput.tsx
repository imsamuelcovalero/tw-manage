"use client";
/* File: src/app/components/startButton.tsx */
import { useState, useContext, useEffect } from 'react';
import { fetchGuildData } from '../services/guildService';
import { prepareMembersData } from '../services/memberSevice';
import { IGuild } from '../interfaces/types';
import { toast } from 'react-toastify';
import * as apiService from '../services/apiService';
import { useRouter } from 'next/navigation';
import TwManageContext from '../providers/TwManageContext';
import { setInteractionStateInLocalStorage } from '../helpers/localStorageHelper';

function GuildUrlInput({ guild }: { guild?: IGuild }) {
  const [inputValue, setInputValue] = useState(guild?.url || "");
  const [isValidUrl, setIsValidUrl] = useState(true);

  const { toggleMembersTable } = useContext(TwManageContext);

  const isGuildExisting = Boolean(guild?.url);

  const router = useRouter();

  const urlPattern = /^https:\/\/swgoh\.gg\/g\/[a-zA-Z0-9\-_]+\/$/; // expressão regular para validar nossa URL específica

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setInputValue(url);

    // Verificar se a URL é válida
    setIsValidUrl(urlPattern.test(url));
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
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

    try {
      const data = await fetchGuildData(inputValue);

      const transformedData = guildData(data.data);
      // console.log('transformedData', transformedData);

      const guildResponseData = await apiService.upsertGuild(transformedData);
      console.log('guildResponseData', guildResponseData);

      // Após ter sucesso em inserir a guilda
      const preparedMembers = prepareMembersData(data.data.members, inputValue);
      const membersResponseData = await apiService.upsertMembers(preparedMembers);

      if (isGuildExisting && inputValue === guild?.url) {
        toast.success("TW Reiniciada com sucesso!");
      } else {
        toast.success(guildResponseData.message);
        toast.success(membersResponseData.message);
      }

      toggleMembersTable();
      setInteractionStateInLocalStorage(true)
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
    <div className="container w-full max-w-md">
      <div className="my-4">
        <p className="text-sm text-gray-600 mb-2">
          To begin, enter a guild URL or replace the current one if needed.
        </p>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            id="guildUrl"
            name="guildUrl"
            value={inputValue}
            onChange={handleChange}
            onClick={handleInputClick}
            placeholder="https://swgoh.gg/g/guildId/"
            className={`focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full rounded-l-md sm:text-sm border-gray-300 ${!isValidUrl ? "border-red-500" : ""}`}
          />
          <button
            onClick={handleButtonClick}
            disabled={!isValidUrl}
            className={`ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white ${isValidUrl ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
            {isGuildExisting && inputValue === guild?.url ? "RESTART" : "START"}
          </button>
        </div>
        {!isValidUrl && <p className="text-sm text-red-500 mt-2">Please enter a valid URL.</p>}
      </div>
    </div>
  );
}

export default GuildUrlInput;