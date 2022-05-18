function App() {
  return (
    <>
      {/* first let's setup the UI */}
      <section className="section">
        <form autoComplete="off">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search the news"
          />
          <button>Search</button>
        </form>
        <article className="title">
          <h1>First posts tiltle here</h1>
          {/* here href will get the link from API call */}
          <a href="">Read full story</a>
        </article>

        {/* building how each card will look like */}
        <article className="cards">
          <div>
            <h2>Heading 2</h2>
            <ul>
              <li>By Jatin Dixit</li>
              <li>
                <a href="">Read full story</a>
              </li>
            </ul>
            <p>Date(point)</p>
          </div>
        </article>
      </section>
    </>
  );
}

export default App;
