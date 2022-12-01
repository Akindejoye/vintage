import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books", {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Vintage Book Shop</h1>
      <div className="books">
        {books?.map((book) => (
          <div className="book" key={book.id}>
            {book?.cover && (
              <img
                src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                alt=""
                className="image"
              />
            )}
            <h2>{book?.title}</h2>
            <p>{book?.desc}</p>
            <span>{book?.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              <Link className="link" to={`/update/${book.id}`}>
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link className="link" to="/add">
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;
