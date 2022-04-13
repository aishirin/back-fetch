const root=document.getElementById("root")


function App(){
    const [posts,setPosts]=React.useState([])
     const [search,setSearch]=React.useState("")
     const [btn,setBtn]=React.useState("")
     const [loading,setLoading]=React.useState(false)
     const [page,setPage]=React.useState(1)
    React.useEffect(()=>{
        setLoading(true)
        fetch(`https://jsonplaceholder.typicode.com/posts?q=${search}&_limit=12&_page=${page}`)
        .then((response) => response.json())
        .then((data) => {setPosts(data)
        setLoading(false)})
     },[btn,page]);
    //  console.log(posts);
    //  const filteredSearch=posts.filter((item)=>(
    //      item.title.includes(btn)
    //  ))
    //  console.log(filteredSearch);
    const [modal,setModal]=React.useState(false)
    return (
        <div className="App">
            {modal && (<div className="modal">
                <div className="modal-content">
                    <button onClick={()=>setModal(false)}>Закрыть</button>
                    <div className="search">
                    <input type="search" onChange={(e)=>setSearch(e.target.value)}></input>
                    <button onClick={()=>setBtn(search)}>Search</button>
                </div>
                </div>
            </div>)}
            <button onClick={()=>setModal(true)}>Open</button>
            <button onClick={()=>setPage(page-1)}>Previous page</button>
            <button onClick={()=>setPage(page+1)}>Next page</button>
            {loading && <img  src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"></img>}
            {!loading && <section className="post-list">
            {posts.map((item)=>(
                <article key={item.id} className="post">
                    <h1>{item.title}</h1>
                    <p>{item.body}</p>
                </article>
            ))}
            </section>
            }
        </div>
    )
}

ReactDOM.render(<App />, root);