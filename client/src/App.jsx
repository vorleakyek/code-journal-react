import { useState, useEffect } from 'react';
import EntryList from './EntryList';
import PageHeader from './PageHeader';
import EntryForm from './EntryForm';
import Modal from './Modal';
import getData, {addNewEntry, updateEntry, deleteEntry } from './data';

function App() {
  const initialDataResult = initialData();
  const [savedData, setSavedData] = useState(initialDataResult);
  const [view, setView] = useState('entries');
  const [editEntryId, setEditEntryId] = useState('');
  const PageDisplay = viewPageDisplay();

  function initialData() {
    const localData = JSON.parse(localStorage.getItem('code-journal-data'));

    if (!localData) {
      return getData;
    }

    return localData;
  }

  useEffect(() => {
    const dataJSON = JSON.stringify(savedData);
    localStorage.setItem('code-journal-data', dataJSON);
  }, [savedData]);


  function viewPageDisplay() {
    if (view === 'entry-form') {
      return (
        <EntryForm
          handleFormSubmit = {handleFormSubmit}
          deleteBtnClassName="invisible delete-entry-button"
          formTitle="New Entry"
          data={savedData}
        />
      );
    }


    // if (view === 'edit-form') {
    //   const previousEntryObject = findEntryObject(savedData, editEntryId);

    //   return (
    //     <EntryForm
    //       handleFormSubmit={handleFormSubmit}
    //       deleteBtnClassName="delete-entry-button"
    //     />
    //   );
    // }

    return (
      <EntryList
        data={savedData}
        handleView={handleView}
        editEntryId={handleEditEntryId}
      />
    );
  }

  // function findEntryObject(data, entryIdNumber) {
  //   for (let i = 0; i < data.entries.length; i++) {
  //     if (data.entries[i].entryId === entryIdNumber) {
  //       return data.entries[i];
  //     }
  //   }
  //   return null;
  // }

  function handleEditEntryId(entryId) {
    setEditEntryId(entryId);
  }

  function handleView(page) {
    setView(page);
  }

  function handleFormSubmit(newEntryObj) {

    const updatedEntries = [newEntryObj, ...savedData.entries];
    const updatedEntryId = savedData.nextEntryId + 1;
    const updatedSavedData = {
      entries: updatedEntries,
      nextEntryId: updatedEntryId,
    };

    setSavedData(updatedSavedData);
    handleView('entries');
    console.log('pass in id', savedData.nextEntryId);
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
