import { FaPencilAlt } from 'react-icons/fa';

export default function EntryItem({ data }) {
  return (
    <>
      <div className="row">
        <div className="column-half">
          <img src={data.imgUrl} className="input-b-radius form-image" />
        </div>
        <div className="column-half">
          <div className="row">
            <div className="column-full d-flex justify-between align-center">
              <h3>{data.title} </h3>
              <div className="pencil-icon">
                <FaPencilAlt />
              </div>
            </div>
          </div>
          <p>{data.notes}</p>
        </div>
      </div>
    </>
  );
}
