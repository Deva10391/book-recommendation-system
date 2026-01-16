import { useSelector } from "react-redux";
import BookComp from "./BookComp";

export default function ShowBooks() {
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  console.log(books);

  return (
    <div
    style={{
      display: 'flex',
      flexDirection:'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}
    >
      {(!loading && books) ? books.map((book, index) => (
        <BookComp key={index} book={book}/>
      )) : (
        <div>Loading</div>
      )}
    </div>
  );
}
