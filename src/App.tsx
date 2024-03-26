import React, { useState, useEffect } from 'react';
import './App.css';
import { useQuery } from '@apollo/client';
import { GET_ALL_COUNTRIES } from './query/country';
import { Country } from './types/country.type';

function App() {
  const { data, loading } = useQuery(GET_ALL_COUNTRIES);
  const [initialCountries, setInitialCountries] = useState<Country[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    if (!loading) {
      setCountries(data.countries);
      setInitialCountries(data.countries);
    }
  }, [data, loading]);

  const filterCountries = (value: string) => {
    const filteredCountries = initialCountries.filter((country) =>
      country.code.toLowerCase().includes(value.toLowerCase()),
    );

    if (value.length) {
      setCountries(filteredCountries);
    } else {
      setCountries(initialCountries);
    }

    setSearchValue(value);
  };

  return (
    <div className="flex items-center justify-center flex-col mt-10">
      <h1 className="text-3xl font-bold ">Hub88 Test Task</h1>
      <div className="relative overflow-x-auto shadow-md mt-10">
        <div className="flex flex-column items-center justify-center flex-wrap space-y-4 pb-4">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <input
              id="table-search"
              type="text"
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                filterCountries((e.target as HTMLInputElement).value)
              }
              className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        <table className="w-[700px] text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Country name
              </th>
              <th scope="col" className="px-6 py-3">
                Country code
              </th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr className="bg-white border-b  hover:bg-gray-50" key={country.code}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {country.name}
                </th>
                <td className="px-6 py-4">{country.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
