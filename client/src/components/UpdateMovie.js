import React, {useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovie = props => {
const [movie, setMovie] = useState({
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
})

useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res => setMovie(res.data))
}, [])

const handleChange = event => {
    setMovie({...movie, [event.target.name]: event.target.value})
}

const handleSubmit = event => {
    event.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
    .then(res => {
        // console.log(res);
        props.history.push("/");
    })
    .catch(err => console.log(err.response));
}

console.log('UpdateMovie', props);

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title
                <input
                    name="title"
                    placeholder="Title"
                    value={movie.title}
                    onChange={event => handleChange(event)}
                />
            </label>
            <label>
                Director
                <input
                    name="director"
                    placeholder="Director"
                    value={movie.director}
                    onChange={handleChange}
                />
            </label>
            <label>
                Metascore
                <input
                    name="metascore"
                    placeholder="Metascore"
                    value={movie.metascore}
                    onChange={handleChange}
                />
            </label>
            <label>
                Stars
                <input
                    name="stars"
                    placeholder="Stars"
                    value={movie.stars}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    )
}

export default UpdateMovie;