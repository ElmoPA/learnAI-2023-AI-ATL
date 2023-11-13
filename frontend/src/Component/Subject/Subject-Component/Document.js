export default function Document() {
  const fileSubmit = () => {};
  return (
    <div className="document-page-container d-flex justify-content-center align-items-center mt-4">
      <form
        className="d-flex flex-inline justify-content-between"
        onSubmit={fileSubmit}
      >
        <input className="form-control" type="file" />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
