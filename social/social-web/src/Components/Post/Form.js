function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }
  return (
    <div className="container my-5">
      <div id="alert-div" className="alert" role="alert">
        <i id="alert-glyph" className="fas" aria-hidden="true"></i>
        <span id="alert-content" className="mb-0"></span>
      </div>
      <form
        className="container form-inline"
        style={{ color: "white" }}
        id="form-post"
        method="POST"
        onSubmit={handleSubmit}
      >
        <textarea
          id="text-content"
          className="form-control col-md-11 mx-2"
          placeholder="Type Here !"
          name="content"
          required
        ></textarea>
        <button
          type="submit"
          className="btn mb-2"
          style={{ backgroundColor: "darkred", color: "white", border: "15%" }}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Form;
