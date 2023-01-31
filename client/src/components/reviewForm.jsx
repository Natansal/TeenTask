import React, { useContext, useState } from 'react';
import { UserContext } from '../App';
import serverAdress from '../serverAdress';

function ReviewForm() {
    const {userContext} = useContext(UserContext)
    const [formData, setFormData] = useState({
        description: '',
        rating: ''
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${serverAdress}/reviews`, {
            method: 'POST',

        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={255}
            />
            <span>{255 - formData.description.length} characters remaining</span>
            <select name="rating" value={formData.rating} onChange={handleChange}>
                <option value="">Select a rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
}

export default ReviewForm;