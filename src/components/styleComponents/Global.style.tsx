import styled from "styled-components";

interface IBoardProps {
    width?: number;
    height?: number;
    key?:string;
}

export const Board = styled.ul.attrs(props => ({
    //key: Math.random(),
}))<IBoardProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  list-style: none;
  display: flex;
  flex-wrap : wrap;
  padding: 0;
  position: relative;
`;


interface ICellProps {
    width: number;
    height: number;
    selected: boolean
    isFreeCell: boolean
    row:number
    col:number
    key?:string
}

function checkPair(row:number, col:number) {
    row++
    col++
    if ((row + col) % 2 === 0) {
        return 'white'
    }
    return '#a6a6a6'
}

export const Cell = styled.li<ICellProps>`
  width: ${props => props.width}px; //cellSize - 2
  height: ${props => props.height}px; //cellSize
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid grey;
  cursor: ${props => props.isFreeCell ? 'pointer' : ''}; 
  box-shadow: ${props => props.selected === true 
          ? 'rgb(0 78 255) 0px 0px 10px inset' 
          : props.isFreeCell 
                  ? 'inset 0px 0px 10px #56ff00'
                  :'none'};
  background: ${props => checkPair(props.row, props.col)};
  
`;


interface IDiscProps {
    color: string;
    rol: string;
    width: number;
    height: number;
    key?:string;
    children: any;
    cursorOver:boolean;
}



export const Disc = styled.div.attrs(props => ({
    //key: Math.random(),
}))<IDiscProps>`
  border-radius: 50%;
  border: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.color};
  fill:${props => props.rol === 'King' 
          ?  props.color === 'white' 
                  ? 'black'
                  : 'white'
          : 'none'
    };
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  cursor: ${props => props.cursorOver ? 'pointer' : ''};

`;
