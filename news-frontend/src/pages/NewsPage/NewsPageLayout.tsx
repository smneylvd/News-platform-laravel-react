import React, {useEffect} from 'react';

import {Box, Card, CardContent, CardMedia, Typography, useMediaQuery} from '@mui/material';
import {NewsPageHeader} from "@src/pages/NewsPage/components/NewsPageHeader";
import {useNavigate} from "react-router-dom";
import {fetchNews} from "@src/store/diplomas/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {selectNewsList} from "@src/store/diplomas/selectors";
import styles from "./NewsPage.module.css";
import diplomaTemplate from "@src/assets/example/diploma_template.jpg";
import {handleLink} from "@src/utils/link";
import {humanReadableToLocalTime} from "@src/utils/functions";

export const NewsPageLayout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const newsList = useSelector(selectNewsList);
    useEffect(() => {
        if (!newsList.length) {
            dispatch(fetchNews());
        }
    }, []);


    return (
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap="0 2rem" pt="2rem">
            <NewsPageHeader/>
            <Box display="flex" flexWrap="wrap" justifyContent="start" gap="0 1rem"
                 className={styles.articlesContainer} width="100%">
                {newsList ? (
                    newsList.map((e: any) => (
                        <Card
                            key={e.counter}
                            elevation={6}
                            onClick={() => handleLink(e.original_source_url!)}
                            className={styles.article}
                            sx={{
                                cursor: "pointer",
                                borderRadius: "10px",
                                marginBottom: "1.5rem"
                            }}
                        > <CardMedia
                            key={e.counter + "img"}
                            component="img"
                            className={styles.articleImg}
                            image={e.image_url ?? diplomaTemplate}
                            alt="Article Image"
                        />

                            <Box sx={{display: 'flex', flexDirection: 'column', width: "100%"}}>
                                <CardContent
                                    key={e.counter + "content"}
                                    sx={{flex: '1 0 auto', display: "flex", flexDirection: "column", width: "100%"}}>
                                    <Typography mb='.5rem' fontSize="1.25rem" className={styles.mobText}
                                                fontWeight="600">
                                        {e.title} {e.published_at && "[" + e.published_at.substring(0, 10) + "]"}
                                    </Typography>
                                    <Typography mb='.5rem' fontSize="1rem" className={styles.mobTextSm}>
                                        {e.author ? "Authored: " + e.author : ""}
                                    </Typography>
                                    <Typography mb='.5rem' fontSize="1rem" className={styles.mobTextSm}>
                                        {e.description}
                                    </Typography>
                                    <Typography mt='auto' fontSize="0.875rem" ml="1rem">
                                        {e.source && 'Source: ' + e.source.name}
                                    </Typography>
                                    <Box display='flex' mt='auto' width='100%'>
                                        <Typography fontSize="0.875rem" ml='auto' color="gray">
                                            {e.category && e.category.name}
                                            {/*{e.keywords.map((el: any) => el.name + " ")}*/}
                                        </Typography>
                                    </Box>

                                </CardContent>
                            </Box>
                        </Card>
                    ))
                ) : (
                    <div>Loading...</div>
                )}
            </Box>
        </Box>
    );
};