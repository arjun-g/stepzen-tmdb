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

export function useTrending(media){
  const [items, setItems] = useState([]);
  const query = useQuery();
  useEffect(() => {
    fetchGQL(`{
      trending(mediaType: ${query.media || 'movie'}, timeWindow: week) {
        id
        name
        title
        poster
        release_date
        first_air_date
      }
    }`).then(resp => {
        setItems(resp.data.trending)
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
            setItems(resp.data?.ontheAir || [])
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
            setItems(resp.data?.nowPlaying || [])
      })
    }
  }, [query.media]);
  return items;
}