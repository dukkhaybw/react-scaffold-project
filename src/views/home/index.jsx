import { increment } from '@/store/action/counter';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.counter.count);

  return (
    <div>
      <p>{count}</p>
      <Button
        type="primary"
        onClick={() => {
          dispatch(increment());
        }}
      >
        +1
      </Button>
    </div>
  );
}
