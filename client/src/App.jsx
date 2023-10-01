import {useState} from 'react';
import EntryList from './EntryList';
import PageHeader from './PageHeader';
import EntryForm from './EntryForm';
import Modal from './Modal';
import {data} from './data';

function App() {
  const [view, setView] = useState('entry-form');

  const viewPageDisplay = function () {
    if (view === 'entry-form') {
     return <EntryForm/>;
    }

    return <EntryList/>;
  }

  const PageDisplay = viewPageDisplay();
  return (
  <>
    <PageHeader />
    <main>
      {PageDisplay}
    </main>
    <Modal />
  </>
  );
}

export default App;
