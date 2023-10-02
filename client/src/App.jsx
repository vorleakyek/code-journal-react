import {useState, useEffect} from 'react';
import EntryList from './EntryList';
import PageHeader from './PageHeader';
import EntryForm from './EntryForm';
import Modal from './Modal';
import data from './data';

function App() {
  const initialDataResult = initialData();
  const [view, setView] = useState('entries');
  const [savedData, setSavedData] = useState(initialDataResult);
  const [entryTitle, setEntryTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [note,setNote] = useState('');

  useEffect(()=>{
    const dataJSON = JSON.stringify(savedData);
    localStorage.setItem('code-journal-data', dataJSON);
  },[savedData]);


  const viewPageDisplay = function () {
    if (view === 'entry-form') {
     return <EntryForm formTitle="New Entry" formValue={[entryTitle,imgUrl,note]} onSubmit={handleFormSubmit} onChange={handleFormChange}/>;
    }

    return <EntryList data={savedData} onClick={()=>handleView('entry-form')}/>;
  }
  const PageDisplay = viewPageDisplay();


  function initialData() {
    const localData = JSON.parse(localStorage.getItem('code-journal-data'));

    if(!localData) {
      return data;
    }
    return localData;
  }

  function handleView(page) {
    setView(page);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log('submit');
    const newEntryObj = {
      entryId: savedData.nextEntryId,
      title: entryTitle,
      imgUrl: imgUrl,
      notes:note
    }

    const updatedEntries = [...savedData.entries, newEntryObj];
    const updatedEntryId = savedData.nextEntryId + 1;
    const updatedSavedData = {entries: updatedEntries, nextEntryId: updatedEntryId }
    setSavedData(updatedSavedData);
    resetForm();
    handleView('entries');
  }

  function handleFormChange(e) {
    if(e.target.id === 'formTitle') {
      setEntryTitle(e.target.value);
    } else if(e.target.id=== 'formURL') {
      setImgUrl(e.target.value);
    } else if (e.target.id=== 'formNotes') {
      setNote(e.target.value);
    }
  }

  function resetForm() {
  setEntryTitle('');
  setImgUrl('');
  setNote('')
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
