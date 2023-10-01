import EntryItem from "./EntryItem"

export default function EntryList({data, onClick}) {
  return (
    <>
      <div className="container" data-view="entries">
        <div className="row">
          <div className="column-full d-flex justify-between align-center">
            <h1>Entries</h1>
            <h3>
              <a onClick={onClick} id="formLink" className="white-text form-link" href="#">NEW</a>
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="column-full">
            <ul className="entry-ul" id="entryUl">
              <ItemList items={data.entries} onClick={onClick}/>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}



function ItemList({items, onClick}) {
  return(
  <>
    {items.map((item)=>(
      <EntryItem  key={item.entryId} data={item} onClick={onClick}/>
    ))};
  </>
  )

}
