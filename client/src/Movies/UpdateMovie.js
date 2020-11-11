import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

export const initialMovie = {
    id: 0,
    title: '',
    director: '',
    metascore: 0,
    stars: []
}

const UpdateMovie = (props) => {
    const [ updatedMovie, setUpdatedMovie ] = useState(initialMovie)
    const { movieList, setMovieList } = props
    const { push } = useHistory()
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                setUpdatedMovie(res.data)
            })
            .catch((err) => {
                alert(`Sorry bud, couldn't grab the movie to update.`)
            })
    }, [])

    const handleChanges = (e) => {
        const { name, value } = e.target
        e.persist()

        setUpdatedMovie({
            ...updatedMovie,
            [name]: value
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
            .then((res) => {
                const updatedMovie = res.data
                setMovieList(movieList.map((movie) => {
                    if(movie.id === updatedMovie.id) {
                        return updatedMovie
                    } else {
                        return movie
                    }
                }))
                push('/')
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    return(
        <div>
            <h2>Update</h2>
            <form onSubmit={handleUpdate}>
                <label> Title:
                    <input
                    name='title'
                    input='text'
                    value= {updatedMovie.title}
                    onChange={handleChanges}
                    >
                    </input>
                </label>
                <label> Director:
                    <input
                    name='director'
                    input='text'
                    value= {updatedMovie.director}
                    onChange={handleChanges}
                    >
                    </input>
                </label>
                <label> Metascore:
                    <input
                    name='metascore'
                    input='text'
                    value= {updatedMovie.metascore}
                    onChange={handleChanges}
                    >
                    </input>
                </label>
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie