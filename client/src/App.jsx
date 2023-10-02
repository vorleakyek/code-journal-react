import {useState, useEffect} from 'react';
import EntryList from './EntryList';
import PageHeader from './PageHeader';
import EntryForm from './EntryForm';
import Modal from './Modal';
import data from './data';

function App() {

  function initialData() {
    const localData = JSON.parse(localStorage.getItem('code-journal-data'));

    if(!localData) {
      return data;
    }
    return localData;
  }

  const initialDataResult = initialData();

  const [view, setView] = useState('entries');
  const [savedData, setSavedData] = useState(initialDataResult);

  useEffect(()=>{
    const dataJSON = JSON.stringify(savedData);
    localStorage.setItem('code-journal-data', dataJSON);
  },[savedData]);

  const viewPageDisplay = function () {
    if (view === 'entry-form') {
     return <EntryForm title="New Entry" onClick={()=>handleView('entries')}/>;
    }

    return <EntryList data={savedData} onClick={()=>handleView('entry-form')}/>;
  }
  const PageDisplay = viewPageDisplay();

  function handleView(page) {
    setView(page);
  }

  return (
  <>
    <PageHeader onClick={()=>{handleView('entries')}} />
    <main>
      {PageDisplay}
    </main>
    <Modal />
  </>
  );
}

export default App;
