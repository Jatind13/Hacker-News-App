// start fetching our data
import { useState, useEffect } from "react";
//importing date method
import { format } from "date-fns";
//we can also write it as
//import format from "date-fns/format"
//installing date fns package which I am going to use
//immporting react-toastify package
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//----------------------------------
//Now let's setup our stateValues
function App() {
  const [items, setItems] = useState([]);
  //these values are going to handle the data which we will fetch from the API
  const [query, setQuery] = useState("programming");
  //by default query is set for "programming" because the query string is the string which we are appending at the end of the API for the data we want

  const [text, setText] = useState("");
  //this is what we are fetching from search block
  //largetitle is for showing the title of the very first news as bold and bigger in size which is by default an empty array
  const [largeTitle, setLargeTitle] = useState([]);
  //isLoading will be initially true because the loading state is always going to be showing if don't hav the data
  const [isLoading, setIsLoading] = useState(true);
  //let's grab our API ans use useEffect hook and inside our callback function we will fetch the data
  useEffect(() => {
    // // now we want to stop this loading spinner once we fetch our data so first we will have our setIsLoading set to true before fetching inside our useEffect hook
    setIsLoading(true);
    const fetchArticles = async () => {
      const res = await fetch(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      const data = await res.json();
      // we will collect all the data form hits array inside the API
      setItems(data.hits);
      //now setLargeTitle which is going to get firts article from the API call
      setLargeTitle(data.hits[0]);
    };
    //calling our functions ->
    fetchArticles();
    //after the data we will mark isloading as false
    setIsLoading(false);
  }, [query]); // we have our dependcy array depending on query what this means is every time that the query state body changes we need all of this to run

  // code for handling submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      //do something when someone submit the form without any input , so for that we will use react-toastify package
      toast("Input is empty");
    } else {
      setQuery(text); //query is the state value which we are using to query the API so when we change it we need this to run again.
      setText(""); //set the text to empty string when submitted
    }
  };

  return (
    <>
      {/* first let's setup the UI */}
      <section className="section">
        {/* we need some function which works on the submission of the search */}
        <form autoComplete="off" onSubmit={handleSubmit}>
          {/* now let's get ahead and create this function */}
          <input
            type="text"
            name="search"
            id="search"
            value={text} //which is for default search value
            onChange={(e) => setText(e.target.value)} //so basically what ever text we are typing it is going to populate the useState of the text
            placeholder="Search the news"
          />
          <button>Search</button>
        </form>
        {/*  now let's work on the loading stage so what I am going to do is that will grab all the card data and then check that if it is loading is true then I want div with spinner else i want all the data fragmented as one and returned  */}

        {/* toast container */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <>
            {" "}
            <article className="title">
              {/* getting first news as a large title from API */}
              <h1>{largeTitle.title}</h1>
              {/* here href will get the link from API call */}
              <a
                href={largeTitle.url}
                target="_blank"
                rel="noreferrer"
                id="readFull"
              >
                Read full story
              </a>
            </article>
            <p className="category">
              Category: <span>{query}</span>
            </p>
            {/* building how each card will look like */}
            <article className="cards">
              {/* <div>
                <h2>Heading 2</h2>
                <ul>
                  <li>By Jatin Dixit</li>
                  <li>
                    <a href="">Read full story</a>
                  </li>
                </ul>
                <p>Date(point)</p>
              </div> */}
              {/* now let's go ahead and populate our cards and basically map over our data and get data like author date points and objectId which is basically unique */}
              {items.map(
                ({
                  author,
                  created_at,
                  title,
                  url,
                  objectId,
                  points,
                  num_comments,
                }) => (
                  <div key={objectId}>
                    <h2>{title}</h2>
                    <ul>
                      <li>By {author}</li>
                      <li>
                        <a href={url} target="_blank" rel="noreferrer">
                          Read Full Story
                        </a>
                      </li>
                    </ul>
                    {/* so we have installed the date format package and now is the time to use it */}
                    <p>{format(new Date(created_at), "dd MMMM yyyy ")}</p>
                    <p>Points:{points}</p>
                    <p>Comments:{num_comments}</p>
                  </div>
                )
              )}
            </article>
          </>
        )}
      </section>
    </>
  );
}

export default App;
