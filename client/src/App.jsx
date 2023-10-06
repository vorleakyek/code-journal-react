import { useState, useEffect } from 'react';
import EntryList from './EntryList';
import PageHeader from './PageHeader';
import EntryForm from './EntryForm';
import Modal from './Modal';
import data from './data';

function App() {
  // NOT SURE WHY THE LOCAL STORAGE DATA IS RESET TO EMPTY AFTER PAGE REFRESH?
  // const initialDataResult = initialData();
  // const [savedData, setSavedData] = useState(initialDataResult);

  // function initialData() {
  //     const localData = JSON.parse(localStorage.getItem('code-journal-data'));

  //     if (!localData) {
  //       return data;
  //     }

  //     return localData;
  //   }

  const [savedData, setSavedData] = useState(data);
  const [view, setView] = useState('entries');
  const [entryTitle, setEntryTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [editEntryId, setEditEntryId] = useState('');
  const PageDisplay = viewPageDisplay();

  useEffect(() => {
    function initialData() {
      const localData = JSON.parse(localStorage.getItem('code-journal-data'));

      if (!localData) {
        return data;
      }

      return localData;
    }

    const initialDataResult = initialData();
    setSavedData(initialDataResult);
  }, []);

  useEffect(() => {
    const dataJSON = JSON.stringify(savedData);
    localStorage.setItem('code-journal-data', dataJSON);
  }, [savedData]);

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
      const previousEntryObject = findEntryObject(savedData, editEntryId);

      return (
        <EntryForm
          formTitle="Edit Entry"
          formValue={[
            previousEntryObject.title,
            previousEntryObject.imgUrl,
            previousEntryObject.notes,
          ]}
          onSubmit={handleFormSubmit}
          onChange={handleFormChange}
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

  // function editformValue(previousEntryObject) {
  //   if (previousEntryObject.title !== entryTitle) {
  //   setEntryTitle(previousEntryObject.title);
  //   console.log('hey2')
  // }

  // if (previousEntryObject.imgUrl !== imgUrl) {
  //   setImgUrl(previousEntryObject.imgUrl);
  // }

  // if (previousEntryObject.notes !== notes) {
  //   setNotes(previousEntryObject.notes);
  // }

  // }

  function findEntryObject(data, entryIdNumber) {
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entryIdNumber) {
        return data.entries[i];
      }
    }
    return null;
  }

  function handleEditEntryId(entryId) {
    setEditEntryId(entryId);
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
