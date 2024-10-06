import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        populateBlogsData()
    }, [])

    const onBlogUpdate = (id) => {
        navigate('/update/'+id) 
    }

    const onBlogDelete = (id) => {
        navigate('/delete/'+id) 
    }

    const populateBlogsData = () => {
        axios.get("http://localhost:5152/api/blogs").then(result => {
            const blogs = result.data
            setBlogs(blogs)
            setLoading(false)
            setFailed(false)
            setError('')
        }).catch(error => {
            setBlogs([])
            setLoading(false)
            setFailed(true)
            setError('Blogs could not be loaded!')
        })
    }

    const renderAllBlogsTable = (blogs) => {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Date Created</th>
                        <th>Date Updated</th>
                        <th>Author</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        blogs.map(blog => (
                            <tr key={blog.id}>
                                <td>{blog.title}</td>
                                <td>{blog.content}</td>
                                <td>{new Date(blog.dateCreated).toISOString().slice(0,10)}</td>
                                <td>{blog.dateUpdated ? new Date(blog.dateUpdated).toISOString().slice(0,10) : '-'}</td>
                                <td>{blog.author}</td>
                                <td>
                                    <div className='form-group'>
                                        <button onClick={() => onBlogUpdate(blog.id)} className='btn btn-success'>Update</button>
                                    </div>
                                    <div className='form-group'>
                                        <button onClick={() => onBlogDelete(blog.id)} className='btn btn-danger'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        )
    }

    let content = loading ? (
        <p>
            <em>Loading...</em>
        </p>
    ) : ( failed ? (
        <div className='text-danger'>
            <em>{error}</em>
        </div>
    ) : (
        renderAllBlogsTable(blogs))
    )

    return (
        <div>
            <h1>All blogs</h1>
            <p>Here you can see all blogs</p>
            {content}
        </div>
    )
}

export default Blogs