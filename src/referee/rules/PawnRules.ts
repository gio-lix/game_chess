import {PiecesProps, Position, TeamType} from "../../constants";
import {tileIsOccupiedByOpponent, tilesIsOccupied} from "./GeneralRules";

export const pawnMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: PiecesProps[]): boolean => {
    const specialRow = (team === TeamType.UOR) ? 1 : 6
    const pawnDirection = (team === TeamType.UOR) ? 1 : -1


    // movement logic
    if (initialPosition.x === desiredPosition.x && initialPosition.y === specialRow && desiredPosition.y - initialPosition.y === 2 * pawnDirection) {
        if (
            !tilesIsOccupied(desiredPosition, boardState)
            && !tilesIsOccupied({x: desiredPosition.x, y: desiredPosition.y - pawnDirection}, boardState)
        ) {
            return true
        }
    } else if (initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === pawnDirection) {
        if (!tilesIsOccupied(desiredPosition, boardState)) {
            return true
        }
    }
    // attack logic
    else if (desiredPosition.x - initialPosition.x === -1 && desiredPosition.y - initialPosition.y === pawnDirection) {
        //    attack left
        if (tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
            return true
        }
    } else if (desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === pawnDirection) {
        //    attack right
        if (tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
            return true
        }
    }
    return false
}

