import { createContext } from 'react';
import {IStateContext} from "../ts/interfaces";


const BoardContext = createContext<Partial<IStateContext>>({});

export default BoardContext;
