import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import { initialMovie } from './UpdateMovie'

const AddMovie = (props) => {
    const [ movie, setMovie ] = useState(initialMovie)
    const { setMovieList } = props
    const { push } = useHistory()


    const handleChanges = (e) => {
        const { name, value } = e.target
        e.persist()

        setMovie({
            ...movie,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post(`http://localhost:5000/api/movies`, movie)
            .then((res) => {
                setMovieList(res.data)
                push('/')
            })
            .catch((err) => {
                alert(`Couldn't post your new movie bud, sorry.`)
            })
    }

    return(
        <div>
            <h2>Add a Movie</h2>
            <form onSubmit={handleSubmit}>
                <label> Title:
                    <input
                    name='title'
                    input='text'
                    value= {movie.title}
                    onChange={handleChanges}
                    >
                    </input>
                </label>
                <label> Director:
                    <input
                    name='director'
                    input='text'
                    value= {movie.director}
                    onChange={handleChanges}
                    >
                    </input>
                </label>
                <label> Metascore:
                    <input
                    name='metascore'
                    input='text'
                    value= {movie.metascore}
                    onChange={handleChanges}
                    >
                    </input>
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddMovie