import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset, incrementByAmount }  from "../features/counter/counterSlice"

const Counter = () => {

    const { count } = useSelector(store => store.counter);
    const dispatch = useDispatch();

  return (
    <section>
        <p>{count}</p>
        <div>
            <Button onClick={() => dispatch(increment())}>+</Button>
            <Button onClick={() => dispatch(decrement())}>-</Button>
            <Button onClick={() => dispatch(reset())}>Reset</Button>
            <Button onClick={() => dispatch(incrementByAmount(5))}>+5</Button>
        </div>
    </section>
  )
}

export default Counter