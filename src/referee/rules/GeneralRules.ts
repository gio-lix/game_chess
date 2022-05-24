import {PiecesProps, Position, samePotion, TeamType} from "../../constants";

export const tileIsEmptyOrOccupiedByOpponent = (position: Position, boardState: PiecesProps[], team: TeamType) => {
    return !tilesIsOccupied(position, boardState) || tileIsOccupiedByOpponent(position, boardState, team)
}

export const tilesIsOccupied = (position: Position, boardState: PiecesProps[]): boolean => {
    const piece = boardState.find(p => samePotion(p.position, position))
    if (piece) {
        return true
    } else {
        return false
    }
}

export const tileIsOccupiedByOpponent = (
    position: Position,
    bordState: PiecesProps[],
    team: TeamType): boolean => {
    const piece = bordState.find((p) => samePotion(p.position, position) && p.team !== team)

    if (piece) {
        return true
    } else {
        return false
    }
}