import { useDispatch, useSelector } from "react-redux";
import { reload_books, set_loading } from "../Redux/Slice";

export default function BookComp({book}) {
  const port = useSelector((state) => state.api.port)
  const dispatch = useDispatch();
  // console.log(book);

  const fetchBooks = async (title) => {
    try {
      dispatch(set_loading(true));
      const res = await fetch(`${port}/recommend/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({title}),
      });
      const data = await res.json();
      dispatch(reload_books(data.data));
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(set_loading(false));
    };
  }

  return (
    <div
    onClick={() => fetchBooks(book['Book-Title'])}
    className="each_book"
    style={{
      borderRadius: '5px',
      border: '1px solid black',
      margin: '10px',
      cursor: 'pointer',
      padding: '10px',
      width: '300px',
    }}
    >
      <h3>{book['Book-Title']}</h3>
      <hr />
      <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
      }}>
        <div
        style={{width: '100%'}}
        >{book['Book-Author']}</div>
        <div
        style={{width: '100%'}}
        >{book['Year-Of-Publication']}</div>
      </div>
    </div>
  )
}
