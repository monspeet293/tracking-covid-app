import { useEffect, useState } from 'react';
import { getCountries, getReportByCountry } from './api/countryApi';
import CountrySelector from './components/CountrySelector';
import Highlight from './components/Highlight';
import Summary from './components/Summary';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryID, setSelectedCountryID] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries()
      .then(res => {
        console.log({ res });
        setCountries(res.data);
        setSelectedCountryID('vn');
      });
  }, []);

  const handleOnchange = (event) => {
    setSelectedCountryID(event.target.value);
  };

  useEffect(() => {
    if (selectedCountryID) {
      //Get Slug from countries where country.ISO2.toLowerCase() === event.target.value
      const { Slug } = countries.find(country => country.ISO2.toLowerCase() === selectedCountryID);
      console.log({ Slug })

      getReportByCountry(Slug)
        .then(res => {
          console.log('Info', { res })
          res.data.pop(); // Last day incorrect => Delete last item
          setReport(res.data);
        })
    }

  }, [countries, selectedCountryID])

  return (
    <>
      <CountrySelector countries={countries} handleOnchange={handleOnchange} value={selectedCountryID} />
      <Highlight report={report} />
      <Summary report={report} />
    </>
  );
}

export default App;
