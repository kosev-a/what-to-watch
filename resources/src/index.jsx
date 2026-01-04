import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./components/app/app";
import films from "./mocks/films";
// import reviews from "./mocks/review";

const nameFilm = "The Grand Budapest Hotel";
const genreFilm = "Drama";
const yearFilm = 2014;
const apiUrl = import.meta.env.VITE_APP_URL;
const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App
                films={films}
                // reviews={reviews}
                name={nameFilm}
                genre={genreFilm}
                year={yearFilm}
                apiUrl={apiUrl}
            />
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
