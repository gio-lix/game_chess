import {PiecesProps, Position, TeamType} from "../../constants";
import {tileIsEmptyOrOccupiedByOpponent} from "./GeneralRules";

export const knightMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: PiecesProps[]): boolean => {
    for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
            //top side movement
            if (desiredPosition.y - initialPosition.y === 2 * i) {
                if (desiredPosition.x - initialPosition.x === j) {
                    if (tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                        return true
                    }
                }

            }
            // right side movement
            if (desiredPosition.x - initialPosition.x === 2 * i) {
                if (desiredPosition.y - initialPosition.y === j) {
                    if (tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)) {
                        return true
                    }
                }
            }
        }
    }
    return false
}
