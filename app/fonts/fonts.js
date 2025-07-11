import localFont from "next/font/local";


export const cairo = localFont({
    src: [
        {
            path: "./Cairo/Cairo-VariableFont_slnt,wght.ttf",
            weight: "100 900",
            style: "normal"
        },
    ],
    variable: "--font-cairo",
    display: "swap"
});

export const El_Messiri = localFont({
    src: [
        {
            path: "./El_Messiri/ElMessiri-VariableFont_wght.ttf",
            weight: "100 900",
            style: "normal"
        },
    ],
    variable: "--font-El_Messiri",
    display: "swap"
});

export const Scheherazade = localFont({
    src: [
        {
            path: "./Scheherazade_New/ScheherazadeNew-Regular.ttf",
            weight: "400",
            style: "normal"
        },
    ],
    variable: "--font-Scheherazade_New",
    display: "swap"
});