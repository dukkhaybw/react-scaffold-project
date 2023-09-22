import { increment } from '@/store/action/counter';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.counter.count);

  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        +1
      </button>
    </div>
  );
}
