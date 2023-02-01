import React from 'react';
import styles from './Joke.module.css'
import {useAppDispatch, useAppSelector} from "../../app/store";
import { getJoke} from "./jokeReducer";
import {CheckboxFilter} from "../../common/CheckboxFilter/CheckboxFilter";
import {Button} from "@mui/material";

export const Joke = () => {

    const joke = useAppSelector(state => state.joke.joke)
    const messageError=useAppSelector(state => state.joke.message)
    const dispatch = useAppDispatch()
    const category=useAppSelector(state => state.joke.category)
    const background:any={
        Programming:'https://toggl.com/blog/wp-content/uploads/2014/12/01-excited-programmer-comic.png',
        Misc:'https://image.spreadshirtmedia.net/image-server/v1/mp/products/T1459A839PA4459PT28D160538219W8333H10000/views/1,width=800,height=800,appearanceId=839,backgroundColor=F2F2F2/awokado-butt-po-popo-vegan-funny-gift-naklejka.jpg',
        Dark:'https://i.etsystatic.com/33496961/r/il/8c2a35/3649222081/il_570xN.3649222081_om7d.jpg',
        Pun:'https://cdn.dribbble.com/users/4063351/screenshots/16033242/media/3d3a0377c00f4f82755b22c2e45adc37.jpeg?compress=1&resize=400x300',
        Spooky:'https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/Ijz8GLqHuxA1CqG4Gsaf_-ilxdw=/1660x934/filters:focal(1965x1525:1975x1515):no_upscale()/cloudfront-us-east-1.images.arcpublishing.com/dmn/BUCBSDSMMVFX7OIOVB3ZHMWRCQ.jpg',
        Christmas:'https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY4OTA4MzI0ODc4NjkwMDAw/christmas-tree-gettyimages-1072744106.jpg',
        default:'https://thumbs.dreamstime.com/z/no-found-symbol-unsuccessful-search-vecotr-upset-magnifying-glass-cute-not-zoom-icon-suitable-results-oops-page-failure-122786031.jpg'
    }

    const getJokeHandler=() => {
        dispatch(getJoke())
    }
    return (
        <div className={styles.container}>
            <fieldset className={styles.filterBlock}>
                <legend>CATEGORY</legend>
                <CheckboxFilter label={"Programming"}/>
                <CheckboxFilter label={"Misc"}/>
                <CheckboxFilter label={"Dark"}/>
                <CheckboxFilter label={"Pun"}/>
                <CheckboxFilter label={"Spooky"}/>
                <CheckboxFilter label={"Christmas"}/>
                <CheckboxFilter label={"Any"}/>
            </fieldset>
            <fieldset className={styles.filterBlock}>
                <legend>FILTER</legend>
                <CheckboxFilter flag= {"nsfw"}/>
                <CheckboxFilter flag={"religious"}/>
                <CheckboxFilter flag={"political"}/>
                <CheckboxFilter flag={"racist"}/>
                <CheckboxFilter flag={"sexist"}/>
                <CheckboxFilter flag={"explicit"}/>
            </fieldset>
            <Button onClick={getJokeHandler}
            variant="contained">
                get JOKE
            </Button>
            <div className={styles.jokeBlock} >
                <img src={category && category!=='Any'?background[category]:background.default} alt="0"/>
                {joke}
            </div>
            {
                messageError &&
                <div>
                    {messageError}
                </div>
            }
        </div>
    );
};

