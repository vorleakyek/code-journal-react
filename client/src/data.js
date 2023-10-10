/* exported data */

let data = {
  entries: [],
  nextEntryId: 1,
};

function getData() {
  return data;
}

function addNewEntry(savedData,entryTitle,imgUrl,notes) {
  const newEntryObj = {
      entryId: savedData.nextEntryId,
      title: entryTitle,
      imgUrl: imgUrl,
      notes: notes,
    };

    const updateEntries = [newEntryObj, ...savedData.entries];
    const updateEntryId = savedData.nextEntryId + 1;
    const updateSavedData = {
      entries: updateEntries,
      nextEntryId: updateEntryId,
    };

  return updateSavedData;
}

function updateEntry() {
  console.log('updateEntry');
}

function deleteEntry() {
  console.log('delete Entry');
}

export default getData;
export {addNewEntry, updateEntry, deleteEntry};
