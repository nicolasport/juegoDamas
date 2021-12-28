export type TyColor = 'black' | 'white';
type TyObjSides = {
    'left':number,
    'right':number,
    'down':number,
    'top':number,

}

type TySide = 'left' | 'top' | 'right' | 'down';

export class Coordinate{
    x: number;
    y: number;
    constructor(x: number, y:number) {
        this.x = x
        this.y = y
    }
    clone(): Coordinate {
        return new Coordinate(this.x, this.y)
    }
    stepsToMove(step:number, sideV:TySide, sideH:TySide):Coordinate{
        /*
        @params
            sideH -> lado horizontal
            sideV -> lado verticaal
        */
        const sideAdd:TyObjSides = {
            'left':-1,
            'right':1,
            'down':1,
            'top':-1,
        }
        const addX = step * sideAdd[sideV]
        const addY = step * sideAdd[sideH]
        return new Coordinate(this.x + addX, this.y + addY)
    }
    stepsDifference(newCoordinate:Coordinate){
        return Math.abs(this.x - newCoordinate.x)
    }
    sideOfMov(coordinate:Coordinate):{sideV:TySide[], sideH:TySide[]}{
        /*
        @params
            sideH -> lado horizontal
            sideV -> lado verticaal
        */
        const {x: newX, y:newY} = coordinate
        const sideV:TySide[] = newX >= this.x ? ['down'] : ['top']
        const sideH:TySide[] = newY >= this.y ? ['right'] : ['left']
        return {sideV, sideH}
    }
    isEqual(coordiante:Coordinate){
        return coordiante.x === this.x && coordiante.y === this.y
    }

}

export class Player{
    color: TyColor;
    score: number;
    selectedPiece: Pawn | King | null;
    constructor(color:TyColor, score=0) {
        this.color = color
        this.score = score
        this.selectedPiece = null
    }

    setSelectedPiece(pawn: Pawn|King){
        this.selectedPiece = pawn
    }
}

export class Piece {
    coordinate: Coordinate;
    color: TyColor;
    rol: string;
    constructor(color: TyColor, coordinate: Coordinate) {
        this.coordinate = coordinate.clone()
        this.color = color
        this.rol = this.constructor.name
    }

    mov(coordinate:Coordinate){
        this.coordinate = coordinate
    }

}

export class Pawn extends Piece{
    avSideToMov: {sideV:TySide[], sideH:TySide[]}

    constructor(color: TyColor, coordinate: Coordinate) {
        super(color, coordinate);
        let sideV:TySide[];
        const sideH:TySide[] = ['left', 'right'];
        switch (color) {
            case "white":
                sideV = ['down'];
                break
            case "black":
                sideV = ['top'];
                break
        }

        this.avSideToMov = {sideV, sideH}
    }

}
export class King extends Piece{
    avSideToMov: {sideV:TySide[], sideH:TySide[]}

    constructor(color: TyColor, coordinate: Coordinate) {
        super(color, coordinate);
        const sideV:TySide[] = ['top', 'down'];
        const sideH:TySide[] = ['left', 'right'];
        this.avSideToMov = {sideV, sideH}
    }
}

export class Board{
    get sizeX(): number {
        return this._sizeX;
    }
    set sizeX(value: number) {
        this._sizeX = value;
    }

    get sizeY(): number {
        return this._sizeY;
    }
    set sizeY(value: number) {
        this._sizeY = value;
    }

    get matrixSizeX(): number {
        return this._matrixSizeX;
    }
    set matrixSizeX(value: number) {
        this._matrixSizeX = value;
    }

    get matrixSizeY(): number {
        return this._matrixSizeY;
    }
    set matrixSizeY(value: number) {
        this._matrixSizeY = value;
    }

    get rowOfDisc(): number {
        return this._rowOfDisc;
    }
    set rowOfDisc(value: number) {
        this._rowOfDisc = value;
    }

    get memo(): any[] {
        return this._memo;
    }
    set memo(value: any[]) {
        this._memo = value;
    }

    get avPlaces(): any[] {
        return this._avPlaces;
    }
    set avPlaces(value: any[]) {
        this._avPlaces = value;
    }

    get cantDiscPerPlayer(): number {
        return this._cantDiscPerPlayer;
    }
    set cantDiscPerPlayer(value: number) {
        this._cantDiscPerPlayer = value;
    }

    private _sizeX: number;
    private _sizeY: number;
    private _matrixSizeX: number;
    private _matrixSizeY: number;
    private _rowOfDisc:number
    private _memo: any[];
    private _avPlaces: any[];
    private readonly _rowOfPieces:number;
    private _cantDiscPerPlayer: number;

    constructor(sizeX: number, sizeY:number) {
        this._sizeX = sizeX
        this._sizeY = sizeY
        this._matrixSizeX = sizeX - 1
        this._matrixSizeY = sizeY - 1
        this._rowOfDisc = 3 || Math.ceil((sizeX - 3) / 2);
        this._memo = this.boardGenerator(this._sizeX, this._sizeY, this._rowOfDisc)
        this._avPlaces = Board.avPlacesGenerator(sizeX, sizeY)
        this._rowOfPieces = 3
        this._cantDiscPerPlayer = Math.floor(sizeY / 2) * this._rowOfPieces
    }
    private static avPlacesGenerator(sizeX:number, sizeY:number){
        const avPlaces: any[] = [];

        for (let i = 0; i < sizeX; i++) {
            const row = [];

            for (let j = 0; j < sizeY; j++) {
                row.push(0);
            }

            avPlaces.push(row);
        }

        return avPlaces;
    }
    private resetAvPlaces(){
        this._avPlaces = Board.avPlacesGenerator(this._sizeX, this._sizeY)
    }
    private boardGenerator(sizeX: number, sizeY:number, rowOfDisc:number){
        const memo = [];
        const pieceSelector = (i:number, j:number) => {
            if (rowOfDisc - i > 0) {
                //white
                return new Pawn('white', new Coordinate(i, j));
            }
            if (i >= (sizeX - rowOfDisc)) {
                return new Pawn('black', new Coordinate(i, j));
            }
            return 0;
        };
        for (let i = 0; i < sizeX; i++) {
            const row = [];
            for (let j = 0; j < sizeY; j++) {
                if (i % 2 === 0) {
                    if (j % 2 === 0) {
                        row.push(0);
                    } else {
                        row.push(pieceSelector(i, j));
                    }
                } else if (j % 2 === 0) {
                    row.push(pieceSelector(i, j));
                } else {
                    row.push(0);
                }
            }
            memo.push(row);
        }

        return memo
    };
    private checkFreeCell(coordinate: Coordinate):boolean{
        const {x, y} = coordinate
        return this._memo[x][y] === 0
    }
    private isFreeCell_StorePosition (coordinate:Coordinate) {
        if ( this.checkFreeCell(coordinate) ) {
            const {x, y} = coordinate
            this._avPlaces[x][y] = true
            return true
        }
        return false
    }
    private isEnemy(coordinate:Coordinate, playerColor:TyColor):boolean{
        const {x, y} = coordinate
        return this._memo[x][y].color !== playerColor && this._memo[x][y] !== 0
    }
    private coordinateIsInBoard(coordinate : Coordinate){
        return (coordinate.x) <= this._matrixSizeX &&
                (coordinate.x) >= 0 &&
                (coordinate.y) >= 0 &&
                (coordinate.y) <= this._matrixSizeY
    }
    private stepsCounter(coordinate:Coordinate, sideV:TySide, sideH:TySide, rol:string) {
        /*
        @params
            sideH -> lado horizontal
            sideV -> lado verticaal
        */
        //return number of steps on road SideV+SideH to move if is Pawn return 2
        const {x, y} = coordinate
        let result = 1 //Pawn
        if(rol === 'King'){
            const objSelector:any = {
                'topleft': Math.min(x,y),
                'topright': Math.min(x,this._matrixSizeY - y),
                'downleft': Math.min(this._matrixSizeX - x, y),
                'downright': Math.min(this._matrixSizeX - x, this._matrixSizeY - y)
            }
            result = objSelector[sideV+sideH]
        }
        return result
    }
    private getAllPiecesSameColor(enemyColor:TyColor):Array<Pawn|King> {
        let allEnemyPieces: Array<Pawn|King> = []
        this._memo.map((cell:Array<Pawn | King>)  => {
            if( cell.filter((c: Pawn|King) => c?.color === enemyColor).length > 0){

                allEnemyPieces.push(...cell.filter((c: Pawn|King) => c?.color === enemyColor));
                return allEnemyPieces //dont needed
            }
            return null //dont needed
        })
        return allEnemyPieces
    }
    private getContPiecesCanMov(allEnemyPieces:any[]):number{
        let contPiecesCanMov: number = 0
        allEnemyPieces.forEach((piece) => {
            this.checkAvPlaces(piece).map(e => {
                if(e){
                    if (e.filter((e: any) => e === true).length > 0) {
                        contPiecesCanMov++
                        return contPiecesCanMov //dont needed
                    }


                }
                return null //dont needed
            })

        })
        return contPiecesCanMov
    }
    private static enemyColor (timePlayer:TyColor):TyColor{
        return timePlayer === 'white'
            ? 'black'
            : 'white'
    }
    
    get_emptyAvPlaces(){
        return Board.avPlacesGenerator(this._sizeX, this._sizeY)
    }
    checkArriveEndCellOfBoard(coordinate: Coordinate):boolean{
        return Math.abs(coordinate.x - this._matrixSizeX) === 0 || Math.abs(coordinate.x - this._matrixSizeX) === this._matrixSizeX
    }
    movPiece(piece: Pawn | any, movCoordinate:Coordinate){
        //Borro la pieza en el lugar origen del tablero
        const {coordinate:{x,y}} = piece
        this._memo[x][y] = 0
        //Seteo sus nuevas coordenadas
        piece.mov(movCoordinate)
        //Actualizo el en esta nueva posicion la pieza
        const {x : newX,y: newY} = movCoordinate
        this._memo[newX][newY] = piece

    }
    checkAvPlaces(selectedPiece: Pawn | King ):any[]{
        const rol = selectedPiece!.rol!
        const {sideV, sideH} = selectedPiece!.avSideToMov!
        this.resetAvPlaces()

        sideV.forEach((sideV) => {
            sideH.forEach((sideH) => {
                const nextCoordinate = (step:number) => selectedPiece!.coordinate.stepsToMove(step, sideV, sideH)
                const coordinateIsInBoard = (step:number) => this.coordinateIsInBoard(nextCoordinate(step))
                const stepsAvForThisSide = this.stepsCounter(selectedPiece!.coordinate, sideV, sideH, rol)

                if(stepsAvForThisSide > 0){
                    let contPiece = 0
                    for(let step=1; step<=stepsAvForThisSide; step++){
                        if(coordinateIsInBoard(step)){
                            if(this.isFreeCell_StorePosition(nextCoordinate(step))) {}
                            else if (this.isEnemy(nextCoordinate(step), selectedPiece!.color)) {
                                if(contPiece === 0){
                                    contPiece++
                                    if(coordinateIsInBoard(step+1)) {
                                            if (this.isFreeCell_StorePosition(nextCoordinate(step + 1))) {step = step + 1}
                                    }
                                }else{break}
                            }else{break}
                        }else{break}
                    }
                }
            });
        })

        return this._avPlaces
    }
    eatEnemy(selectedPiece: Pawn | King, newCoordinate:Coordinate):boolean{
        const {sideH, sideV} = selectedPiece!.coordinate.sideOfMov(newCoordinate);
        this.resetAvPlaces()

        let result:boolean = false;
        sideV.forEach((sideV) => {
            sideH.forEach((sideH) => {
                //short way to call
                const nextCoordinate = (step:number) => selectedPiece!.coordinate.stepsToMove(step, sideV, sideH)
                const coordinateIsInBoard = (step:number) => this.coordinateIsInBoard(nextCoordinate(step))
                //___
                const stepsAvForThisSide = selectedPiece!.coordinate.stepsDifference(newCoordinate)

                if(stepsAvForThisSide! > 0){
                    for(let step=1; step<=stepsAvForThisSide; step++){
                        if(coordinateIsInBoard(step)){
                            if (this.isEnemy(nextCoordinate(step), selectedPiece!.color)) {
                                const {x, y} = nextCoordinate(step)
                                this._memo[x][y] = 0
                                result = true
                            }
                        }else{break}
                    }
                }

            });
        })

        return result

    }
    checkEatAgain(selectedPiece: Pawn | King ):boolean{
        const rol = selectedPiece!.rol
        const {sideV, sideH} = selectedPiece!.avSideToMov!
        this.resetAvPlaces()

        let eatAgain:boolean = false;

        sideV.forEach((sideV) => {
            sideH.forEach((sideH) => {
                const nextCoordinate = (step:number) => selectedPiece!.coordinate.stepsToMove(step, sideV, sideH)
                const coordinateIsInBoard = (step:number) => this.coordinateIsInBoard(nextCoordinate(step))
                const stepsAvForThisSide = this.stepsCounter(selectedPiece!.coordinate, sideV, sideH, rol)

                if(stepsAvForThisSide > 0){
                    let contPiece = 0
                    for(let step=1; step<=stepsAvForThisSide; step++){
                        if(coordinateIsInBoard(step)){
                            if(this.checkFreeCell(nextCoordinate(step))) {}
                            else if (this.isEnemy(nextCoordinate(step), selectedPiece!.color)) {
                                if(contPiece === 0){
                                    contPiece++
                                    if(coordinateIsInBoard(step+1)) {
                                        if (this.checkFreeCell(nextCoordinate(step + 1))) {
                                            eatAgain = true
                                            return eatAgain
                                        }
                                    }
                                }else{break}
                            }else{break}
                        }else{break}
                    }
                }

            });
        })

        return eatAgain


    }
    checkAllPiecesCantMove(timePlayer:TyColor){
        const enemyColor = Board.enemyColor(timePlayer)
        const allEnemyPieces = this.getAllPiecesSameColor(enemyColor)

        return this.getContPiecesCanMov(allEnemyPieces)
    }

}