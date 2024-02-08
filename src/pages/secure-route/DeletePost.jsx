import React, { useEffect } from 'react'
import Swal from 'sweetalert2';
import Dashboard from '../Dashboard';
import { deletePost } from '../../services/PostDataService';
import {useNavigate, useParams } from 'react-router-dom';

const DeletePost = () => {
  const {userId} = useParams();
  const {postId} = useParams();
  const navigate = useNavigate();

  /* Show Alert Box Message For Confirm Operation */
  const showConfirmBox = ()=> {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // FIRE
        deletePost(postId).then((response)=>{
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          navigate(`/user/myposts/${userId}`)
          return;
        }).catch((error)=> {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Something Wrong! Your Posts is Not Deleted!)",
            icon: "error"
          });
          navigate(`/user/myposts/${userId}`)
          return;
        })  
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Posts is safe :)",
            icon: "error"
          });
        navigate(`/user/myposts/${userId}`)
        return;
      }
    });
  }


  useEffect(()=>{
    showConfirmBox()
  } ,[])

  return (
    <>
      <Dashboard />
    </>
  )
}

export default DeletePost
