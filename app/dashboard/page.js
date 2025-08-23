"use client"
import * as React from 'react';
import { useState, useEffect } from "react";
import Link from "next/link";
import { CustomTabPanel, a11yProps } from "../  components/tabs/CustomTabPanel";
import Loading from '../  components/Basic_Components/Loading';
import ErrorLoading from '../  components/Basic_Components/ErrorLoading';
import StoryMap from './storyMapAdmin';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import URL from '../URL';
import axios from 'axios';
import '../  components/main/last_sotries/lastStories.css'
import Header from '../  components/Basic_Components/stories/Header';
import Head from 'next/head';
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const dashboard = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // قصص منفصلة لكل تبويب
    const [stories, setStories] = useState({
        published: [],
        pending: [],
        rejected: []
    });

    const [limit] = useState(5);
    const [page, setPage] = useState({
        published: 1,
        pending: 1,
        rejected: 1
    });

    const [hasMore, setHasMore] = useState({
        published: true,
        pending: true,
        rejected: true
    });

    const [loading, setLoading] = useState({
        published: false,
        pending: false,
        rejected: false
    });

    const [error, setError] = useState({
        published: false,
        pending: false,
        rejected: false
    });

    // علم إذا التبويب جلب بياناته مرة واحدة على الأقل
    const [fetchedOnce, setFetchedOnce] = useState({
        published: false,
        pending: false,
        rejected: false,
    });

    // ربط التبويبات مع الحالات
    const tabs = ["published", "pending", "rejected"];

    useEffect(() => {
        const tab = tabs[value];

        async function fetchData() {
            if (loading[tab] || !hasMore[tab]) return;

            setLoading(prev => ({ ...prev, [tab]: true }));

            try {
                const res = await axios.get(`${URL}api/stories?limit=${limit}&page=${page[tab]}&state=${tab}` );
                const newStories = await res.data.storiesRaw;

                setStories(prev => {
                    const existingIds = new Set(prev[tab].map(s => s._id));
                    const uniqueStories = newStories.filter(s => !existingIds.has(s._id));
                    return { ...prev, [tab]: [...prev[tab], ...uniqueStories] };
                });

                const totalPages = res.data.totalPages;
                if (page[tab] >= totalPages || newStories.length === 0) {
                    setHasMore(prev => ({ ...prev, [tab]: false }));
                }

                setError(prev => ({ ...prev, [tab]: false }));
            } catch (err) {
                if (err.message === "Network Error") {
                    setError(prev => ({ ...prev, [tab]: true }));
                } else {
                    setHasMore(prev => ({ ...prev, [tab]: false }));
                }
            } finally {
                setLoading(prev => ({ ...prev, [tab]: false }));
                setFetchedOnce(prev => ({ ...prev, [tab]: true })); // ✔️ علمنا أنه جلب بيانات
            }
        }

        fetchData();
    }, [value, page.published, page.pending, page.rejected]);

    // Infinite scroll لكل تبويب
    useEffect(() => {
        const handleScroll = () => {
            const tab = tabs[value];
            const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
            if (scrollBottom && !loading[tab] && hasMore[tab]) {
                setPage(prev => ({ ...prev, [tab]: prev[tab] + 1 }));
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [value, hasMore, loading]);


    return (
        <>

              <Head>
                <title>صفحة القصص</title>
                <meta
                  name="description"
                  content="صفحة تعرض كل القصص المتاحة على الموقع"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                
              </Head>
            {/* Header */}
            <Header path={"/"}/>

            {/* Body */}
            <div className="!pt-[90px] !pb-16 flex items-center justify-center w-full">
                <div className="container !flex-col !gap-5 max-w-5xl mx-auto !px-4 !flex items-center !justify-center">
                    

                    {/* Tabs */}
                    <div className="bg-[var(--second-color)] rounded-2xl shadow-lg !p-6 !space-y-8 !w-full">
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="!w-full flex items-center justify-center">
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="المنشورات" {...a11yProps(0)} />
                                <Tab label="قيد المراجعة" {...a11yProps(1)} />
                                <Tab label="تم الرفض" {...a11yProps(2)} />
                            </Tabs>
                        </Box>

                        {tabs.map((tab, index) => (
                            <CustomTabPanel key={tab} value={value} index={index} className="!w-full flex items-center justify-center">
                                <StoryMap stories={stories[tab]} isOwner={false} state={tab} />

                                {loading[tab] && (<Loading />)}

                                {error[tab] && (
                                    <ErrorLoading onClick={() => {
                                        setError(prev => ({ ...prev, [tab]: false }));
                                        setLoading(prev => ({ ...prev, [tab]: false }));
                                        setHasMore(prev => ({ ...prev, [tab]: true }));
                                        setPage(prev => ({ ...prev, [tab]: 1 }));
                                        setStories(prev => ({ ...prev, [tab]: [] }));
                                    }} />
                                )}

                                {!loading[tab] && !error[tab] && stories[tab].length === 0 && (
                                    <p>لا توجد أي قصة.</p>
                                )}

                                {hasMore[tab] === false && stories[tab].length > 0 && (
                                    <span className="text-center">لا توجد قصص اضافية حاليًا.</span>
                                )}
                            </CustomTabPanel>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default dashboard