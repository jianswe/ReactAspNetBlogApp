import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Create = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [dateCreated, setDateCreated] = useState(new Date());
    const [dateUpdated, setDateUpdated] = useState(new Date());

    const navigate = useNavigate();  // useNavigate replaces history.push in v6

    const onSubmit = (e) => {
        e.preventDefault()
        
        let blogObject = {
            title, 
            content,
            dateCreated,
            dateUpdated,
            author: 'johndoe'
        }
        axios.post("http://localhost:5152/api/blogs", blogObject).then(result => {
            navigate('/blogs') 
        })
    }

    return (
        <div className="trip-form" >
            <h3>Add new blog</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Blog title:  </label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        />
                </div>
                <div className="form-group">
                    <label>Blog content: </label>
                    <textarea 
            type="text" 
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="row">
                    <div className="col col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                            <label>Date created:  </label>
                            <input 
                                type="date" 
                                className="form-control" 
                                value={dateCreated}
                                onChange={(e) => setDateCreated(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col col-md-6 col-sm-6 col-xs-12">
                        <div className="form-group">
                        <label>Date updated:  </label>
                        <input 
                            type="date" 
                            className="form-control" 
                            value={dateUpdated}
                            onChange={(e) => setDateUpdated(e.target.value)}
                        />
                        </div>
                    </div>
                </div>
                
                <div className="form-group">
                    <input type="submit" value="Add trip" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}

export default Create