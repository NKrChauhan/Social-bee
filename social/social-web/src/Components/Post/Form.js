function Form() {
  return (
    <div>
      <div id="alert-div" class="alert" role="alert">
        <i id="alert-glyph" class="fas" aria-hidden="true"></i>
        <span id="alert-content" class="mb-0"></span>
      </div>
      <form
        className="container form-inline"
        style={{ color: "white" }}
        id="form-post"
        method="POST"
        action="/api/post-create/"
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
