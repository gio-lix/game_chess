import {PiecesProps, Position, TeamType} from "../../constants";
import {tileIsEmptyOrOccupiedByOpponent, tilesIsOccupied} from "./GeneralRules";

export const bishopMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: PiecesProps[]): boolean => {
    //  moving logic
    for (let i = 1; i < 8; i++) {
        if (desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
            let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y + i}
            if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                    return true
                }
            } else {
                if (tilesIsOccupied(passedPosition, boardState)) {
                    break
                }
            }
        }


        // bottom right movement
        if (desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
            let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y - i}
            if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                    return true
                }
            } else {
                if (tilesIsOccupied(passedPosition, boardState)) {
                    console.log("illegal move -> ")
                    break;
                }
            }

        }

        if (desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
            let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y - i}
            if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                    return true
                }
            } else {
                if (tilesIsOccupied(passedPosition, boardState)) {
                    break
                }
            }
        }
        if (desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
            let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y + i}
            if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
                    return true
                }
            } else {
                if (tilesIsOccupied(passedPosition, boardState)) {
                    break
                }
            }
        }

    }
    return false
}
