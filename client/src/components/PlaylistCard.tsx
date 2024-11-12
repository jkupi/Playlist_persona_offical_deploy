import React, { useState } from "react";
import { ApiMessage } from "../interfaces/ApiMessage";

interface Song {
    songTitle: string;
    artistName: string;
    url: string;
}

interface PlaylistCardProps {
    id: number | null;
    title: string | null;
    songList: Song[] | null;
    assignedUserId: number | null;
    deleteListById: (playlistId: number) => Promise<ApiMessage>;
}

const PlayListCard: React.FC<PlaylistCardProps> = ({
    id,
    title,
    songList,
    // assignedUserId,
    deleteListById,
}) => {
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const [playlistExpanded, setPlaylistExpanded] = useState<boolean>(true);

    const handleDelete = async () => {
        if (id) {
            const confirmed = window.confirm("Are you sure you want to delete this playlist?");
            if (confirmed) {
                await deleteListById(id);
            }
        }
    };

    const toggleCard = (index: number) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    const togglePlaylist = () => {
        setPlaylistExpanded(!playlistExpanded); 
    };

    return (
        <div className="u-card container-fluid card my-2 mx-auto card-color d-flex flex-column align-items-center justify-content-center">
            <div className="mt-3 mb-3 container-fluid">
                <div className="d-flex justify-content-between align-items-center">
                    <h5>
                        <span className="fst-italic fw-bold">Playlist Title: </span>
                        <span className="body-text-alt fw-bold">{title}</span>
                    </h5>
                    <button
                        className="btn btn-medium-alt fw-bold"
                        onClick={togglePlaylist}
                    >
                        {playlistExpanded ? "⬆" : "⬇"}
                    </button>
                </div>

                {playlistExpanded && (
                    <div>
                        {songList && songList.length > 0 ? (
                            songList.map((song, index) => (
                                <div className="card container-fluid card-color my-3 w-100" key={index}>
                                    <div className="card-header d-flex justify-content-between align-items-center container-fluid">
                                        <div className="text-start flex-grow-1">
                                            <h3 className="fw-bold">{song.songTitle}</h3>
                                            <h5 className="fst-italic">{song.artistName}</h5>
                                        </div>
                                        <div className="d-flex">
                                            <button
                                                className="btn btn-medium-alt fw-bold ms-auto"
                                                onClick={() => toggleCard(index)}
                                            >
                                                {expandedCard === index ? "⬆" : "⬇"}
                                            </button>
                                        </div>
                                    </div>
                                    {expandedCard === index && (
                                        <div className="card-body">
                                            <iframe
                                                id={`iframe-${index}`}
                                                className="mx-auto p-3 d-flex container-fluid center"
                                                width="420"
                                                height="350"
                                                src={`https://www.youtube.com/embed/${song.url}`}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <h1>No Songs Found!!</h1>
                        )}
                        <button
                            className="btn-medium w-50 mx-auto center mt-3"
                            onClick={handleDelete}
                        >
                            Delete Playlist
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayListCard;
