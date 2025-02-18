import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn ? `${authState.user.name}'s tasks` : "Task Manager";
  }, [authState]);



  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className='bg-primary text-white h-[40vh] py-8 text-center'>
            <h1 className='text-2xl'> Welcome to Task Manager App</h1>
            <Link to="/signup" className='mt-10 text-xl block space-x-2 hover:space-x-4'>
              <span className='transition-[margin]'>Join now to manage your tasks</span>
              <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right"></i></span>
            </Link>
          </div>
        ) : (
          <>
            <h1 className='text-lg mt-8 mx-8 border-b border-b-gray-300'>Welcome {authState.user.name}</h1>
            <Tasks />
          </>
        )}
      </MainLayout>
    </>
  )
}

export default Home






/* import React from 'react';
import TaskTable from '../components/task/taskTable';

const Home = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Bienvenue dans l'application de gestion des tâches</h1>
            <TaskTable />
        </div>
    );
};

export default Home;
 */