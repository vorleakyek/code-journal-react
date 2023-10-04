import EntryItem from './EntryItem';

export default function EntryList({ data, onClick }) {
  return (
    <>
      <div className="container" data-view="entries">
        <div className="row">
          <div className="column-full d-flex justify-between align-center">
            <h1>Entries</h1>
            <h3>
              <a
                onClick={onClick}
                id="formLink"
                className="white-text form-link"
                href="#">
                NEW
              </a>
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="column-full">
            <ItemList items={data.entries} onClick={onClick} />
          </div>
        </div>
      </div>
    </>
  );
}

function ItemList({ items, onClick }) {
  if (items.length === 0) {
    return <p>No entries have been recorded.</p>;
  }

  return (
    <ul className="entry-ul" id="entryUl" onClick={onClick}>
      {items.map((item) => (
        <li key={item.entryId} id={item.entryId}>
          <EntryItem data={item} />
        </li>
      ))}
    </ul>
  );
}
