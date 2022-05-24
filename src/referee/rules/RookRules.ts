import {PiecesProps, Position, TeamType} from "../../constants";
import {tileIsEmptyOrOccupiedByOpponent, tilesIsOccupied} from "./GeneralRules";

export const rookMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: PiecesProps[]): boolean => {
    if (initialPosition.x === desiredPosition.x) {
        console.log("moving vertically")
        for (let i = 1; i < 8; i++) {
            let multiplier = (desiredPosition.y < initialPosition.y) ? -1 : 1
            let passedPosition: Position = {x: initialPosition.x, y: initialPosition.y + (i * multiplier)}
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
    if (initialPosition.y === desiredPosition.y) {
        console.log("moving horizontally")
        for (let i = 1; i < 8; i++) {
            let multiplier = (desiredPosition.x < initialPosition.x) ? -1 : 1
            let passedPosition: Position = {x: initialPosition.x + (i * multiplier), y: initialPosition.y}
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
