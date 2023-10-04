import { useState, useEffect } from 'react';
import EntryList from './EntryList';
import PageHeader from './PageHeader';
import EntryForm from './EntryForm';
import Modal from './Modal';
import data from './data';

function App() {
  //NOTE: When the App is first load, it will check if there are any data in the local storage that can be used. If there are no data that can be used, it will use the given empty data as the initial value. Once the page is render for the first time, the callback function inside of the useEffect will be called and set the empty data in the local storage. Then, any changes to the savedData after clicking save on the form will be updated and save to the local storage. Determine the initialData is also needed to load the saved entries after page refresh.

  const initialDataResult = initialData();
  const [savedData, setSavedData] = useState(initialDataResult);
  const [view, setView] = useState('entries');
  const [entryTitle, setEntryTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [notes, setNotes] = useState('');
  const PageDisplay = viewPageDisplay();

  useEffect(() => {
    const dataJSON = JSON.stringify(savedData);
    localStorage.setItem('code-journal-data', dataJSON);
  }, [savedData]);

  function initialData() {
    const localData = JSON.parse(localStorage.getItem('code-journal-data'));

    if (!localData) {
      return data;
    }
    return localData;
  }

  function viewPageDisplay() {
    if (view === 'entry-form') {
      return (
        <EntryForm
          formTitle="New Entry"
          formValue={[entryTitle, imgUrl, notes]}
          onSubmit={handleFormSubmit}
          onChange={handleFormChange}
        />
      );
    }

    if (view === 'edit-form') {
      return (
        <EntryForm
          formTitle="Edit Entry"
          formValue={[entryTitle, imgUrl, notes]}
          onSubmit={handleFormSubmit}
          onChange={handleFormChange}
        />
      );
    }

    return <EntryList data={savedData} onClick={handleViewForm} />;
  }

  function handleViewForm(e) {
    if (e.target.id === 'formLink') {
      handleView('entry-form');
    }
    //Add code for the edit entry flow
  }

  function handleView(page) {
    setView(page);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const newEntryObj = {
      entryId: savedData.nextEntryId,
      title: entryTitle,
      imgUrl: imgUrl,
      notes: notes,
    };

    const updatedEntries = [newEntryObj, ...savedData.entries];
    const updatedEntryId = savedData.nextEntryId + 1;
    const updatedSavedData = {
      entries: updatedEntries,
      nextEntryId: updatedEntryId,
    };
    setSavedData(updatedSavedData);
    resetForm();
    handleView('entries');
  }

  function handleFormChange(e) {
    if (e.target.id === 'formTitle') {
      setEntryTitle(e.target.value);
    } else if (e.target.id === 'formURL') {
      setImgUrl(e.target.value);
    } else if (e.target.id === 'formNotes') {
      setNotes(e.target.value);
    }
  }

  function resetForm() {
    setEntryTitle('');
    setImgUrl('');
    setNotes('');
  }

  return (
    <>
      <PageHeader
        onClick={() => {
          handleView('entries');
        }}
      />
      <main>{PageDisplay}</main>
      <Modal />
    </>
  );
}

export default App;
