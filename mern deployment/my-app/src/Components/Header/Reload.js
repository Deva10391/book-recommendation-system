import { useDispatch, useSelector } from "react-redux";
import { reload_books, set_loading } from "../../Redux/Slice";
import { useEffect } from "react";
import refresh from './refresh.png';

export default function Reload() {
  const port = useSelector((state) => state.api.port)
  const dispatch = useDispatch();

  const reload_func = async () => {
    dispatch(set_loading(true));

    try {
      const res = await fetch(`${port}/load_all/`)
      const data = await res.json();
      dispatch(reload_books(data.data));
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(set_loading(false));
    }
  }

  useEffect(() => {
    reload_func();
  }, []);

  return (
    <div>
      <button
      onClick={reload_func}
      style={{
        cursor: 'pointer',
        backgroundColor: 'transparent',
        padding: '5px',
        borderRadius: '2.5px',
        verticalAlign: 'center',
        height: '30px',
        width: '30px',
        marginTop: '100%',
      }}
      >
        <img
        src={refresh}
        style={{
          width: '15px',
          height: '15px',
        }}
        />
      </button>
    </div>
  );
}
