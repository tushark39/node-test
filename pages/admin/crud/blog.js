import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BlogCreate from '../../../components/crud/BlogCreate';
import {useEffect} from 'react';
import Link from 'next/link';
const Blog = () =>{
    const rel = () =>{
        if(localStorage.getItem('executed')===undefined){
            window.location.reload();
            localStorage.setItem('executed',true);
        }
    }
    useEffect(()=>{
        rel()
    },[])

    return(
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Create a new Blog</h2>
                        </div>
                        <div className="col-md-12">
                            <BlogCreate/>
                        </div>
                        
                    </div>
                </div>
            </Admin>            
        </Layout>
    )
}

export default Blog;