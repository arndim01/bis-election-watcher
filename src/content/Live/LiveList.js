import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
    Grid,
    Tab,
    Tabs,
    Container,
    Card,   
    Box,
    useTheme,
    styled,
    Typography, ListItem, ListItemAvatar, ListSubheader, List, Avatar, ListItemText
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from "keen-slider/react";
import LiveCaptain from './LiveCaptain';
import LiveCouncilor from './LiveCouncilor';

const applyFilters = (list, filter) => {

    const filtered = list.filter( function(position){
        return position.name == filter;
    });
    return filtered.length > 0? filtered: null;
}

const applyRemoveFilter = (list, filter) => {
    const filtered = list.filter( function(position){
        return position.includes(filter) == -1;
    });
    return filtered.length > 0? filtered: null;
}


function LiveTallyList({list}){

    const filterCaptain = applyFilters(list.barangay.positionlist, "Captain");
    const filterCounsilor = applyFilters(list.barangay.positionlist, "Councilor");
    const filterSkChairman = applyFilters(list.barangay.positionlist, "SK Chairman");
    const filterSKCounsilor = applyFilters(list.barangay.positionlist, "SK Councilor");
    const filterIndependent = applyFilters(list.barangay.positionlist, "Independent");
    const [sliderRef] = useKeenSlider(
        {
          loop: true,
        },
        [
          (slider) => {
            let timeout
            let mouseOver = false
            function clearNextTimeout() {
              clearTimeout(timeout)
            }
            function nextTimeout() {
              clearTimeout(timeout)
              if (mouseOver) return
              timeout = setTimeout(() => {
                slider.next()
              }, 15000)
            }
            slider.on("created", () => {
              slider.container.addEventListener("mouseover", () => {
                mouseOver = true
                clearNextTimeout()
              })
              slider.container.addEventListener("mouseout", () => {
                mouseOver = false
                nextTimeout()
              })
              nextTimeout()
            })
            slider.on("dragStarted", clearNextTimeout)
            slider.on("animationEnded", nextTimeout)
            slider.on("updated", nextTimeout)
          },
        ]
      );

    return(
        <>
            <Box sx={{
                    mt: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>

                        <Avatar sx={{ m:1, height: 80, width: 80}} src="/static/images/watcher/barangay_carreta.png" />
                        <Typography sx={{ padding: 4}} variant="h5" gutterBottom>
                            Barangay {list.barangay.name}
                        </Typography>
                    </Box>

                    <Box>

                        <Box component="div" sx={{m:1}} ref={sliderRef} className="keen-slider">

                            <Box className="keen-slider__slide number-slide1">
                                <LiveCaptain list={filterCaptain} title="Barangay Captain" />
                            </Box>
                            <Box className="keen-slider__slide number-slide1">
                                <LiveCouncilor list={filterCounsilor} title="Barangay Councilor" />
                            </Box>
                            <Box className="keen-slider__slide number-slide1">
                                <LiveCouncilor list={filterIndependent} title="Barangay Councilor" />
                            </Box>
                            <Box className="keen-slider__slide number-slide1">
                                <LiveCaptain list={filterSkChairman} title="SK Chairman" />
                            </Box>
                            <Box className="keen-slider__slide number-slide1">
                                <LiveCouncilor list={filterSKCounsilor} title="SK Councilor" />
                            </Box>
                            
                        </Box>
                    </Box>
                    
                </Box>
        </>
    );
}

export default LiveTallyList;

