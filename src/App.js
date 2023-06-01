import PageItem from "./PageItem";

function App() {



  return (
    <div className="main">
      <h1>Just Giving Example for random posts.</h1>
      <PageItem itemsPerPage={5} />
    </div>
  );
}

export default App;
