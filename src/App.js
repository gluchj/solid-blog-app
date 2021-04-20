import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { 
  useSession,
} from '@inrupt/solid-ui-react'
import MyPosts from './components/MyPosts'
import Post from './components/Post'
import FriendPost from './components/FriendPost'
import Navbar from './components/layout/Navbar'
import Header from './components/layout/Header'
import NavButtons from './components/layout/NavButtons'
import Login from './components/Login'
import AddPost from './components/AddPost'
import SearchPosts from './components/SearchPosts'
import Error404 from './components/pages/Error404'
import BlogState from './context/BlogState'
import './App.css';

/************************************************************
 * App is the parent component for this application. It wraps
 * all others including the apps context, routing component,
 * and all UI components
 ************************************************************/
function App() {
  const { session } = useSession()

  return (
    <BlogState>
      <Router basename="/blog.site">
        <Navbar/>
        <div className="App">
          <Header/>
          {session.info.isLoggedIn ? (
            <div>
              <NavButtons/>
              <Switch>
                <Route exact path='/' component={MyPosts} />
                <Route exact path='/post/:id' component={Post} />
                <Route exact path='/friend_post/:id' component={FriendPost} />
                <Route exact path='/add_post' component={AddPost} />
                <Route exact path="/search_posts" component={SearchPosts} />
                <Route component={Error404} />
              </Switch>
            </div>
          ) : (
            <Login/>
          )}
        </div>
      </Router>
    </BlogState>
  );
}

export default App;