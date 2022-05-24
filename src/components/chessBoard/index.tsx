import s from "./ChessBoard.module.scss"
import p from "../tile/Tile.module.scss"
import Tile from "../tile";
import clsx from "clsx";
import React, {useRef, useState} from "react";
import Referee from "../../referee/Referee";
import {
    GRID_SIZE,
    horizontalAxis,
    PiecesProps,
    PiecesType,
    Position,
    samePotion,
    TeamType,
    verticalAxis
} from "../../constants";


const initialBoardState: PiecesProps[] = []

for (let i = 0; i < 8; i++) {
    initialBoardState.push({
        image: "assets/pawn_b.svg",
        position: {x: i, y: 6},
        type: PiecesType.PAWN,
        team: TeamType.OPPONENT
    })
}
for (let i = 0; i < 8; i++) {
    initialBoardState.push({
        image: "assets/pawn_w.svg",
        position: {x: i, y: 1},
        type: PiecesType.PAWN,
        team: TeamType.UOR
    })
}
for (let p = 0; p < 2; p++) {
    const teamType = (p === 0) ? TeamType.OPPONENT : TeamType.UOR
    const type = (teamType === TeamType.OPPONENT) ? "b" : "w"
    const y = (teamType === TeamType.OPPONENT) ? 7 : 0

    initialBoardState.push({
        image: `assets/rook_${type}.svg`,
        position: {x: 0, y},
        type: PiecesType.ROOK,
        team: teamType
    })
    initialBoardState.push({
        image: `assets/bishop_${type}.svg`,
        position: {x: 2, y},
        type: PiecesType.BISHOP,
        team: teamType
    })
    initialBoardState.push({
        image: `assets/knight_${type}.svg`,
        position: {x: 1, y},
        type: PiecesType.KNIGHT,
        team: teamType
    })
    initialBoardState.push({
        image: `assets/king_${type}.svg`,
        position: {x: 4, y},
        type: PiecesType.KING,
        team: teamType
    })
    initialBoardState.push({
        image: `assets/queen_${type}.svg`,
        position: {x: 3, y},
        type: PiecesType.QUEEN,
        team: teamType
    })

    initialBoardState.push({
        image: `assets/rook_${type}.svg`,
        position: {x: 7, y},
        type: PiecesType.ROOK,
        team: teamType
    })
    initialBoardState.push({
        image: `assets/bishop_${type}.svg`,
        position: {x: 5, y},
        type: PiecesType.BISHOP,
        team: teamType
    })
    initialBoardState.push({
        image: `assets/knight_${type}.svg`,
        position: {x: 6, y},
        type: PiecesType.KNIGHT,
        team: teamType
    })
}


export const ChessBoard = () => {
    const [promotion, setPromotion] = useState<PiecesProps>()
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null)
    const [grabPosition, setGrabPotion] = useState<Position>({x: -1, y: -1})
    const [pieces, setPieces] = useState<PiecesProps[]>(initialBoardState)
    const chessBoardRef = useRef<HTMLDivElement>(null)
    const modelRef = useRef<HTMLDivElement>(null)
    const referee = new Referee()


    const grabPiece = (e: React.MouseEvent<HTMLDivElement>) => {
        const chessBoard = chessBoardRef.current
        const element = e.target as HTMLElement
        if (element.classList.contains(p.title_chess_piece) && chessBoard) {
            setGrabPotion({
                x: Math.floor((e.clientX - chessBoard.offsetLeft) / GRID_SIZE),
                y: Math.abs(Math.ceil((e.clientY - chessBoard.offsetTop - 800) / GRID_SIZE))
            })

            const x = e.clientX - GRID_SIZE / 2
            const y = e.clientY - GRID_SIZE / 2
            element.style.position = "absolute"
            element.style.left = `${x}px`
            element.style.top = `${y}px`

            setActivePiece(element)
            // activePiece = element
        }
    }
    const movePiece = (e: React.MouseEvent) => {
        const chessBoard = chessBoardRef.current
        if (activePiece && chessBoard) {
            const minX = chessBoard.offsetLeft - 25
            const minY = chessBoard.offsetTop - 25
            const maxX = chessBoard.offsetLeft + chessBoard.offsetWidth - 75
            const maxY = chessBoard.offsetLeft + chessBoard.offsetHeight - 175
            const x = e.clientX - 50
            const y = e.clientY - 50
            activePiece.style.position = "absolute"

            if (x < minX) {
                activePiece.style.left = `${minX}px`
            } else if (x > maxX) {
                activePiece.style.left = `${maxX}px`
            } else {
                activePiece.style.left = `${x}px`
            }

            if (y < minY) {
                activePiece.style.top = `${minY}px`
            } else if (y > maxY) {
                activePiece.style.top = `${maxY}px`
            } else {
                activePiece.style.top = `${y}px`
            }
        }
    }
    const dropPiece = (e: React.MouseEvent) => {
        const chessBoard = chessBoardRef.current


        if (activePiece && chessBoard) {
            const x = Math.floor((e.clientX - chessBoard.offsetLeft) / GRID_SIZE)
            const y = Math.abs(Math.ceil((e.clientY - chessBoard.offsetTop - 800) / GRID_SIZE))

            const currentPiece = pieces.find(p => samePotion(p.position, grabPosition))

            if (currentPiece) {
                const validMove = referee.isValidMove(
                    grabPosition,
                    {x, y},
                    currentPiece.type,
                    currentPiece.team,
                    pieces
                )
                const isEnPassantMove = referee.isEnPassantMove(
                    grabPosition,
                    {x, y},
                    currentPiece.type,
                    currentPiece.team,
                    pieces,
                )
                const pawnDirection = currentPiece.team === TeamType.UOR ? 1 : -1

                if (isEnPassantMove) {
                    const updatePieces = pieces.reduce((result, piece) => {
                        if (samePotion(piece.position, grabPosition)) {
                            piece.enPassant = false
                            piece.position.x = x
                            piece.position.y = y
                            result.push(piece)
                        } else if (!(samePotion(piece.position, {x, y: y - pawnDirection}))) {
                            if (piece.type === PiecesType.PAWN) {
                                piece.enPassant = false
                            }
                            result.push(piece)
                        }
                        return result
                    }, [] as PiecesProps[])
                    setPieces(updatePieces)
                } else if (validMove) {
                    const updatePieces = pieces.reduce((results, piece) => {
                        if (samePotion(piece.position, grabPosition)) {
                            piece.enPassant =
                                Math.abs(grabPosition.y - y) === 2 &&
                                piece.type === PiecesType.PAWN
                            piece.position.x = x
                            piece.position.y = y

                            let promotionRow = (piece.team === TeamType.UOR) ? 7 : 0
                            if (y === promotionRow && piece.type === PiecesType.PAWN) {
                                modelRef.current?.classList.remove(s.pawn_promotion_model__hidden)
                                setPromotion(piece)
                            }
                            results.push(piece)
                        } else if (!(samePotion(piece.position, {x, y}))) {
                            if (piece.type === PiecesType.PAWN) {
                                piece.enPassant = false
                            }
                            results.push(piece)
                        }
                        return results
                    }, [] as PiecesProps[])
                    setPieces(updatePieces)
                } else {
                    activePiece.style.position = "relative"
                    activePiece.style.removeProperty("top")
                    activePiece.style.removeProperty("left")
                }

            }

            setActivePiece(null)
        }
    }
    let board = []
    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            const number = j + i + 2
            const piece = pieces.find(p => samePotion(p.position, {x: i, y: j}))
            let image = piece ? piece.image : ''

            board.push(<Tile key={`${i},${j}`} image={image} number={number}/>)
        }
    }

    const promotePawn = (piecesType: PiecesType) => {
        if (promotion === undefined) return
        const updatePieces = pieces.reduce((results, piece) => {
            if (samePotion(piece.position, promotion.position)) {
                piece.type = piecesType
                const teamType = (piece.team === TeamType.UOR) ? "w" : "b"
                let image: string = ""
                switch (piecesType) {
                    case PiecesType.ROOK:
                        image = "rook"
                        break
                    case PiecesType.PAWN:
                        image = "pawn"
                        break
                    case PiecesType.BISHOP:
                        image = "bishop"
                        break
                    case PiecesType.KNIGHT:
                        image = "knight"
                        break
                    case PiecesType.KING:
                        image = "king"
                        break
                    case PiecesType.QUEEN:
                        image = "queen"

                }
                piece.image = `assets/${image}_${teamType}.svg`
                // piece.image =
            }
            results.push(piece)
            return results
        }, [] as PiecesProps[])
        setPieces(updatePieces)
        modelRef.current?.classList.add(s.pawn_promotion_model__hidden)
    }
    const promotionTeamType = () => {
        return (promotion?.team === TeamType.UOR) ? "w" : "b"
    }

    return (
        <>
            <div ref={modelRef} className={clsx([s.pawn_promotion_model, s.pawn_promotion_model__hidden])  }>
                <div className={s.model_body}>
                    <img onClick={() => promotePawn(PiecesType.BISHOP)} src={`/assets/bishop_${promotionTeamType()}.svg`} alt="img"/>
                    <img onClick={() => promotePawn(PiecesType.ROOK)} src={`/assets/rook_${promotionTeamType()}.svg`} alt="img"/>
                    <img onClick={() => promotePawn(PiecesType.KNIGHT)} src={`/assets/knight_${promotionTeamType()}.svg`} alt="img"/>
                    <img onClick={() => promotePawn(PiecesType.KING)} src={`assets/king_${promotionTeamType()}.svg`} alt="img"/>
                    <img onClick={() => promotePawn(PiecesType.QUEEN)} src={`/assets/queen_${promotionTeamType()}.svg`} alt="img"/>
                </div>
            </div>
            <div
                onMouseMove={(e) => movePiece(e)}
                onMouseDown={(e) => grabPiece(e)}
                onMouseUp={(e) => dropPiece(e)}
                className={s.chessBoard}
                ref={chessBoardRef}
            >
                {board}
            </div>
        </>
    )
}
export default ChessBoard