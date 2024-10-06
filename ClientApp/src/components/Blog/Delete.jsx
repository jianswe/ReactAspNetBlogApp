import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Delete = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [dateCreated, setDateCreated] = useState()
    const [dateUpdated, setDateUpdated] = useState()

    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5152/api/blogs/${id}`).then(result => {
            const blog = result.data
            setTitle(blog.title)
            setContent(blog.content)
            setDateCreated(new Date(blog.dateCreated).toISOString().slice(0,10))
            setDateUpdated(blog.dateUpdated ? new Date(blog.dateUpdated).toISOString().slice(0,10) : null)
        })
    }, [])

    const onCancel = (e) => {
        navigate('/blogs')
    }

    const onConfirmation = (e) => {
        axios.delete(`http://localhost:5152/api/blogs/${id}`).then(result => {
            navigate('/blogs')
        })
    }

    return (
      <div style={{ marginTop: 10 }}>
        <h2>Delete blog confirmation</h2>

        <div class="card">
          <div class="card-body">
            <h4 class="card-title"> {title} </h4>
            <p class="card-text"> {content} </p>
            <button onClick={onCancel} class="btn btn-default">
              Cancel
            </button>
            <button onClick={onConfirmation} class="btn btn-danger">
              Confirm
            </button>
          </div>
        </div>
      </div>
    )
}

export default Delete