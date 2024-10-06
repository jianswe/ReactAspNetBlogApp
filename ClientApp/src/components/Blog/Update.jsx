import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [dateCreated, setDateCreated] = useState(new Date());
    const [dateUpdated, setDateUpdated] = useState(new Date());
    
    const {id} = useParams()
    const navigate = useNavigate();  // useNavigate replaces history.push in v6

    useEffect(() => {
        axios.get(`http://localhost:5152/api/blogs/${id}`).then(result => {
            const blog = result.data
            setTitle(blog.title)
            setContent(blog.content)
            setDateCreated(new Date(blog.dateCreated).toISOString().slice(0,10))
            setDateUpdated(blog.dateUpdated ? new Date(blog.dateUpdated).toISOString().slice(0,10) : null)
        })
    }, [])

    const onUpdateCancel = () => {
        navigate('/blogs') 
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        let blogObject = {
            id,
            title, 
            content,
            dateCreated: new Date(dateCreated).toISOString(),
            dateUpdated: dateUpdated ? new Date(dateUpdated).toISOString() : null,
            author: 'johndoe'
        }
        axios.put(`http://localhost:5152/api/blogs/${id}`, blogObject).then(result => {
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
                    <button onClick={onUpdateCancel} className='btn btn-default'>Cancel</button>
                    <button type="submit" className='btn btn-success'>Update</button>
                </div>
            </form>
        </div>
    )
}

export default Update