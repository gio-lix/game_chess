import {PiecesProps, PiecesType, Position,  TeamType} from "../constants";
import {bishopMove, kingMove, knightMove, pawnMove, queenMove, rookMove} from "./rules";


export default class Referee {
    isEnPassantMove(
        initialPosition: Position,
        desiredPosition: Position,
        type: PiecesType,
        team: TeamType,
        boardState: PiecesProps[]
    ) {
        const pawnDirection = team === TeamType.UOR ? 1 : -1

        if (type === PiecesType.PAWN) {
            if ((desiredPosition.x - initialPosition.x === -1 || desiredPosition.x - initialPosition.x === 1) && desiredPosition.y - initialPosition.y === pawnDirection) {
                const piece = boardState.find(
                    p => p.position.x === desiredPosition.x
                        && p.position.y === desiredPosition.y - pawnDirection
                        && p.enPassant
                )
                if (piece) {
                    return true
                }
            }
        }
        return false
    }


    isValidMove(
        initialPosition: Position,
        desiredPosition: Position,
        type: PiecesType,
        team: TeamType,
        boardState: PiecesProps[]
    ) {
        let validMove = false
        switch (type) {
            case PiecesType.PAWN:
                validMove = pawnMove(initialPosition, desiredPosition, team, boardState)
                break
            case PiecesType.KNIGHT:
                validMove = knightMove(initialPosition, desiredPosition, team, boardState)
                break
            case PiecesType.BISHOP:
                validMove = bishopMove(initialPosition, desiredPosition, team, boardState)
                break
            case PiecesType.ROOK:
                validMove = rookMove(initialPosition, desiredPosition, team, boardState)
                break
            case PiecesType.QUEEN:
                validMove = queenMove(initialPosition, desiredPosition, team, boardState)
                break
            case PiecesType.KING:
                validMove = kingMove(initialPosition, desiredPosition, team, boardState)

        }
        return validMove

    }
}