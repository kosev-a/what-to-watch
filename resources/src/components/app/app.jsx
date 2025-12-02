import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { AppRoute } from "../../const";
import PropTypes from "prop-types";
import Main from "../pages/main/main";
import SignIn from "../pages/signin/signin";
import SignUp from "../pages/signup/signup";
import MyList from "../pages/mylist/mylist";
import Film from "../pages/film/film";
// import Review from "../ui/review/review";
import ReviewForm from "../ui/review-form/review-form";
import EditReviewForm from "../ui/edit-review-form/edit-review-form";
import Player from "../pages/player/player";
import filmProp from "../ui/card/card.prop";
import reviewProp from "../ui/review/review.prop";
import { getFilm, getReviews } from "../../utils/utils";

function App(props) {
    const { films, name, genre, year } = props;
    const [user, setUser] = useState(localStorage.getItem("user")) || null;

    let token = localStorage.getItem("token") || null;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const [avatar, setAvatar] =
        useState(localStorage.getItem("avatar")) || null;
        
    const apiUrl = import.meta.env.VITE_APP_URL;

    const handleLogout = async (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы, хотя формы здесь нет, это хорошая практика для обработчиков

        try {
            const response = await fetch(`${apiUrl}/api/logout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                // Сервер подтвердил выход, теперь очищаем локальные данные
                setUser(null);
                setAvatar(null);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem("avatar");
                token = null;
                // Перенаправляем пользователя
                // window.location.href = '/login';
            } else {
                // Обрабатываем ошибки сервера
                console.error("Ошибка при выходе из системы на сервере");
            }
        } catch (error) {
            console.error("Ошибка сети:", error);
        }
    };

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Main
                        films={films}
                        name={name}
                        genre={genre}
                        year={year}
                        user={user}
                        avatar={avatar}
                        onLogout={handleLogout}
                    />
                </Route>
                <Route path="/login" exact>
                    <SignIn />
                </Route>
                <Route path="/signup" exact component={SignUp} />
                <Route path="/mylist" exact>
                    <MyList films={films} />
                </Route>
                <Route
                    exact
                    path={`${AppRoute.FILM}/:id`}
                    render={(data) => (
                        <Film
                            film={getFilm(films, data.match.params.id)}
                            films={films}
                            // reviews={reviews}
                            user={user}
                            avatar={avatar}
                            onLogout={handleLogout}
                        />
                    )}
                />
                {/* <Route
                    exact
                    path={`${AppRoute.FILM}/:id/review`}
                    render={(data) => (
                        <Review
                            review={getReviews(reviews, data.match.params.id)}
                        />
                    )}
                /> */}
                <Route
                    exact
                    path={`${AppRoute.FILM}/:id/add-review`}
                    render={(data) =>
                        user ? (
                            <ReviewForm
                                film={getFilm(films, data.match.params.id)}
                            />
                        ) : (
                            <Redirect to="/login" />
                        )
                    }
                />
                <Route
                    exact
                    path={`${AppRoute.FILM}/:filmId/review/:id`}
                    // render={(data) =>
                        // user ? (
                            // <EditReviewForm />
                        // ) : (
                        //     <Redirect to="/login" />
                        // )
                    // {/* } */}
                >
                    <EditReviewForm />
                </Route>
                <Route
                    exact
                    path={`${AppRoute.PLAYER}/:id`}
                    render={(data) => (
                        <Player film={getFilm(films, data.match.params.id)} />
                    )}
                />
                <Route
                    render={() => (
                        <Fragment>
                            <h1>
                                404.
                                <br />
                                <small>Page not found</small>
                            </h1>
                            <Link to="/">Go to main page</Link>
                        </Fragment>
                    )}
                />
            </Switch>
        </BrowserRouter>
    );
}

App.propTypes = {
    films: PropTypes.arrayOf(filmProp).isRequired,
    // reviews: PropTypes.arrayOf(reviewProp).isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
};

export default App;
