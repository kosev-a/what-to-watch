import React from "react";
import FilmList from "../../ui/film-list/film-list";
import PropTypes from "prop-types";
import filmProp from "../../ui/card/card.prop";

function MyList(props) {
    const { films } = props;
    return (
        <React.Fragment>
            <div className="user-page__list">
                <p className="page-title user-page__title my-list__title">
                    My list
                </p>

                <section className="catalog">
                    <h2 className="catalog__title visually-hidden">Catalog</h2>
                    {<FilmList films={films} />}
                </section>
            </div>
        </React.Fragment>
    );
}

MyList.propTypes = {
    films: PropTypes.arrayOf(filmProp).isRequired,
};

export default MyList;
