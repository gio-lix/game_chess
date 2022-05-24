import {FC} from "react";
import clsx from 'clsx';
import s from "./Tile.module.scss"

interface TileProps {
    image?: string
    number: number
}

const Tile:FC<TileProps> = ({number, image}) => {
    if (number % 2 == 0) {
        return (
            <div className={clsx([s.title,s.title_black])}>
                {image && <div className={s.title_chess_piece} style={{backgroundImage: `url(${image})`}}> </div>}

            </div>
        )
    } else {
        return (
            <div className={clsx([s.title,s.title_white])}>
                {image && <div className={s.title_chess_piece} style={{backgroundImage: `url(${image})`}}> </div>}
            </div>
        )
    }

}
export default Tile