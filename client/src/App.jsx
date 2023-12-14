import { useState, useEffect } from 'react';
import EntryList from './EntryList';
import PageHeader from './PageHeader';
import EntryForm from './EntryForm';
import getData, { addNewEntry, updateEntry, deleteEntry } from './data';

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
          handleFormSubmit={handleNewFormSubmit}
          deleteBtnClassName="invisible delete-entry-button"
          formTitle="New Entry"
          data={savedData}
          view={view}
          editEntryId={editEntryId}
          handleUpdateData={(newData)=>setSavedData(newData)}
        />
      );
    }

    if (view === 'edit-form') {
      return (
        <EntryForm
          handleFormSubmit={handleEditFormSubmit}
          deleteBtnClassName="delete-entry-button"
          formTitle="Edit Entry"
          data={savedData}
          view={view}
          editEntryId={editEntryId}
          handleUpdateData={(newData) => setSavedData(newData)}
          handleView={handleView}
        />
      );
    }

    return (
      <EntryList
        data={savedData}
        handleView={handleView}
        editEntryId={handleEditEntryId}
      />
    );
  }

  function handleEditEntryId(entryId) {
    setEditEntryId(entryId);
  }

  function handleView(page) {
    setView(page);
  }

  function handleNewFormSubmit(newEntryObj) {
    const updatedEntries = [newEntryObj, ...savedData.entries];
    const updatedEntryId = savedData.nextEntryId + 1;
    const updatedSavedData = {
      entries: updatedEntries,
      nextEntryId: updatedEntryId,
    };

    setSavedData(updatedSavedData);
    handleView('entries');
  }

  function handleEditFormSubmit(editEntryObj, savedData) {
    const updatedEntries = savedData.entries.map((entry) => {
      if (entry.entryId === editEntryId) {
        return editEntryObj;
      } else {
        return entry;
      }
    });

    const updatedSavedData = {
      entries: updatedEntries,
      nextEntryId: savedData.nextEntryId,
    };

    setSavedData(updatedSavedData);
    handleView('entries');
    setEditEntryId('');
  }

  return (
    <>
      <PageHeader
        onClick={() => {
          handleView('entries');
        }}
      />
      <main>{PageDisplay}</main>
    </>
  );
}

export default App;
