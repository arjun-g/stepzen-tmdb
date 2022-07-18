import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchGQL } from "./service";

export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => Object.fromEntries(new URLSearchParams(search)), [search]);
}

export function usePath(){
  const { pathname } = useLocation();
  return pathname;
}

function removeNull(arr){
  return (arr || []).filter(item => !!item);
}

export function useTrending(media){
  const [items, setItems] = useState([]);
  const query = useQuery();
  useEffect(() => {
    fetchGQL(`{
      trending(mediaType: ${query.media || 'movie'}, timeWindow: week) {
        id
        name
        title
        poster_path
        poster
        profile_path
        profile
        release_date
        first_air_date
        media_type
      }
    }`).then(resp => {
        setItems(removeNull(resp.data.trending).filter(trend => {
          if(trend.media_type === "person" && !trend.profile_path){
            return false;
          }
          return true;
        }))
    })
  }, [query.media]);
  return items;
}

export function useNowPlaying(){
  const [items, setItems] = useState([]);
  const query = useQuery();
  useEffect(() => {
    if(query.media === "tv")
    {
      fetchGQL(`{
        ontheAir {
          id
          poster_path
          name
          title
          poster
        }
      }`).then(resp => {
          if(resp.data)
            setItems(removeNull(resp.data?.ontheAir) || [])
      })
    }
    else{
      fetchGQL(`{
        nowPlaying {
          id
          poster_path
          name
          title
          poster
          release_date
        }
      }`).then(resp => {
          if(resp.data)
            setItems(removeNull(resp.data?.nowPlaying) || [])
      })
    }
  }, [query.media]);
  return items;
}

export function useMovie(movieId){
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetchGQL(`{
      movie(movieId: ${movieId}) {
        id
        title
        tagline
        videos {
          id
          site
          size
          key
          name
        }
        runtime
        genres {
          id
          name
        }
        homepage
        images {
          posters {
            aspect_ratio
            file {
              large
              medium
              small
            }
          }
          backdrops {
            file {
              large
              medium
              small
            }
            aspect_ratio
          }
        }
        overview
        release_date
        credits {
          cast {
            id
            name
            profile_path
            character
            gender
            order
            profile {
              large
              medium
            }
          }
          crew {
            id
            job
            name
            profile_path
            gender
            department
          }
        }
      }
    }`).then(resp => {
      setLoading(false);
      if(resp.data.movie)
        setMovie(resp.data.movie);
    })
  }, [movieId])
  return { loading, movie }
}