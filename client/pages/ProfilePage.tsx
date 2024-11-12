import { useState, useEffect } from "react";
import { UserData } from "../src/interfaces/UserData";
import { PlaylistData } from "../src/interfaces/PlaylistData";
import { retrieveUser, deleteUser } from "../src/api/userAPI";
import UserCard from "../src/components/UserCard";
import { useLocation } from "react-router-dom";
import { ApiMessage } from "../src/interfaces/ApiMessage";
import auth from "../src/utils/auth";
// import { ToastContainer, toast } from 'react-toastify';
import { retrievePlaylistsByUserId, deletePlaylist } from "../src/api/playlistAPI";
import PlayListCard from "../src/components/PlaylistCard";
import { NavLink } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState<UserData>();
  const [savedPlaylists, setPlaylists] = useState<PlaylistData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, []);

  const { state } = useLocation();

  const fetchUser = async (userId: number) => {
    try {
      const data = await retrieveUser(userId);
      setUser(data);
    }
    catch (err) {
      console.error('Failed to retrieve user:', err);
      setError(true);
    }
  }

  const fetchPlaylists = async (userId: number) => {
    try {
      const data = await retrievePlaylistsByUserId(userId);
      if (data) {
        setPlaylists(data);
        console.log("I am trying to fetch the playlists" + JSON.stringify(savedPlaylists));
      }
    } catch (err) {
      console.error('Failed to retrieve the Playlists:', err);
      // setError(true);
    }
  };

  useEffect(() => {
    if (auth.loggedIn()) {
      const profile = auth.getProfile();

      if (profile && profile.id) { // Assuming profile contains the user ID
        console.log("verifying that profile auth.getprofile works");
        fetchUser(profile.id);
        fetchPlaylists(profile.id);
      }
      else {
        console.error('No user ID found in profile');
        setError(true);
      }
    }
  }, [loginCheck]);

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const deleteIndvUser = async (userId: number): Promise<ApiMessage> => {
    try {

      const data = await deleteUser(userId);

      // Wait for 5 seconds
      await wait(5000); // 5000 milliseconds = 5 seconds

      auth.logout();
      fetchUser(state);

      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };


  const deleteSingleList = async (playListId: number): Promise<ApiMessage> => {
    try {

      const data = await deletePlaylist(playListId);

      // Wait for 5 seconds
      await wait(5000); // 5000 milliseconds = 5 seconds
      setPlaylists(prev => prev.filter(playlist =>
        playlist.id !== playListId)); // Update state to remove deleted playlist

      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  if (error) {
    return (
      <section>
        <h1>404: Profile page is this</h1>
      </section>
    );
  }
  else {
    return (
      <div className='user-list container-fluid card-margin mx-auto p-3 w-100'>
        {user ? (
          <div>
            <div className="container-fluid card w-100 d-flex">
              <UserCard
                key={user.id}
                id={user.id}
                username={user.username}
                name={user.uName}
                email={user.email}
                deleteIndvUser={deleteIndvUser}
              />
            </div>
            <div className="p-3 mt-3">
              <h1 className="fw-bold">Saved Playlists:</h1>
            </div>
            <div className="card w-100 mx-auto mt-3 container-fluid body-text">
              {savedPlaylists.length > 0 ? (
              
                savedPlaylists.map(playlist => (
                  <PlayListCard
                    key={playlist.id}
                    id={playlist.id}
                    title={playlist.title}
                    songList={playlist.songList}
                    assignedUserId={user.id}
                    deleteListById={deleteSingleList}
                  />
                )
                )
              ) : (
                <div className="card-color ms-auto mx-auto p-4 w-100 fst-italic body-text-alt">
                  <h5>You don't have any saved playlists yet...</h5>
                    <div className="mt-4">
                      <NavLink to="/generatePlaylist" className="body-text-alt fst-italic fw-bold">
                      <h5 className="fw-bold">Click here to create one!</h5>
                      </NavLink>
                  </div>
              </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="mx-auto p-3 body-text-alt fw-bold">
              No user to display!
            </h3>
            <h3 className="mx-auto p-3 body-text-alt fst-italic">
              Please log in to view this page.
            </h3>
          </div>
        )
        }
      </div>
    );
  }
};

export default ProfilePage;